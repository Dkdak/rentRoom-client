import React, { useState, useEffect } from 'react';
import { getAllRooms } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';
import { Card, Carousel, CardBody, CardImg, CardTitle, Container, Row, Col } from 'react-bootstrap';

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([{id:"", roomType:"", roomPrice:"", photo:""}])
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true)
        getAllRooms().then((data) => {
            setRooms(data)
            setIsLoading(false)
        }).catch((error) => {
            setErrorMessage(error.message)
            setIsLoading(false)
        })
    }, [])

    if(isLoading) {
        return <div className='mt-5'> loading rooms.....</div>
    }
    if(errorMessage) {
        return <div className='text-danger mb-5 mt-5'> Error : {errorMessage}</div>
    }

    return (
        <section className='bg-light mb-5 mt-5 shadow'>
            <Link to={"/browse-all-rooms"} className='hotel-color text-center'>
                Browse all rooms
            </Link>

            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.id} className='mb-4' xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/book-room/${room.id}`}>
                                                <CardImg
                                                    variant='top'
                                                    src={`data:image/jpeg;base64,${room.photo}`}
                                                    alt='Room Photo'
                                                    className='w-100'
                                                    style={{ height: "200px" }}
                                                />
                                            </Link>
                                            <CardBody className='d-flex flex-wrap align-items-center'>
                                                <CardTitle className='hotel-color'>{room.roomType}</CardTitle>
                                                <CardTitle className='room-price'>{room.roomPrice}/night</CardTitle>
                                                <div className='flex-shrink-0'>
                                                    <Link to={`/book-room/${room.id}`} className='btn btn-hotel btn-sm'>
                                                        Book Now
                                                    </Link>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default RoomCarousel;
