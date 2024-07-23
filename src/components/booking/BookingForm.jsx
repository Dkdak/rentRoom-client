import React, { useEffect, useState } from 'react';
import { bookRoom, getRoomById } from '../utils/ApiFunctions';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Form, FormControl } from 'react-bootstrap';
import BookingSummary from './BookingSummary';

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);
    const currentUser = localStorage.getItem("userId")
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: currentUser || "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: ""
    });

    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    });

    const { roomId } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId);
            setRoomPrice(response.roomPrice);
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getRoomPriceById(roomId);
    }, [roomId]);

    const calculatePayment = () => {
        console.log("calculatePayment called"); // 호출 여부 확인
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffInDays = checkOutDate.diff(checkInDate, 'days');
        const price = roomPrice || 0;
        console.log("payment : " + diffInDays * price)
        return diffInDays * price;
    };

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults);
        const childrenCount = parseInt(booking.numOfChildren);
        const totalCount = adultCount + childrenCount;
        return totalCount >= 1 && adultCount >= 1;
    };

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check out date must come after check in date");
            return false;
        } else {
            setErrorMessage("");
            return true;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            event.stopPropagation();
        } else {
            setIsSubmitted(true);
        }
        setIsValidated(true);
        console.log("handleSubmit called, isSubmitted:", isSubmitted); // 제출 여부 확인
    };

    const handleFormSubmit = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking);
            setIsSubmitted(true);
            navigate("/booking-success", { state: { message: confirmationCode } });
        } catch (error) {
            setErrorMessage(error.message);
            console.log("errorMessage : ", errorMessage)
            // setErrorMessage 는 비동기적으로 실행됨으로 errorMessage가 set 되기 전에 navigate가 동작 할수 있음
            // navigate("/booking-success", { state: { error: errorMessage } });
            console.log("error.message : ", error.message)
            navigate("/booking-success", { state: { error: error.message } });

        }
    };

    return (
        <>
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card card-body mt-5'>
                            <h4 className='card-title'>Reserve Room</h4>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="guestName">Full Name:</Form.Label>
                                    <FormControl
                                        required
                                        type='text'
                                        id='guestFullName'
                                        name='guestFullName'
                                        value={booking.guestFullName || ""}
                                        placeholder='Enter your full name'
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Please enter your fullname
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="guestEmail">Email:</Form.Label>
                                    <FormControl
                                        required
                                        type='email'
                                        id='guestEmail'
                                        name='guestEmail'
                                        value={booking.guestEmail || ""}
                                        placeholder='Enter your email'
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        Please enter your email address
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset style={{ border: "2px" }}>
                                    <legend>Loading period</legend>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <Form.Label htmlFor="checkInDate">Check-In date:</Form.Label>
                                            <FormControl
                                                required
                                                type='date'
                                                id='checkInDate'
                                                name='checkInDate'
                                                value={booking.checkInDate || ""}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                Please select a check-in date
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className='col-6'>
                                            <Form.Label htmlFor="checkOutDate">Check-Out date:</Form.Label>
                                            <FormControl
                                                required
                                                type='date'
                                                id='checkOutDate'
                                                name='checkOutDate'
                                                value={booking.checkOutDate || ""}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                Please select a check-out date
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>Number of Guests</legend>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <Form.Label htmlFor="numOfAdults">Adults:</Form.Label>
                                            <FormControl
                                                required
                                                type='number'
                                                id='numOfAdults'
                                                name='numOfAdults'
                                                value={booking.numOfAdults || ""}
                                                placeholder='0'
                                                min={1}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                Please select at least 1 adult
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className='col-6'>
                                            <Form.Label htmlFor="numOfChildren">Children:</Form.Label>
                                            <FormControl
                                                required
                                                type='number'
                                                id='numOfChildren'
                                                name='numOfChildren'
                                                value={booking.numOfChildren || ""}
                                                placeholder='0'
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </fieldset>

                                <div className='form-group mt-2 mb-2'>
                                    <button type='submit' className='btn btn-hotel'>
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                isFormValid={isValidated}
                                onConfirm={handleFormSubmit}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingForm;
