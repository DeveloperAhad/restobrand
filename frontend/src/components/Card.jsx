import React from 'react';

const Card = ({ children, className = '', onClick, hoverable = false }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-brand-border p-6 ${
        hoverable ? 'hover:shadow-md hover:border-brand-coral cursor-pointer transition-all duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
