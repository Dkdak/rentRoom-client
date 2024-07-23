import React, { useState } from 'react'
import { registerUser } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'

const Registration = () => {
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const hendleInputChange = (e) => {
        setRegistration({ ...registration, [e.target.name]: e.target.value })
    }

    const handleRegistration = async (e) => {
        e.preventDefault()
        try {
            const result = await registerUser(registration)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegistration({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            })

        } catch (error) {
            setSuccessMessage("")
            setErrorMessage(`Registation error : ${error.message}`)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 5000)

    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {successMessage && <p className='alert alert-success'>{successMessage}</p>}

            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <div className='row mb-3'>
                    <label htmlFor='firstName' className='col-sm-2 col-form-label'>
                        First Name
                    </label>
                    <div className='col-sm-10'>
                        <input
                            id='firstName'
                            name='firstName'
                            type='text'
                            className='form-control'
                            value={registration.firstName}
                            onChange={hendleInputChange}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label htmlFor='lastName' className='col-sm-2 col-form-label'>
                        Last Name
                    </label>
                    <div className='col-sm-10'>
                        <input
                            id='lastName'
                            name='lastName'
                            type='text'
                            className='form-control'
                            value={registration.lastName}
                            onChange={hendleInputChange}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label htmlFor='email' className='col-sm-2 col-form-label'>
                        Email
                    </label>
                    <div className='col-sm-10'>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            className='form-control'
                            value={registration.email}
                            onChange={hendleInputChange}
                        />
                    </div>
                </div>
                <div className='row mb-3'>
                    <label htmlFor='password' className='col-sm-2 col-form-label'>
                        Password
                    </label>
                    <div>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            className='form-control'
                            value={registration.password}
                            onChange={hendleInputChange}
                        />
                    </div>
                </div>

                <div className='mb-3'>
                    <button
                        type='submit'
                        className='btn btn-primary'
                        style={{ marginRight: "10px" }}
                    >
                        Register
                    </button>
                    <span style={{ marginLeft: "10px" }}>
                        Already have an account? <Link to={"/login"}>Login</Link>
                    </span>
                </div>
            </form>
        </section>
    )
}

export default Registration