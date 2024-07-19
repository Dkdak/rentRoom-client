import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => {},
    handleLogout: () => {},
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [jwtDecode, setJwtDecode] = useState(null);

    useEffect(() => {
        // 동적 import로 jwt-decode 모듈 불러오기
        import("jwt-decode").then((module) => {
            setJwtDecode(() => module.default);
        });
    }, []);

    const handleLogin = (token) => {
        if (jwtDecode) {
            const decodedToken = jwtDecode(token);
            localStorage.setItem("userId", decodedToken.sub);
            localStorage.setItem("userRole", decodedToken.roles.join(","));
            localStorage.setItem("token", token);
            setUser(decodedToken);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
