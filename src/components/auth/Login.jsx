import React, { useContext, useState } from 'react'
import { loginUser } from '../utils/ApiFunctions'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider';  // AuthContext를 가져옵니다

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [login, setLogin] = useState({
        email : "",
        password : ""
    })

    const navigate = useNavigate()
    const { handleLogin } = useContext(AuthContext)

    const handleInputChange = (event) => {
        setLogin({...login, [event.target.name] : event.target.value})
    }


    /**
     * await를 사용하려면 async 함수 내에서만 사용할 수 있습니다
     */
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("login data:", login);
        try {
            const success = await loginUser(login)
            if(success) {
                const token = success.token
                handleLogin(token)
                navigate("/")
                window.location.reload()
            } else {
                setErrorMessage("Invalid username or password, Please try again.")
            }
        } catch(error) {
            console.error('Login failed:', error);
            setErrorMessage("An error occurred during login. Please try again.");
        }
        
        setTimeout(() => {
            setErrorMessage("")
        }, 4000)
    }

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='row mb-3'>
                    <label htmlFor='email' className='col-sm-2 col-form-label'>
                        Email
                    </label>
                    <div>
                        <input
                        id='email'
                        name='email'
                        type='email'
                        className='form-control'
                        value={login.email}
                        onChange={handleInputChange}
                        />
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
                            value={login.password}
                            onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className='mb-3'>
                    <button
                    type='submit'
                    className='btn btn-hotel'
                    style={{marginRight : "10px"}}
                    >
                        Login
                    </button>
                    <span style={{marginLeft : "10px"}}>
                        Dot't have an account yet?<Link to={"/register"}> Register </Link>
                    </span>
                </div>
            </form>

        </section>
    )
}

export default Login