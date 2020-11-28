import React, { useState } from "react";
import { getSuggestions } from "./getSuggestions";
import "./Suggestions.css";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const clearSuggestions = () => setSuggestions([]);

  const onSearchInputChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term) {
      clearSuggestions();
    } else {
      const suggestions = await getSuggestions(term);
      setSuggestions(suggestions);
    }
  };

  const hasMatchingSuggestions = suggestions.length > 0;

  const onSuggestionClick = (suggestion) => {
    clearSuggestions();
    setSearchTerm(suggestion.name);
  };

  return (
    <section>
      <div className="wrapper">
        <input
          onBlur={clearSuggestions}
          value={searchTerm}
          onChange={onSearchInputChange}
          onClick={() =>
            onSearchInputChange({
              target: { value: searchTerm },
            })
          }
        />
        <button>Search</button>
        {hasMatchingSuggestions && (
          <div className="results">
            {suggestions.map((suggestion) => (
              <div
                onClick={() => onSuggestionClick(suggestion)}
                className="result"
                key={suggestion.name}
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Suggestions;
