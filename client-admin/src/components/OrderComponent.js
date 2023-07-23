import React, { Component } from "react";
import "../styles/Product.css";
import axios from "axios";
import MyContext from "../contexts/MyContext";

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
    };
  }
  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total}</td>
          <td style={{ color: this.getColorByStatus(item.status) }}>
            {item.status}
          </td>
          <td>
            {item.status === "PENDING" ? (
              <div>
                <span
                  className="link"
                  onClick={() => this.lnkApproveClick(item._id)}
                  style={{ color: "green" }}
                >
                  APPROVE
                </span>{" "}
                ||{" "}
                <span
                  className="link"
                  onClick={() => this.lnkCancelClick(item._id)}
                  style={{ color: "red" }}
                >
                  CANCEL
                </span>
              </div>
            ) : (
              <div />
            )}
          </td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="">
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td>
              <img
                src={"data:image/jpg;base64," + item.product.image}
                width="70px"
                height="70px"
                alt=""
              />
            </td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <>
        <div className="aba">
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
                        <th>Oder ID</th>
                        <th>Creation Date</th>
                        <th>Customer Name</th>
                        <th>Customer Phone</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{orders}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {this.state.order ? (
            <div class="row">
              <div class="col-md-12">
                <div class="tile">
                  <div class="tile-body">
                    <div class="row element-button">
                      <div class="col-sm-2"></div>
                    </div>
                    <h2 className="text-center">
                      ORDER DETAIL: {this.state.order._id}
                    </h2>
                    <table
                      class="table table-hover table-bordered"
                      id="sampleTable"
                    >
                      <thead className="">
                        <tr className="">
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
    this.apiGetOrders();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
    console.log(item);
  } // event-handlers
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, "APPROVED");
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, "CANCELED");
  }

  // apis
  apiGetOrders() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.get("/api/admin/orders", config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/admin/orders/status/" + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert("SORRY BABY!");
      }
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
export default Order;
