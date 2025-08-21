import React, { useState } from 'react';

interface PressableButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
  active?: boolean;
  [key: string]: any;
}

export default function PressableButton({ 
  children, 
  onClick, 
  className = "", 
  disabled = false,
  active = false,
  ...props 
}: PressableButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
      if (navigator.vibrate) navigator.vibrate(30);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`retro-button ${isPressed ? 'pressed' : ''} ${active ? 'active' : ''} ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
