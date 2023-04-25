import { MouseEventHandler, useState } from "react";

const DraggableDiv = () => {
    const [height, setHeight] = useState(200);
  const [dragging, setDragging] = useState(false);
  const [yOffset, setYOffset] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setYOffset(e.clientY - height);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (dragging) {
      const newHeight = e.clientY - yOffset;
      console.log(newHeight)
      setHeight(newHeight);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      style={{ height: `${height}px`, backgroundColor: "grey", cursor: "grab" }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      Drag me!
    </div>
  );
}

export default DraggableDiv



