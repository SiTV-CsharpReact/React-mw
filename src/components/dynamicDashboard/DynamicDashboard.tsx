// import React from 'react';
// import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';
// import { ItemTypes } from './ItemTypes';

// interface BoxProps {
//   name: string;
//   type: string;
//   isDropped: boolean;
//   onDrop: (name: string) => void;
// }

// interface DragItem extends DragObjectWithType {
//   name: string;
// }

// const DynamicDashboard: React.FC<BoxProps> = ({ name, type, isDropped, onDrop }) => {
//   const [{ isDragging }, dragRef] = useDrag({
//     item: { type: ItemTypes.BOX, name },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   const [{ canDrop, isOver }, dropRef] = useDrop({
//     accept: ItemTypes.BOX,
//     drop: () => onDrop(name),
//     collect: (monitor) => ({
//       canDrop: monitor.canDrop(),
//       isOver: monitor.isOver(),
//     }),
//   });

//   const isActive = canDrop && isOver;

//   let backgroundColor = '#FFFFFF';
//   if (isActive) {
//     backgroundColor = '#F7F7BD';
//   } else if (canDrop) {
//     backgroundColor = '#F7F7F7';
//   }

//   return (
//     <div
//       ref={dropRef}
//       style={{
//         backgroundColor,
//         opacity: isDragging ? 0.5 : 1,
//         cursor: 'move',
//         width: '100px',
//         height: '100px',
//         display: 'inline-block',
//         margin: '10px',
//       }}
//     >
//       <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1, fontSize: '20px', fontWeight: 'bold', padding: '10px' }}>
//         {isDropped ? <s>{name}</s> : name}
//       </div>
//     </div>
//   );
// };

// export default DynamicDashboard;
import React from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Box from './Box';
import Drag from './Drag';
const DynamicDashboard = () => {
  return (
    <div>
      <Drag/>
    </div>
  
  )
}

export default DynamicDashboard