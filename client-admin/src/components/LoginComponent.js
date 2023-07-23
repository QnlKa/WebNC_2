import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import "../styles/main.css";
import "../styles/util.css";

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
    };
  }
  render() {
    if (this.context.token === "") {
      return (
        // <div className="align-valign-center">
        //   <h2 className="text-center">ADMIN LOGIN</h2>
        //   <form>
        //     <table className="align-center">
        //       <tbody>
        //         <tr>
        //           <td>Username</td>
        //           <td>
        //             <input
        //               type="text"
        //               value={this.state.txtUsername}
        //               onChange={(e) => {
        //                 this.setState({ txtUsername: e.target.value });
        //               }}
        //             />
        //           </td>
        //         </tr>
        //         <tr>
        //           <td>Password</td>
        //           <td>
        //             <input
        //               type="password"
        //               value={this.state.txtPassword}
        //               onChange={(e) => {
        //                 this.setState({ txtPassword: e.target.value });
        //               }}
        //             />
        //           </td>
        //         </tr>
        //         <tr>
        //           <td></td>
        //           <td>
        //             <input
        //               type="submit"
        //               value="LOGIN"
        //               onClick={(e) => this.btnLoginClick(e)}
        //             />
        //           </td>
        //         </tr>
        //       </tbody>
        //     </table>
        //   </form>

        <div class="limiter">
          <div class="container-login100">
            <div class="wrap-login100">
              <form class="login100-form validate-form">
                <span class="login100-form-title p-b-26">Welcome</span>
                <span class="login100-form-title p-b-48">
                  <i class="zmdi zmdi-font"></i>
                </span>

                <div
                  class="wrap-input100 validate-input"
                  data-validate="Valid email is: a@b.c"
                >
                  <span className="txt">Email</span>
                  <input
                    class="input100"
                    value={this.state.txtUsername}
                    onChange={(e) => {
                      this.setState({ txtUsername: e.target.value });
                    }}
                    type="text"
                    name="email"
                  />
                  {/* <span class="focus-input100" data-placeholder="Email">
                    Email
                  </span> */}
                </div>

                <div
                  class="wrap-input100 validate-input"
                  data-validate="Enter password"
                >
                  <span className="txt">Password</span>
                  {/* <span class="btn-show-pass">
                    <i class="zmdi zmdi-eye"></i>
                  </span> */}
                  <input
                    class="input100"
                    value={this.state.txtPassword}
                    onChange={(e) => {
                      this.setState({ txtPassword: e.target.value });
                    }}
                    type="password"
                    name="pass"
                  />
                </div>

                <div class="container-login100-form-btn">
                  <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button
                      class="login100-form-btn"
                      onClick={(e) => this.btnLoginClick(e)}
                    >
                      Login
                    </button>
                  </div>
                </div>

                {/* <div class="text-center p-t-115">
                  <span class="txt1">Don’t have an account?</span>

                  <a class="txt2" href="#">
                    Sign Up
                  </a>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert("Please input username and password");
    }
  }
  // apis
  apiLogin(account) {
    axios.post("/api/admin/login", account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;
