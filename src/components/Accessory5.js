
// src/Accessories.js

import React, { useState } from 'react';
import hotDog from '../overlays/hotdog.png'
import hotDog1 from '../overlays/hotdog2.png';
import hotDog2 from '../overlays/hotdog3.png';

const Accessories5 = ({ image }) => {
  const [accessoryPosition, setAccessoryPosition] = useState({ x: 160, y: 360 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialClick, setInitialClick] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialClick({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - initialClick.x;
      const deltaY = e.clientY - initialClick.y;

      setAccessoryPosition({
        x: accessoryPosition.x + deltaX,
        y: accessoryPosition.y + deltaY,
      });

      setInitialClick({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: accessoryPosition.y,
        left: accessoryPosition.x,
        cursor: 'move',
        zIndex: 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Use your eyeglasses image here */}

      <img src={hotDog} alt="Eyeglasses" style={accessoryStyle} />

    </div>
  );
};

const accessoryStyle = {
  width: '100px', // Adjust the size according to your image
  height: 'auto',
};

export default Accessories5;
