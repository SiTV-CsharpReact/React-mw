import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder,HttpTransportType , HubConnection } from '@aspnet/signalr';

function SignalRComponent() {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('/hsx/signalr', { transport: HttpTransportType.WebSockets }) // Sử dụng WebSockets// Đặt URL của SignalR hub tại đây
      
      .build();

    newConnection
      .start()
      .then(() => {
        console.log('Kết nối thành công!');
      })
      .catch(error => {
        console.error('Lỗi khi kết nối: ', error);
      });

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection.on('ReceiveMessage', receivedMessage => {
        console.log('Nhận tin nhắn: ', receivedMessage);
        // Xử lý tin nhắn nhận được ở đây
      });
    }
  }, [connection]);

  const sendMessage = async () => {
    try {
      await connection?.invoke('SendMessage', 'Nội dung tin nhắn');
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn: ', error);
    }
  };

  return (
    <div>
      <h1>Kết nối SignalR trong React (Function Component)</h1>
      <button onClick={sendMessage}>Gửi tin nhắn</button>
    </div>
  );
}

export default SignalRComponent;
