import { login } from "../services/auth";
import { show } from "../helpers/show";
import { Context } from "..";

export const Login = (context: Context) => {
  const loginFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = `${form.get("username")}`;
    const password = `${form.get("password")}`;
    // TODO: components shouldn't invoke services, actions should
    login({ username, password })
      .then(() => {
        // TODO: mutations should only be called from actions
        context.mutations.setCredentials({
          username,
          password,
        });
        context.actions.navigateToHome(true);
      })
      .catch(() => {
        context.setState({
          errors: "invalid login information",
        });
      });
  };

  const ErrorAlert = context.html`
    <div class="alert alert-danger" role="alert">
      ${context.state.errors}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `;

  return context.html`
    <div class="row">
      <div class="col-md-12">
        <h1>Login</h1>
        ${show(!!context.state.errors)(ErrorAlert)}
        <form onsubmit=${loginFormSubmit}>
          <div class="form-group">
            <input class="form-control" name="username" placeholder="username" />
          </div>
          <div class="form-group">
            <input class="form-control" type="password" name="password" placeholder="password" />
          </div>  
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  `;
};
