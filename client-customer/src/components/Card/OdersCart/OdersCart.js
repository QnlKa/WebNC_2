import { Fragment, useContext, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Badge from "@mui/material/Badge";
import OdersCartCard from "./OdersCartCard/OdersCartCard";
import "./OdersCart.css";
import { Button } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "350px",
  width: "45%",
  height: "600px",
  bgcolor: "background.paper",
  border: "5px solid #FFE26E",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const OdersCart = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const token = sessionStorage.getItem("token");
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);

  const handleCheckoutClose = () => setOpenCheckoutModal(false);

  return (
    <Fragment>
      <Button
        variant="outlined"
        onClick={handleOpen}
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="cart__header">
            <h2>Your Bill Detail</h2>
          </div>
          <div className="cart__items__container">
            <div className="cartItems">
              <div className="shop__cart__items">
                {props.items.map((item2) => (
                  <OdersCartCard
                    key={item2.product._id}
                    item={item2.product}
                    quan={item2.quantity}
                  />
                ))}
              </div>

              <div className="options">
                <div className="total__amount">
                  <div className="total__amount__label">Total Amount:</div>
                  <div className="total__amount__value">${props.total}</div>
                </div>
              </div>
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

export default OdersCart;
