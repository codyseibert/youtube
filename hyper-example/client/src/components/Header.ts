import { show } from "../helpers/show";
import { Link } from "./Link";
import { Context } from "..";

export const Header = (context: Context) => {
  const logout = () => {
    context.actions.logout();
  };

  const logoutBtn = context.html`<button class="btn btn-outline-danger" type="button" onclick=${logout}>Logout</button>`;

  const onLoginClick = () => {
    context.actions.navigateToLogin(true);
  };

  const onRegisterClick = () => {
    context.actions.navigateToRegister(true);
  };

  return context.html`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
      ${Link({
        class: "navbar-brand",
        href: "/",
        text: "TODO LIST",
      })}

      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      </ul>

        ${show(context.getters.isLoggedIn())(
          () => context.html`<div>
            ${logoutBtn}
          </div>`
        )}

        ${show(!context.getters.isLoggedIn())(context.html`<div>
          <button 
            onclick=${onLoginClick} 
            class="btn btn-primary my-2 my-sm-0">
             Login
          </button>

          <button 
            onclick=${onRegisterClick} 
            class="btn btn-success my-2 my-sm-0">
             Register
          </button>
        </div>`)}
    </nav>
  `;
};
