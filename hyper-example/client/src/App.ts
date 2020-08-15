import html from "hyperhtml";
import { show } from "./helpers/show";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Context } from "./index";
import { Page } from "./store/mutations";

const getPage = (page) => {
  // TODO: OCP
  switch (page) {
    case Page.Login:
      return Login;
    case Page.Register:
      return Register;
    case Page.Home:
      return Home;
    default:
      throw new Error("invalid page");
  }
};

export const App = (context: Context) => {
  const { showHeader, page } = context.state;

  return html`
    <div>${show(showHeader)(Header(context))}</div>
    <div class="container">
      <div class="mt-4">${getPage(page)(context)}</div>
    </div>
  `;
};
