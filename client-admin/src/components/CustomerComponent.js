import React, { Component } from "react";
import "../styles/Product.css";
import axios from "axios";
import MyContext from "../contexts/MyContext";

class Customer extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null,
    };
  }
  render() {
    const customers = this.state.customers.map((item) => {
      return (
        <tr
          key={item._id}
          className=""
          onClick={() => this.trCustomerClick(item)}
        >
          <td style={{ textAlign: "center" }}>{item._id}</td>
          <td>{item.username}</td>
          <td>{item.password}</td>
          <td>{item.name}</td>
          <td style={{ textAlign: "center" }}>{item.phone}</td>
          <td>{item.email}</td>
          <td style={{ textAlign: "center" }}>{item.active}</td>
          <td style={{ textAlign: "center" }}>
            {item.active === 0 ? (
              <span
                className="link"
                onClick={() => this.lnkEmailClick(item)}
                style={{ color: "Purple" }}
              >
                EMAIL
              </span>
            ) : (
              <span
                className="link"
                onClick={() => this.lnkDeactiveClick(item)}
                style={{ color: "red" }}
              >
                DEACTIVE
              </span>
            )}
          </td>
        </tr>
      );
    });
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="" onClick={() => this.trOrderClick(item)}>
          <td style={{ textAlign: "center" }}>{item._id}</td>
          <td style={{ textAlign: "center" }}>
            {new Date(item.cdate).toLocaleString()}
          </td>
          <td style={{ textAlign: "center" }}>{item.customer.name}</td>
          <td style={{ textAlign: "center" }}>{item.customer.phone}</td>
          <td>{item.total}</td>
          <td
            style={{
              color: this.getColorByStatus(item.status),
              textAlign: "center",
            }}
          >
            {item.status}
          </td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="">
            <td style={{ textAlign: "center" }}>{index + 1}</td>
            <td style={{ textAlign: "center" }}>{item.product._id}</td>
            <td style={{ textAlign: "center" }}>{item.product.name}</td>
            <td>
              <img
                src={"data:image/jpg;base64," + item.product.image}
                width="70px"
                height="70px"
                alt=""
              />
            </td>
            <td>{item.product.price}</td>
            <td style={{ textAlign: "center" }}>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <>
        <div className="aba2">
          <div class="row">
            <div class="col-md-12">
              <div class="tile">
                <div class="tile-body">
                  <div class="row element-button">
                    <div class="col-sm-2"></div>
                  </div>

                  <table
                    class="table table-hover table-bordered"
                    id="sampleTable"
                  >
                    <thead className="">
                      <tr>
                        <th>Customer ID</th>
                        <th>Customer Username</th>
                        <th>Customer Password</th>
                        <th>Customer Name</th>
                        <th>Customer Phone</th>
                        <th>Customer Email</th>
                        <th>Active</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{customers}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {this.state.orders.length > 0 ? (
            <div class="row">
              <div class="col-md-12">
                <div class="tile">
                  <div class="tile-body">
                    <div class="row element-button">
                      <div class="col-sm-2"></div>
                    </div>
                    <h2 className="text-center">DETAIL</h2>
                    <table
                      class="table table-hover table-bordered"
                      id="sampleTable"
                    >
                      <thead className="">
                        <tr>
                          <th>ID</th>
                          <th>Creation date</th>
                          <th>Cust.name</th>
                          <th>Cust.phone</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>{orders}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div />
          )}
          {this.state.order ? (
            <div class="row">
              <div class="col-md-12">
                <div class="tile">
                  <div class="tile-body">
                    <div class="row element-button">
                      <div class="col-sm-2"></div>
                    </div>
                    <h2 className="text-center">ORDERS</h2>
                    <table
                      class="table table-hover table-bordered"
                      id="sampleTable"
                    >
                      <thead className="">
                        <tr>
                          <th>No.</th>
                          <th>Prod.ID</th>
                          <th>Prod.name</th>
                          <th>Image</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>{items}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </>
    );
  }
  componentDidMount() {
    this.apiGetCustomers();
  }
  // event-handlers
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }
  trOrderClick(item) {
    this.setState({ order: item });
  }
  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }
  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }
  // apis
  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .put("/api/admin/customers/deactive/" + id, body, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          this.apiGetCustomers();
        } else {
          alert("SORRY BABY!");
        }
      });
  }

  apiGetCustomers() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/customers", config).then((res) => {
      const result = res.data;
      this.setState({ customers: result });
    });
  }
  apiGetOrdersByCustID(cid) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/orders/customer/" + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
      console.log(this.state.orders);
    });
  }
  apiGetCustomerSendmail(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/customers/sendmail/" + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
  getColorByStatus(status) {
    if (status === "APPROVED") {
      return "green";
    } else if (status === "PENDING") {
      return "orange";
    } else if (status === "CANCELED") {
      return "red";
    }
  }
}
export default Customer;
