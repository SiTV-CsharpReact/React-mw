import React, { useEffect, useState } from "react";
import { Observable } from "rxjs";

const IframeComponent = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const iframe = (document?.querySelector('#myIframe') as HTMLIFrameElement) 
    const iframeObservable = new Observable((observer) => {
      const messageHandler = (event:any) => {
        observer.next(event.data);
      };
      iframe.contentWindow?.addEventListener("message", messageHandler);
      return () => {
        iframe.contentWindow?.removeEventListener("message", messageHandler);
      };
    });
    const subscription = iframeObservable.subscribe((message:any) => {
      setData(message);
    });
    return () => subscription.unsubscribe();
    console.log(data)
  }, []);

  return (
    <div>
      <iframe id="myIframe" src="/hnx/blank?843"></iframe>
      <p>{data}</p>
    </div>
  );
};

export default IframeComponent;