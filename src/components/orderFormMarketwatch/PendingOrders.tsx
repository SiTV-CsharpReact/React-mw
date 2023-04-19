import React, { useState } from 'react';

interface ContentStyle extends React.CSSProperties {
  scrollTop: number;
}

function ScrollableDiv() {
  const [scrollTop, setScrollTop] = useState(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { clientY } = e;
    const { top } = e.currentTarget.getBoundingClientRect();
    const newScrollTop = (clientY - top) * 3;
    setScrollTop(newScrollTop);
  }

  const contentStyle: ContentStyle = {
    scrollTop,
    backgroundColor: 'white',
    color: 'black',
    fontSize: '16px',
  };

  return (
    <div className="container" onMouseMove={handleMouseMove}>
      <div className="content" style={contentStyle}>
        {/* Nội dung của div */}
      </div>
    </div>
  );
}


export default ScrollableDiv;
