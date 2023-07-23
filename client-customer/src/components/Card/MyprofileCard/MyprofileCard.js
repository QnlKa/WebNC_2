import { Link, useNavigate } from "react-router-dom";
import "./MyprofileCard.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MyprofileCard = () => {
  const token = sessionStorage.getItem("token");
  const customer = sessionStorage.getItem("customer")
    ? JSON.parse(sessionStorage.getItem("customer"))
    : null;
  const navigate = useNavigate();
  const [account, setAcount] = useState({
    txtUsername: customer.username,
    txtPassword: customer.password,
    txtName: customer.name,
    txtPhone: customer.phone,
    txtEmail: customer.email,
  });

  const btnUpdateClick = (e) => {
    e.preventDefault();
    const username = account.txtUsername;
    const password = account.txtPassword;
    const name = account.txtName;
    const phone = account.txtPhone;
    const email = account.txtEmail;
    if (username && password && name && phone && email) {
      const customer2 = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
      };
      apiPutCustomer(customer._id, customer2);
    } else {
      toast.error(
        "Please input Username and Password and Name and Phone and Email"
      );
    }
  };

  const lnkLogoutClick = () => {
    console.log(localStorage);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("customer");
    navigate("/"); // Redirect to "/home" route
    toast.success("Logout Successfull");
    setTimeout(function () {
      window.location.reload();
    }, 1000);
    console.log(localStorage);
  };

  const apiPutCustomer = (id, customer) => {
    const config = { headers: { "x-access-token": token } };
    axios.put("/api/customer/customers/" + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        toast.success("Edit Information Successfull!");

        sessionStorage.setItem("customer", JSON.stringify(result));
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Something Wrong!");
      }
    });
  };
  return (
    <div className="register__card__container__aaaa">
      <div className="register__card">
        <div className="register__header">
          <h1>My Profile </h1>
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
          <ToastContainer></ToastContainer>
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
            <button
              className="register__button"
              onClick={(e) => btnUpdateClick(e)}
            >
              UPDATE PROFILE
            </button>
          </div>
          <div className="register__button__container">
            <button
              className="register__button log"
              onClick={(e) => lnkLogoutClick(e)}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyprofileCard;
