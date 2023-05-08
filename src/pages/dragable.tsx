
import { useState, useRef } from "react";
import './slide.scss'
import OrderMarketW from "../components/orderFormMarketwatch/OrderFormMarketWatch";
import TableGDTTMarketWatch from "../components/tableMarketwatch/TableGDTTMarketWatch";

const DraggableDiv: React.FC = () => {
  // const windowHeight = window.innerHeight - 40;
  // const [heightW, setHeightW] = useState<number>(windowHeight);
  // const [height, setHeight] = useState<number>(200);

  // const draggingRef = useRef<boolean>(false);
  // const yOffsetRef = useRef<number>(0);

  // const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  //   draggingRef.current = true;
  //   yOffsetRef.current = e.clientY - height;
  //   e.dataTransfer?.setDragImage(new Image(), 0, 0); // ẩn hiệu ứng kéo thả mặc định
  // };

  // const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
  //   if (draggingRef.current) {
    
  //     const newHeight = e.clientY - yOffsetRef.current;
  //     console.log(e.clientY,yOffsetRef.current,newHeight)
      
  //     requestAnimationFrame(() => {
  //       if(e.clientY !==0) setHeight(newHeight);
        
  //     });
  //   }
  // };

  // const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
  //   // console.log( e.clientY)
  //   // const newHeight = e.clientY - yOffsetRef.current;
  //   // setHeight(newHeight);
  //   draggingRef.current = false;
  // };

  return (
 
   <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr >
      <td className="tooltip" data-tooltip="John">John</td>
      <td data-tooltip="john@example.com">john@example.com</td>
      <td data-tooltip="30">30</td>
    </tr>
    <tr >
      <td className="tooltip" data-tooltip="Jane">Jane</td>
      <td data-tooltip="jane@example.com">jane@example.com</td>
      <td data-tooltip="25">25</td>
    </tr>
    <tr>
      <td className="tooltip" data-tooltip="Bob">Bob</td>
      <td data-tooltip="bob@example.com">bob@example.com</td>
      <td data-tooltip="35">35</td>
    </tr>
  </tbody>
</table>

       
 
  );
};

export default DraggableDiv;