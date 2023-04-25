
import { useState, useRef } from "react";
import './slide.scss'
import OrderMarketW from "../components/orderFormMarketwatch/OrderFormMarketWatch";
import TableGDTTMarketWatch from "../components/tableMarketwatch/TableGDTTMarketWatch";

const DraggableDiv: React.FC = () => {
  const windowHeight = window.innerHeight - 40;
  const [heightW, setHeightW] = useState<number>(windowHeight);
  const [height, setHeight] = useState<number>(200);

  const draggingRef = useRef<boolean>(false);
  const yOffsetRef = useRef<number>(0);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    yOffsetRef.current = e.clientY - height;
    e.dataTransfer?.setDragImage(new Image(), 0, 0); // ẩn hiệu ứng kéo thả mặc định
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (draggingRef.current) {
    
      const newHeight = e.clientY - yOffsetRef.current;
      console.log(e.clientY,yOffsetRef.current,newHeight)
      
      requestAnimationFrame(() => {
        if(e.clientY !==0) setHeight(newHeight);
        
      });
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    // console.log( e.clientY)
    // const newHeight = e.clientY - yOffsetRef.current;
    // setHeight(newHeight);
    draggingRef.current = false;
  };

  return (
    <div className="relative">
      <div
        style={{
          height: `${height}px`,
          backgroundColor: "grey",
     
        }}
      
      >
      </div>
 
      <div
      className="red-div"
        style={{
          height: `${heightW - height}px`,
          backgroundColor: "red",
      
        }}
      >
             <OrderMarketW />
      </div>
      <div id="draggableH" className="ui-draggable ui-draggable-handle" 
         style={{top:height, background: 'transparent'}}
         onClick={(e) => e.stopPropagation()}
         draggable
         onDragStart={handleDragStart}
         onDrag={handleDrag}
         onDragEnd={handleDragEnd}
         />
       
    </div>
  );
};

export default DraggableDiv;