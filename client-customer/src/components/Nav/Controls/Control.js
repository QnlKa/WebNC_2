import "./Control.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyIcon from "@mui/icons-material/Key";
import InventoryIcon from "@mui/icons-material/Inventory";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import Cart from "../../Card/Cart/Cart";
import { useContext } from "react";
import { WishItemsContext } from "../../../Context/WishItemsContext";

const Control = () => {
  const wishItems = useContext(WishItemsContext);
  const token = sessionStorage.getItem("token");

  return (
    <>
      {!token ? (
        <div className="control__bar__container">
          <div className="controls__container">
            <div className="control">
              <Link to="/account/login">
                <PersonOutlineIcon
                  color="black"
                  size="large"
                  sx={{ width: "35px" }}
                />
              </Link>
            </div>
            <div className="control">
              <Link to="/wishlist">
                <Badge badgeContent={wishItems.items.length} color="error">
                  <FavoriteBorderIcon color="black" sx={{ width: "35px" }} />
                </Badge>
              </Link>
            </div>
            <div className="control">
              <Cart />
            </div>
          </div>
        </div>
      ) : (
        <div className="control__bar__container">
          <div className="controls__container">
            <div className="control">
              <Link to="/account/profile">
                <PersonOutlineIcon
                  color="black"
                  size="large"
                  sx={{ width: "35px" }}
                />
              </Link>
            </div>
            <div className="control">
              <Link to="/wishlist">
                <Badge badgeContent={wishItems.items.length} color="error">
                  <FavoriteBorderIcon color="black" sx={{ width: "35px" }} />
                </Badge>
              </Link>
            </div>
            <div className="control">
              <Cart />
            </div>
            <div className="control">
              <Link to="/order">
                <Badge color="error">
                  <InventoryIcon color="black" sx={{ width: "35px" }} />
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Control;
