import './Accordion.css';
import React, { useState } from 'react';

export default function Accordion({ image, title, body }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="accordion-header"
      >
        <img
          alt="cookie"
          className="accordion-image"
          src={image}
        />
        <h2>{title}</h2>
        <div className="accordion-indicator">
          {isOpen ? '-' : '+'}
        </div>
      </div>
      {isOpen && (
        <div className="accordion-body">{body}</div>
      )}
    </div>
  );
}
