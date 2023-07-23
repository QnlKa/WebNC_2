import { Link } from "react-router-dom";
import "./RegisterCard.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterCard = () => {
  const [account, setAcount] = useState({
    txtUsername: "",
    txtPassword: "",
    txtName: "",
    txtPhone: "",
    txtEmail: "",
  });

  const btnSignupClick = () => {
    const username = account.txtUsername;
    const password = account.txtPassword;
    const name = account.txtName;
    const phone = account.txtPhone;
    const email = account.txtEmail;
    console.log(account);
    if (username && password && name && phone && email) {
      const accountaa = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
      };
      apiSignup(accountaa);
    } else {
      toast.error(
        "Please input username and password and name and phone and email"
      );
    }
  };
  const apiSignup = (accountaa) => {
    axios.post("/api/customer/signup", accountaa).then((res) => {
      const result = res.data;
      toast.info(result.message);
    });
  };
  return (
    <div className="register__card__container">
      <div className="register__card">
        <div className="register__header">
          <h1>Create Account</h1>
        </div>
        <div className="register__inputs">
          <div className="fname__input__container reg__input__container">
            <label className="fname__label input__label">Username</label>
            <input
              type="text"
              className="fname__input register__input"
              value={account.txtUsername}
              onChange={(e) =>
                setAcount({ ...account, txtUsername: e.target.value })
              }
            />
          </div>
          <ToastContainer />
          <div className="lname__input__container reg__input__container">
            <label className="lname__label input__label">Password</label>
            <input
              type="password"
              className="lname__input register__input"
              value={account.txtPassword}
              onChange={(e) =>
                setAcount({ ...account, txtPassword: e.target.value })
              }
            />
          </div>

          <div className="fname__input__container reg__input__container">
            <label className="fname__label input__label">Name</label>
            <input
              type="text"
              className="fname__input register__input"
              value={account.txtName}
              onChange={(e) =>
                setAcount({ ...account, txtName: e.target.value })
              }
            />
          </div>

          <div className="fname__input__container reg__input__container">
            <label className="fname__label input__label">Phone</label>
            <input
              type="text"
              className="fname__input register__input"
              value={account.txtPhone}
              onChange={(e) =>
                setAcount({ ...account, txtPhone: e.target.value })
              }
            />
          </div>

          <div className="email__input__container reg__input__container">
            <label className="email__label input__label">Email</label>
            <input
              type="email"
              className="email__input register__input"
              placeholder="example@gmail.com"
              value={account.txtEmail}
              onChange={(e) =>
                setAcount({ ...account, txtEmail: e.target.value })
              }
            />
          </div>
          <div className="register__button__container">
            <button className="register__button" onClick={btnSignupClick}>
              Create Account
            </button>
          </div>
          <div className="register__other__actions">
            <div className="register__login__account">
              Already have account?{" "}
              <Link to="/account/login">
                <b>Login</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
