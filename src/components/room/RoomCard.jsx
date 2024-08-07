import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, CardText, Col } from 'reactstrap';

const RoomCard = ({ room }) => {
    
    return (
        <Col key={room.id} className='mb-4' xs={12}>
            <Card>
                <CardBody className='d-flex flex-wrap align-items-center'>
                    <div className='flex-shrink-0 mr-3 mb-3 mb-md-0'>
                        <Link to={`/book-room/${room.id}`} >
                        <CardImg
                            variant='top'
                            src={`data:image/jpeg;base64,${room.photo}`}
                            alt='Room Photo'
                            style={{ width: "200px", maxWidth: "200px", height: "auto" }} // maxWidth 수정
                        />
                        </Link>
                    </div>
                    <div className='flex-grow-1 ml-3 px-5'>
                        <CardTitle className='hotel-color'>{room.roomType}</CardTitle>
                        <CardTitle className='room-price'>{room.roomPrice}</CardTitle>
                        <CardText>Some room information goes here for the guest to read through</CardText>
                    </div>
                    <div className='flex-shrink-0 mt-3'>
                        <Link to={`/book-room/${room.id}`} className='btn btn-hotel btn-sm'>
                            Book Now
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}

export default RoomCard;
