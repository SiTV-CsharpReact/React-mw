import React, { useEffect } from 'react'
import { getMessagingToken } from './firebase';

const Ring = () => {
    useEffect(() => {
        getMessagingToken();
        const channel = new BroadcastChannel("notifications");
        channel.addEventListener("message", (event) => {
          console.log("Receive background: ", event.data);
        });
      },[])

  return (
    <div>IntradayOrder</div>
  )
}

export default Ring