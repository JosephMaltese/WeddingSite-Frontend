import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/adminlogin.css';
import Button from 'react-bootstrap/Button';
import { useAuth } from './authContext';
const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

function AdminLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = () => {
        if (password === adminPassword) {
            login();
            navigate('/admin');
        }
        else {
            alert('Invalid password. Nice try!');
            setPassword('');
        }
    }

    return (
        <div className="container">
            <h1 className="mainTitle">Admin Login</h1>
            <p>Enter the admin password to login</p>
            <input type="password" value={password} onChange={(e) => handlePasswordChange(e)} />
            <Button className="submitButton" variant="dark" size="lg" onClick={handleLogin}>Login</Button>
        </div>
    );
}

export default AdminLogin;