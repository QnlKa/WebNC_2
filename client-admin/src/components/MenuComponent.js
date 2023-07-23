import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";
import "../styles/menu.css";
class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <>
        <div class="navbar">
          <div className="navbar-container">
            <Link className="btn" to="/admin/home">
              Home
            </Link>
            <Link className="btn" to="/admin/category">
              Category
            </Link>
            <Link className="btn" to="/admin/product">
              Product
            </Link>
            <Link className="btn" to="/admin/order">
              Order
            </Link>
            <Link className="btn" to="/admin/customer">
              Customer
            </Link>
            {/* <div class="dropdown">
          <button class="dropbtn">
            Dropdown
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div> */}
            <div className="float-right" id="logout">
              <Link
                to="/admin/home"
                id="logout"
                onClick={() => this.lnkLogoutClick()}
              >
                Logout
              </Link>
            </div>{" "}
            <div className="float-right" id="hello">
              Hello: <b>{this.context.username}</b> |{" "}
            </div>
          </div>
        </div>
      </>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setUsername("");
  }
}
export default Menu;
