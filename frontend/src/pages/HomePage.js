import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // File CSS cho styling

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="header">
                <h1>Chào mừng đến với Revenue Management Được Phát triển bởi Ngô Quốc Khiêm</h1>
                <p>Quản lý doanh thu công ty của bạn một cách hiệu quả.</p>
            </div>
            <div className="links">
                <Link to="/register" className="btn">Đăng Kí</Link>
                <Link to="/login" className="btn">Đăng Nhập</Link>
            </div>
        </div>
    );
};

export default HomePage;
