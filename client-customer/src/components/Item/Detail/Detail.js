import { useContext, useState } from "react";
import "./Detail.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { CartItemsContext } from "../../../Context/CartItemsContext";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Detail = (props) => {
  const [quantity, setQuantity] = useState(1);

  const cartItems = useContext(CartItemsContext);
  const wishItems = useContext(WishItemsContext);

  const handelQuantityIncrement = (event) => {
    setQuantity((prev) => (prev += 1));
  };

  const handelQuantityDecrement = (event) => {
    if (quantity > 1) {
      setQuantity((prev) => (prev -= 1));
    }
  };

  const handelAddToWish = () => {
    wishItems.addItem(props.item);
  };
  const handleAddToCart = () => {
    cartItems.addItem(props.item, 1);
  };
  return (
    <div className="product__detail__container">
      <div className="product__detail">
        <div className="product__main__detail">
          <div className="product__name__main">{props.item.name}</div>
          <div className="product__detail__description">
            {props.item.description}
          </div>

          <div className="product__price__detail">${props.item.price}</div>
        </div>
        <form className="product__form">
          <div className="product__quantity__and__size">
            <div className="product__quantity">
              <IconButton onClick={handelQuantityIncrement}>
                <AddCircleIcon />
              </IconButton>
              <div type="text" name="quantity" className="quantity__input">
                {quantity}
              </div>
              <IconButton onClick={handelQuantityDecrement}>
                <RemoveCircleIcon fontSize="medium" />
              </IconButton>
            </div>
          </div>
          <div className="collect__item__actions">
            <div className="add__cart__add__wish">
              <div className="add__cart">
                <Button
                  variant="outlined"
                  size="large"
                  sx={[
                    {
                      "&:hover": {
                        backgroundColor: "#FFE26E",
                        borderColor: "#FFE26E",
                        borderWidth: "3px",
                        color: "black",
                      },
                      minWidth: 200,
                      borderColor: "black",
                      backgroundColor: "black",
                      color: "#FFE26E",
                      borderWidth: "3px",
                    },
                  ]}
                  onClick={handleAddToCart}
                >
                  ADD TO BAG
                </Button>
              </div>
              <div className="add__wish">
                <IconButton
                  variant="outlined"
                  size="large"
                  sx={[
                    {
                      "&:hover": {
                        backgroundColor: "#FFE26E",
                        borderColor: "#FFE26E",
                        borderWidth: "3px",
                        color: "black",
                      },
                      borderColor: "black",
                      backgroundColor: "black",
                      color: "#FFE26E",
                      borderWidth: "3px",
                    },
                  ]}
                  onClick={handelAddToWish}
                >
                  <FavoriteBorderIcon sx={{ width: "22px", height: "22px" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Detail;
