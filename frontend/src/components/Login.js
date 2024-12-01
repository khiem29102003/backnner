import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import '../CSS/Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/users/login', credentials);
      alert(response.data.message);
      onLogin(credentials.email, credentials.password);
      navigate('/profit-loss');
    } catch (error) {
      setError('Đăng nhập không thành công');
      console.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Đăng Nhập</h2>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          onKeyPress={handleKeyPress}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          onKeyPress={handleKeyPress}
        />
        {error && <div className="alert">{error}</div>}
        <button type="submit">Đăng Nhập</button>
        <button type="button" className="home-button" onClick={goHome}>
          Quay lại trang chủ
        </button>
      </form>
    </div>
  );
};

export default Login;
