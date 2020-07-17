import React, { useState } from 'react';

export default function Accordion({ icon, title, body }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div
        onClick={toggleIsOpen}
        className="accordion-header"
      >
        <img
          className="accordion-icon"
          alt="cookies"
          src={icon}
        />
        <h1 className="accordion-title">{title}</h1>
        <span className="accordion-state">
          {isOpen ? '-' : '+'}
        </span>
      </div>
      {isOpen && (
        <div class="accordion-body">
          <p>{body}</p>
        </div>
      )}
    </div>
  );
}
