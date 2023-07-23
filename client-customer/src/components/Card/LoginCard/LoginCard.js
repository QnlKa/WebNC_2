import { Link, useNavigate } from "react-router-dom";
import "./LoginCard.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginCard = () => {
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    txtUsername: "",
    txtPassword: "",
  });

  const btnLoginClick = (e) => {
    e.preventDefault();
    const username = account.txtUsername;
    const password = account.txtPassword;
    if (username && password) {
      const accountData = { username, password };
      apiLogin(accountData);
    } else {
      toast.error("Please input username and password");
    }
  };

  const apiLogin = (account) => {
    axios.post("/api/customer/login", account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("customer", JSON.stringify(result.customer));
        console.log(localStorage);
        navigate("/"); // Redirect to "/home" route

        setTimeout(function () {
          window.location.reload();
        }, 1000);
        toast.success("LOGIN SUCCESSFULL!");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="login__card__container">
      <div className="login__card">
        <div className="login__header">
          <h1>Login</h1>
        </div>
        <div className="login__inputs">
          <div className="email__input__container input__container">
            <label className="email__label input__label">Username</label>
            <input
              type="email"
              className="email__input login__input"
              placeholder="example"
              value={account.txtUsername}
              onChange={(e) =>
                setAccount({ ...account, txtUsername: e.target.value })
              }
            ></input>
          </div>
          <ToastContainer></ToastContainer>
          <div className="password__input__container input__container">
            <label className="password__label input__label">Password</label>
            <input
              type="password"
              className="password__input login__input"
              placeholder="**********"
              value={account.txtPassword}
              onChange={(e) =>
                setAccount({ ...account, txtPassword: e.target.value })
              }
            ></input>
          </div>
          <div className="login__button__container">
            <button className="login__button" onClick={(e) => btnLoginClick(e)}>
              LOGIN
            </button>
          </div>
        </div>
        <div className="login__other__actions">
          <div className="login__new__account">
            Don't have account?{" "}
            <Link to="/account/register">
              <b>Create account</b>
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
