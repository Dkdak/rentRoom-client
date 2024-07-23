import React, { useEffect, useState } from 'react';
import { deleteUser, getUser } from '../utils/ApiFunctions';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            try {
                const userData = await getUser(userId, token);
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [userId]);

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );
        if (confirmed) {
            try {
                const response = await deleteUser(userId); // 변경: login -> userId
                setMessage(response.data);

                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("userRole");
                navigate("/");
                window.location.reload();
            } catch (error) {
                setErrorMessage(error.response.data.message || error.message);
            }
        }
    };

    return (
        <div className="container mt-5">
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
            {message && <p className='text-success'>{message}</p>}
            {user ? (
                <div className='card shadow' style={{ backgroundColor: "whitesmoke" }}>
                    <div className='card-body'>
                        <h4 className='card-title'>User Info</h4>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='mb-3'>
                                    <img src='' alt='profile' className='rounded-circle' width={"100px"} height={"100px"} />
                                </div>
                            </div>
                            <div className='col-md-8'>
                                <div className='mb-2'>
                                    <strong>First Name:</strong> {user.firstName}
                                </div>
                                <div className='mb-2'>
                                    <strong>Last Name:</strong> {user.lastName}
                                </div>
                                <div className='mb-2'>
                                    <strong>Email:</strong> {user.email}
                                </div>
                                <div className='mb-2'>
                                    <strong>Role:</strong> {user.roles[0].name}
                                </div>
                                <button className='btn btn-danger mt-3' onClick={handleDeleteAccount}>
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Profile;
