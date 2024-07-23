import React, { useEffect, useState } from 'react'
import { getAllBookings, cancelBooking } from '../utils/ApiFunctions'
import BookingsTable from './BookingTable'
import Header from '../common/Header'

const Bookings = () => {

    const [bookingInfo, setBookingInfo] = useState([])
    const [isLoading, setIsLoading] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        setTimeout(() => {
            getAllBookings().then((data) => {
                setBookingInfo(data)
                setIsLoading(false)
            }).catch((error) => {
                setError(error.message)
            })
        }, 1000)
    }, [])

    const handleBookingCancellation = async(bookingId) => {
        try{
            await cancelBooking(bookingId)
            const data = await getAllBookings()
            setBookingInfo(data)
        } catch(error) {
            setError(error.message)
        }
    }
    return (
        <section style={{backgroundColor:"whitesmoke"}}>
            <Header title={"Existing Bookings"}/>
            {error && <div className='text-danger'>{error}</div>}
            {isLoading ? (
                <div>Loading existing bookings</div>
            ) : (
                <BookingsTable 
                    bookingInfo = {bookingInfo}
                    handleBookingCancellation = {handleBookingCancellation}
                />
            )}

        </section>
    )
}

export default Bookings