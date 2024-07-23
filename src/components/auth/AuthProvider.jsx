import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({
    user: null,
    handleLogin: async(token) => {},
    handleLogout: () => {},
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = (token) => {
        if (typeof token !== 'string' || token.trim() === '') {
            console.error('Invalid token provided:', token);
            return;
        }
        
        try {
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken); // 추가된 로그
            const userId = decodedToken.sub; // 이메일이 들어있음
            const roles = decodedToken.roles || []; // roles 정보 확인
            const email = decodedToken.email || ''; // 이메일 정보
            console.log('Decoded Token: ', userId, roles, email); // 추가된 로그

            localStorage.setItem('userId', decodedToken.sub);
            localStorage.setItem('userRole', decodedToken.roles);
            localStorage.setItem('token', token);
            setUser(decodedToken);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            handleLogin(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
