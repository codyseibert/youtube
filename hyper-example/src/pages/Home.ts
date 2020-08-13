import { Context } from "..";
import { Todos } from "../components/Todos";

export const Home = (context: Context) => {
  const { html } = context;
  return html`<h1>HOME</h1>
    ${Todos(context)} `;
};
