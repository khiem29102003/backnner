import React, { useState, useEffect } from 'react';
import { toWords } from 'number-to-words';
import '../CSS/ProfitLoss.css';

const ProfitLoss = () => {
  const [revenue, setRevenue] = useState('');
  const [costs, setCosts] = useState('');
  const [profitLoss, setProfitLoss] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('history'));
    if (storedHistory) {
      setHistory(storedHistory);
    } else {
      fetch('http://localhost:5000/get-all-history')
        .then(res => res.json())
        .then(data => setHistory(data));
    }
  }, []);

  const calculateProfitLoss = () => {
    const revenueValue = parseFloat(revenue);
    const costsValue = parseFloat(costs);
    if (isNaN(revenueValue) || isNaN(costsValue)) {
      alert('Vui lòng nhập các giá trị hợp lệ!');
      return;
    }
    const profit = revenueValue - costsValue;
    setProfitLoss(profit);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      const currentTime = new Date().toLocaleString(); // Lấy thời gian hiện tại
      saveHistoryToDatabase(storedUser.id, revenueValue, costsValue, profit, currentTime);

      const updatedHistory = [
        ...history,
        { revenue: revenueValue, costs: costsValue, profit, userName: storedUser.name, time: currentTime }
      ];
      setHistory(updatedHistory);
      localStorage.setItem('history', JSON.stringify(updatedHistory));
    }
  };

  const saveHistoryToDatabase = async (userId, revenue, costs, profit, time) => {
    try {
      await fetch('http://localhost:5000/save-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, revenue, costs, profit, time })
      });
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const convertToWords = (amount) => {
    let words = toWords(amount).replace(/,/g, '') + ' đồng';
    words = words.replace('một', 'mười');
    return words;
  };

  const sortedHistory = [...history].sort((a, b) => b.profit - a.profit);
  const highestProfit = sortedHistory[0];
  const lowestProfit = sortedHistory[sortedHistory.length - 1];

  return (
    <div className="profit-loss-container">
      <h2>Tính Lãi/Lỗ</h2>
      <div className="input-container">
        <input
          type="number"
          placeholder="Doanh thu (VND)"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Chi phí (VND)"
          value={costs}
          onChange={(e) => setCosts(e.target.value)}
          className="input-field"
        />
        <button onClick={calculateProfitLoss} className="calculate-button">Tính Lãi/Lỗ</button>
      </div>

      {profitLoss !== null && (
        <div className="result-container">
          <h3>Kết quả:</h3>
          <p>{profitLoss >= 0 ? 'Lãi: ' : 'Lỗ: '} {formatCurrency(profitLoss)}</p>
          <p>{convertToWords(profitLoss)}</p>
        </div>
      )}

      <div className="history-container">
        <h3>Lịch sử tính toán</h3>
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index}>
              <strong>{item.userName}</strong>: Doanh thu: {formatCurrency(item.revenue)}, Chi phí: {formatCurrency(item.costs)}, Kết quả: {formatCurrency(item.profit)}, Thời gian: {item.time}
            </li>
          ))}
        </ul>
      </div>

      {highestProfit && (
        <div className="best-worst-container">
          <h3>Người có Lãi cao nhất</h3>
          <p><strong>{highestProfit.userName}</strong>: Lời: {formatCurrency(highestProfit.profit)}</p>
        </div>
      )}

      {lowestProfit && (
        <div className="best-worst-container">
          <h3>Người có Lỗ cao nhất</h3>
          <p><strong>{lowestProfit.userName}</strong>: Lỗ: {formatCurrency(lowestProfit.profit)}</p>
        </div>
      )}
    </div>
  );
};

export default ProfitLoss;
