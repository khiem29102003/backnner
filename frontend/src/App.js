import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import ProfitLoss from './components/ProfitLoss';
import API from './services/api';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  // Kiểm tra localStorage khi ứng dụng tải lại
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await API.post('/users/login', { email, password });
      setUser(response.data.user);
      
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));

    } catch (error) {
      console.error('Đăng nhập không thành công', error);
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {user ? (
            <Route path="/profit-loss" element={<ProfitLoss />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
