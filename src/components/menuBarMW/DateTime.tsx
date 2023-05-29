import React, { useEffect, useState } from 'react'
function Clock() {
 
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      const intervalID = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => {
        clearInterval(intervalID);
      };
    }, []);
    // Format lại chuỗi thời gian và ngày theo định dạng mong muốn
    const formattedTime = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const formattedDate = time.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    //const formattedDate = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
    return (
      <div className="flex float-right pr-4 text-white">
        <label id="lbTradingDate"></label>
        <span className="text-xs font-bold px-1.5" id="lbDate">
          {formattedDate}
        </span>
        <span className="text-xs font-bold px-1.5" id="lbClock">
          {formattedTime}
        </span>
      </div>
    );
  }
const DateTime = () => {
  return (
    <Clock />
  )
}

export default DateTime