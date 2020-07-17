import React from 'react';
import './App.css';
import Accordion from './Accordion';

function App() {
  const products = [
    {
      title: 'Chocolate Chip Cookies',
      image:
        'https://joyfoodsunshine.com/wp-content/uploads/2016/01/best-chocolate-chip-cookies-recipe-ever-no-chilling-1-e1549147195343.jpg',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed pulvinar sapien sed enim blandit, quis
        mollis leo pretium. Phasellus non dui neque.
        Maecenas tincidunt ipsum vel nulla suscipit
        interdum. Sed varius arcu et imperdiet iaculis.
        Vestibulum mattis magna vitae scelerisque
        porttitor. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos
        himenaeos. Etiam semper ligula a tellus volutpat,
        et aliquet nibh commodo.`,
    },
  ];

  return (
    <div className="App">
      {products.map((product) => (
        <Accordion {...product} />
      ))}
    </div>
  );
}

export default App;
