// Dropdown.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QueryDropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Assuming you have routes defined, you can navigate to another page
    navigate(`/page/${option}`);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button">{selectedOption || 'Select an option'}</button>
      <div className="dropdown-content">
        {options.map((option, index) => (
          <div key={index} onClick={() => handleOptionClick(option)} className="option">
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryDropdown;
