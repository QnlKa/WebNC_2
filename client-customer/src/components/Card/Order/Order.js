import { useContext } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";
import "./Order.css";
import { Button } from "@mui/material";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OdersCart from "../OdersCart/OdersCart";
const Order = (props) => {
  const token = sessionStorage.getItem("token");
  const customer = sessionStorage.getItem("customer")
    ? JSON.parse(sessionStorage.getItem("customer"))
    : null;
  const cid = customer._id;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    apiGetCategories();
  }, []);
  const config = { headers: { "x-access-token": token } };
  const apiGetCategories = () => {
    axios.get("/api/customer/orders/customer/" + cid, config).then((res) => {
      const result = res.data;
      setOrders(result);
    });
  };
  const getColorByStatus = (status) => {
    if (status === "APPROVED") {
      return "green";
    } else if (status === "PENDING") {
      return "orange";
    } else if (status === "CANCELED") {
      return "red";
    }
  };
  const OrdersList = orders.map((item) => {
    return (
      <div className="wishlist__items__container">
        <div className="wishlist__items">
          <div className="wishcard">
            <div className="wish__item__name">{item._id}</div>
            <div className="wish__item__price">
              {new Date(item.cdate).toLocaleString()}
            </div>
            <div className="wish__item__price">{item.total}</div>
            <div
              className="wish__item__price"
              style={{ color: getColorByStatus(item.status) }}
            >
              {item.status}
            </div>

            <div className="add__to__cart">
              <OdersCart id={item._id} items={item.items} total={item.total} />
              {/* <Link to={"/order/" + item._id}>
                <Button
                  variant="outlined"
                  sx={[
                    {
                      "&:hover": {
                        backgroundColor: "#FFE26E",
                        borderColor: "#FFE26E",
                        color: "black",
                      },
                      borderColor: "black",
                      backgroundColor: "black",
                      color: "#FFE26E",
                    },
                  ]}
                >
                  DETAIL
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="wishlist">
      <div className="wishlist__container">
        <div className="wishlist__header">
          <h2>Your Order</h2>
        </div>
        <div className="wishlist__items__container">
          <div className="wishlist__items">
            <div className="wishcard">
              <div className="wish__item__name">ID</div>
              <div className="wish__item__price">CREATION DATE</div>
              <div className="wish__item__price">TOTAL</div>
              <div className="wish__item__price">STATUS</div>
              <div className="add__to__cart">
                <Button
                  variant="outlined"
                  sx={[
                    {
                      borderColor: "white",
                      backgroundColor: "white",
                      color: "white",
                    },
                  ]}
                >
                  DETAIL
                </Button>
              </div>
            </div>
          </div>
          {OrdersList}
        </div>{" "}
      </div>
    </div>
  );
};

export default Order;
