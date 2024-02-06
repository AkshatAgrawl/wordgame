import React, { useState } from 'react';

const Button = ({ text, backgroundColor, hoverColor, textColor, onClick,sx }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: isHovered ? hoverColor : backgroundColor,
    color: textColor,
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.3s ease',
    ...sx // Smooth transition for hover effect
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
