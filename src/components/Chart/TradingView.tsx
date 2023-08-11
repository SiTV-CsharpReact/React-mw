import React, { useEffect } from 'react';
const ChartTradingView = () => {
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = '../charting_library/charting_library'; // Thay đổi đường dẫn đến script đã tải xuống
  //   script.async = true;

  //   // Xử lý sự kiện khi script tải xong
  //   script.onload = () => {
  //     if (typeof window.TradingView === 'undefined') {
  //       console.error('TradingView không khả dụng sau khi tải.');
  //       return;
  //     }

  //     const widget = new window.TradingView.widget({
  //       symbol: 'BINANCE:BTCUSDT',
  //       interval: '1D',
  //       container_id: 'chart-container',
  //       locale: 'vi',
  //       autosize: true,
  //     });

  //     widget.onChartReady(() => {
  //       console.log('Biểu đồ đã sẵn sàng.');
  //     });
  //   };

  //   document.body.appendChild(script);

  //   // Dọn dẹp khi component unmount
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div id="chart-container" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default ChartTradingView;
