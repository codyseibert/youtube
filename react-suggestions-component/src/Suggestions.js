import React, { useState, useEffect } from "react";
import "./Suggestions.css";

import { getSuggestions } from "./api";

export const Suggestions = ({ onSearch }) => {
  const [searchField, setSearchField] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [skipSuggestionSearch, setSkipSuggestionSearch] = useState(false);

  useEffect(() => {
    if (searchField === "" || skipSuggestionSearch) return;
    getSuggestions(searchField).then((foundSuggestions) => {
      setSuggestions(foundSuggestions);
    });
  }, [searchField, skipSuggestionSearch]);

  const hasSuggestions = suggestions.length > 0;

  const searchFieldChanged = (e) => {
    setSkipSuggestionSearch(false);
    const value = e.target.value;
    if (value === "") {
      setSuggestions([]);
    }
    setSearchField(value);
  };

  const suggestionClicked = (suggestion) => {
    setSkipSuggestionSearch(true);
    setSuggestions([]);
    setSearchField(suggestion);
  };

  return (
    <div className="wrapper">
      <input value={searchField} onChange={searchFieldChanged} />
      <button onClick={() => onSearch(searchField)}>Search</button>
      {hasSuggestions && (
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <div
              onClick={() => suggestionClicked(suggestion)}
              className="suggestion"
              key={suggestion}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
