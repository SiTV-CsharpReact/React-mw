const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

// Middleware để cho phép gửi yêu cầu từ domain của bạn
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8060');
  next();
});

// Xử lý yêu cầu POST đến '/api/stock/v1/mw/template/058C108101'
app.post('/api/stock/v1/mw/template/058C108101', (req, res) => {
  // Lấy dữ liệu từ yêu cầu POST
  const { Name } = req.body;

  // Gửi yêu cầu POST tới server API
  axios.post('http://marketwatchapiservicecore.fpts.com.vn/api/stock/v1/mw/template/058C108101', { Name })
    .then(response => {
      // Trả về phản hồi từ server API cho client
      res.json(response.data);
    })
    .catch(error => {
      // Trả về lỗi cho client nếu có lỗi xảy ra trong quá trình gửi yêu cầu hoặc nhận phản hồi từ server API
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Khởi chạy server proxy
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
