import { Fragment, useContext, useState } from "react";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import CartCard from "./CartCard/CartCard";
import "./Cart.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "350px",
  width: "45%",
  height: "400px",
  bgcolor: "background.paper",
  border: "5px solid #FFE26E",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    {
      !token ? alert("Please Login") : setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);
  const customernow = sessionStorage.getItem("customer")
    ? JSON.parse(sessionStorage.getItem("customer"))
    : null;

  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);

  const handleCheckoutClose = () => setOpenCheckoutModal(false);

  const cartItems = useContext(CartItemsContext);

  const newItems = cartItems.items.map((item) => ({
    product: {
      ...item,
    },
    quantity: item.itemQuantity, // Thêm thuộc tính soluong với giá trị 2
  }));
  const lnkCheckoutClick = () => {
    if (window.confirm("ARE YOU SURE?")) {
      if (newItems.length > 0) {
        const total = cartItems.totalAmount;
        const items = newItems;
        const customer = customernow;
        console.log(customer);
        if (customer) {
          apiCheckout(total, items, customer);
        }
      } else {
        toast.error("Your cart is empty!");
      }
    }
  };
  const apiCheckout = (total, items, customer) => {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { "x-access-token": token } };
    axios.post("/api/customer/checkout", body, config).then((res) => {
      const result = res.data;
      if (result) {
        toast.success("Order successfull!");
        cartItems.clear();
        handleClose();
      } else {
        toast.error("Please try again!");
      }
    });
  };

  return (
    <Fragment>
      <Badge badgeContent={cartItems.items.length} color="error">
        <ShoppingCartIcon
          color="black"
          onClick={handleOpen}
          sx={{ width: "35px" }}
        />
      </Badge>
      <ToastContainer />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="cart__header">
            <h2>Your Cart</h2>
          </div>
          <div className="cart__items__container">
            <div className="cartItems">
              {cartItems.items.length === 0 ? (
                <div className="cart__empty"> Empty cart!</div>
              ) : (
                <div className="shop__cart__items">
                  {cartItems.items.map((item) => (
                    <CartCard key={item._id} item={item} />
                  ))}
                </div>
              )}
              {cartItems.items.length > 0 && (
                <div className="options">
                  <div className="total__amount">
                    <div className="total__amount__label">Total Amount:</div>
                    <div className="total__amount__value">
                      ${cartItems.totalAmount}
                    </div>
                  </div>
                  <div className="checkout">
                    <Button variant="outlined" onClick={lnkCheckoutClick}>
                      Checkout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
      <Modal open={openCheckoutModal} onClose={handleCheckoutClose}>
        <Box sx={style}>
          <div className="d-flex w-100 h-100 justify-content-center align-items-center">
            <h2>Your checkout was successful</h2>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default Cart;
