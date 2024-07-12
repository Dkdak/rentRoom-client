import React from 'react'
import { Card, Container, Row, Col, CardBody, CardImg, CardTitle, CardText} from 'reactstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa'

const HotelService = () => {
    return (

        <>
            <Container className='mb-2'>
                <Header title={"Our Service"} />
                <Row>
                    <h4 className='text-center'>
                        Services at <span className='hotel-color'> slees hotel </span>
                        <span className='gap-2'>
                            <FaClock /> -24-hour front desk
                        </span>
                    </h4>
                </Row>
                <hr />
                <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaWifi /> Wifi
                                </CardTitle>
                                <CardText>Stay Connected with internet speed </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaUtensils /> BreakFast
                                </CardTitle>
                                <CardText>start your day with breakfast buffet </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaTshirt /> Launday
                                </CardTitle>
                                <CardText> laundary service </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaCocktail /> Mini-bar
                                </CardTitle>
                                <CardText>enjoy mini-bar </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaParking /> Parking
                                </CardTitle>
                                <CardText>on-siie parking lot</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className='hotel-color'>
                                    <FaSnowflake /> Air conditioning
                                </CardTitle>
                                <CardText>air conditioning system </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>


    )
}

export default HotelService