import React from 'react'
import { useLocation } from 'react-router-dom'

const BookingSuccess = () => {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error

    console.log(location.state)
    
    return (
        <div className='container'>
            {/* <Header title="Booking Success"/> */}
            <h1>Booking Success</h1>
            <div className='mt-5'>
                {message ? (
                    <div>
                        <h3 className='text-success'> Booking Success !</h3>
                        <p className='text-success'>{message}</p>
                    </div>
                ) : (
                    <div>
                        <h3 className='text-danger'> Error Booking Room !</h3>
                        <p className='text-danger'>{error}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookingSuccess