import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom'

const UserLoginInfo = () => {
    const { user } = useContext(AuthContext);
    // console.log('User Info:', user); // 추가된 로그
    const navigate = useNavigate()

    if (!user) {
        return <p>Not logged in</p>;
    }

    // setTimeout(() => {
    //     navigate("/")
    //     window.location.reload()

    // }, 5000)

    return (
        <div>
            <h2>Welcome, {user.sub}!</h2>
            <p>Role: {user.roles}</p>
            <p>Token: {localStorage.getItem("token")}</p>
        </div>
    );
}

export default UserLoginInfo
