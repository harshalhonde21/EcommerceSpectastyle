import React from 'react';
import './CustomDropdown.css';

const CustomDropdown = ({ className, options, onChange, value, isOpen, setIsOpen }) => {
  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`custom-dropdown ${className}`}>
      <div className="custom-dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="custom-dropdown-selected">
          {options.find((option) => option.value === value)?.label || 'Select'}
        </div>
        <div className="custom-dropdown-arrow">&#9662;</div> 
      </div>
      {isOpen && (
        <div className="custom-dropdown-options">
          {options.map((option) => (
            <div
              key={option.value}
              className="custom-dropdown-option"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
