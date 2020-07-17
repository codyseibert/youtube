import React from 'react';
import './App.css';
import Accordion from './Accordion';

function App() {
  const products = [
    {
      icon:
        'https://joyfoodsunshine.com/wp-content/uploads/2016/01/best-chocolate-chip-cookies-recipe-ever-no-chilling-1-e1549147195343.jpg',
      title: 'Chocolate Chip Cookies',
      body:
        'Lorem ipsum dolor sit amet, est ea dicam menandri, eros erat postea ea nec. Ad sed falli consetetur dissentias, pro ponderum definitionem id. In porro persecuti sententiae vix, utinam integre ex qui. Et his lorem ludus assentior, vis ubique adipisci referrentur ad. Vel ne alii altera, ridens iuvaret gloriatur ut qui. Eu assum quodsi patrioque duo, affert sensibus ut vim. Lorem dolor luptatum an usu, ut tempor erroribus sit, ad nam sint albucius percipit. Qui ullum inani tation ea, congue oratio veniam ex nam. Volutpat constituam ex pri, postea expetenda an mel, has solet aeterno debitis ea. Sea eu mazim lobortis salutandi.',
    },
    {
      icon:
        'https://joyfoodsunshine.com/wp-content/uploads/2016/01/best-chocolate-chip-cookies-recipe-ever-no-chilling-1-e1549147195343.jpg',
      title: 'Chocolate Chip Cookies',
      body:
        'Lorem ipsum dolor sit amet, est ea dicam menandri, eros erat postea ea nec. Ad sed falli consetetur dissentias, pro ponderum definitionem id. In porro persecuti sententiae vix, utinam integre ex qui. Et his lorem ludus assentior, vis ubique adipisci referrentur ad. Vel ne alii altera, ridens iuvaret gloriatur ut qui. Eu assum quodsi patrioque duo, affert sensibus ut vim. Lorem dolor luptatum an usu, ut tempor erroribus sit, ad nam sint albucius percipit. Qui ullum inani tation ea, congue oratio veniam ex nam. Volutpat constituam ex pri, postea expetenda an mel, has solet aeterno debitis ea. Sea eu mazim lobortis salutandi.',
    },
    {
      icon:
        'https://joyfoodsunshine.com/wp-content/uploads/2016/01/best-chocolate-chip-cookies-recipe-ever-no-chilling-1-e1549147195343.jpg',
      title: 'Chocolate Chip Cookies',
      body:
        'Lorem ipsum dolor sit amet, est ea dicam menandri, eros erat postea ea nec. Ad sed falli consetetur dissentias, pro ponderum definitionem id. In porro persecuti sententiae vix, utinam integre ex qui. Et his lorem ludus assentior, vis ubique adipisci referrentur ad. Vel ne alii altera, ridens iuvaret gloriatur ut qui. Eu assum quodsi patrioque duo, affert sensibus ut vim. Lorem dolor luptatum an usu, ut tempor erroribus sit, ad nam sint albucius percipit. Qui ullum inani tation ea, congue oratio veniam ex nam. Volutpat constituam ex pri, postea expetenda an mel, has solet aeterno debitis ea. Sea eu mazim lobortis salutandi.',
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
