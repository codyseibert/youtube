import {
  html,
  render
} from 'https://unpkg.com/lit-html?module';

const initialState = {
  name: 'bob'
};

const state = new Proxy(initialState, {
  set() {
    refresh();
    return true;
  }
});

const updateName = e => {
  state.name = e.target.value;
};

const refresh = () => {
  render(template(), document.body);
};

const template = () =>
  html`
    <p>${name}</p>
    <input value=${name} @input=${updateName}></input>
  `;

refresh();
