import React, { useEffect, useState } from 'react';
import './ProfitLossHistory.css'; // Assuming you add CSS to style
import '../CSS/ProfitLossHistory.css';

const ProfitLossHistory = ({ userId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`http://localhost:5000/get-history/${userId}`);
      const data = await response.json();
      setHistory(data);
    };
    fetchHistory();
  }, [userId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="history-container">
      <h3>Lịch sử tính toán</h3>
      {history.length === 0 ? (
        <p>Chưa có dữ liệu lịch sử.</p>
      ) : (
        <ul className="history-list">
          {history.map(item => (
            <li key={item.id} className="history-item">
              <div className="history-entry">
                <strong>Doanh thu:</strong> {formatCurrency(item.revenue)}
              </div>
              <div className="history-entry">
                <strong>Chi phí:</strong> {formatCurrency(item.costs)}
              </div>
              <div className={`history-entry ${item.profit >= 0 ? 'profit' : 'loss'}`}>
                <strong>Lãi/Lỗ:</strong> {formatCurrency(item.profit)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfitLossHistory;
