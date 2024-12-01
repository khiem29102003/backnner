import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Thêm useNavigate
import API from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Khởi tạo hook navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/users/register', formData);
            alert(response.data.message);  // Hiển thị thông báo khi đăng ký thành công
            navigate('/login');  // Chuyển hướng về trang đăng nhập
        } catch (error) {
            setError('Đăng ký không thành công');  // Cập nhật lỗi khi đăng ký thất bại
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {error && <div className="alert">{error}</div>}
            <button type="submit">Đăng Kí</button>
        </form>
    );
};

export default Register;
