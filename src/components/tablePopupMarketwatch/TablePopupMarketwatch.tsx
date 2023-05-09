import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/configureStore'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
interface DraggableProps {
    initialPosition?: { x: number; y: number };
    onDrag?: (event: DraggableEvent, data: DraggableData) => void;
    children: React.ReactNode;
  }
const TablePopupMarketwatch = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
        const { x, y } = position;
        setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
     
        // if (onDrag) {
        //   onDrag(e, ui);
        // }
      };
    // const componentVisible = useSelector(
    //     (state: RootState) => state.chart.visible
    //   );
    // const status = useSelector(((state: RootState) => state.popupTable.visible))
    // console.log(status)
  return (
    <Draggable onDrag={handleDrag}>
    <div  style={{
        // display: status ? "block" : "none",
        width:1000,
        height:600,
        background:'#fff',
        position:'absolute',
        zIndex:1000,
        top: '50%',
  left: '50%',
 transform: 'translate(-50%, -50%)'
      }}>
        TablePopupMarketwatch</div>
        </Draggable>
  )
}

export default React.memo(TablePopupMarketwatch)
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Paper, { PaperProps } from '@mui/material/Paper';
// import Draggable from 'react-draggable';
// import { useSelector } from 'react-redux';
// import { RootState, useAppDispatch } from '../../store/configureStore';
// import {showDetailStock } from '../popupTableMarketwatch/popupTableSlice';

// function PaperComponent(props: PaperProps) {
//   return (
//     <Draggable
//       handle="#draggable-dialog-title"
//       cancel={'[class*="MuiDialogContent-root"]'}
//     >
//       <Paper {...props} />
//     </Draggable>
//   );
// }

// export default function DraggableDialog() {
//        const status = useSelector(((state: RootState) => state.popupTable.visible))
//        const dispatch = useAppDispatch();
//        console.log(status)
// //   const [open, setOpen] = React.useState(false);

// //   const handleClickOpen = () => {
// //     setOpen(true);
// //   };

// //   const handleClose = () => {
// //     setOpen(false);
// //   };

//   return (
//     <div>
//       {/* <Button variant="outlined" onClick={handleClickOpen}>
//         Open draggable dialog
//       </Button> */}
//       <div
//         open={status}
      
//         PaperComponent={PaperComponent}
//         aria-labelledby="draggable-dialog-title"
//       >
//         <div style={{ cursor: 'move' }} id="draggable-dialog-title">
//           Subscribe
//         </div>
//         <div>
//           <div>
//             To subscribe to this website, please enter your email address here. We
//             will send updates occasionally.
//           </div>
//         </div>
//         <div>
//           <Button autoFocus onClick={() => dispatch(showDetailStock(''))}>
//             Cancel
//           </Button>
//           {/* <Button onClick={handleClose}>Subscribe</Button> */}
//         </div>
//       </div>
//     </div>
//   );
// }