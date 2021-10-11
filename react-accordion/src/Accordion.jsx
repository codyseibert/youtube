import "./Accordion.css";
import React from "react";

export default function Accordion({
  setAccordionOpened,
  accordionOpened,
  image,
  title,
  body,
}) {
  const isOpened = title === accordionOpened;

  return (
    <div className="accordion">
      <div
        onClick={() => setAccordionOpened(title)}
        className="accordion-header"
      >
        <img alt="cookie" className="accordion-image" src={image} />
        <h2>{title}</h2>
        <div className="accordion-indicator">{isOpened ? "-" : "+"}</div>
      </div>
      {isOpened && <div className="accordion-body">{body}</div>}
    </div>
  );
}
