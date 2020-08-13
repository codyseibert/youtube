import React, { useState } from "react";
import "./App.css";
import ImageSlider from "./ImageSlider";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const runQuery = () => {
    fetch(
      `https://pixabay.com/api/?key=17555646-e40df9968035314583cab5eca&q=${query}`
    )
      .then((response) => response.json())
      .then(({ hits }) => hits.map(({ webformatURL }) => webformatURL))
      .then(setImages);
  };

  return (
    <div className="App">
      <div>
        <input onChange={(e) => setQuery(e.target.value)} />
        <button onClick={runQuery}>Search</button>
      </div>
      <ImageSlider images={images} />
    </div>
  );
}
