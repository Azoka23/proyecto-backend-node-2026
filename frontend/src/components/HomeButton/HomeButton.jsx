// src/components/HomeButton/HomeButton.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './HomeButton.css'; 

export const HomeButton = () => {
    return (
        <Link to="/" className="home-button-float">
            
            🏠
        </Link>
    );
};