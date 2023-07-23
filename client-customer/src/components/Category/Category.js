import "./Category.css";
import ItemCard from "../Card/ItemCard/ItemCard";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TabTitle } from "../../utils/General";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

const Category = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    apiGetCategories();
  }, [props.id]);

  const apiGetCategories = () => {
    axios
      .get("/api/customer/products/category/" + props.id)
      .then((res) => {
        const result = res.data;
        setItems(result);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  //   setCategory2 = category.filter((item) => item._id === props.id);

  TabTitle(props.name);

  const [show, setShow] = useState("All");
  const [filter, setFilter] = useState("Latest");

  const handleShowChange = (event) => {
    setShow(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="category__container">
      <div className="category">
        <div className="category__header__container">
          <div className="category__header__big">
            <div className="category__header">
              <h2>{props.name}</h2>
            </div>
            <div className="category__header__line"></div>
          </div>
          <div className="category__sort">
            <div className="show__filter"></div>
            <div className="filter__by">
              <div className="show__filter"></div>
            </div>
          </div>
        </div>
        <div className="category__card__container">
          <div className="category__product__card">
            {items.length > 0 ? (
              items.map((data) => (
                <ItemCard item={data} category={props.category} />
              ))
            ) : (
              <>NO RESULT</>
            )}
            <div className="show__more__action"></div>
          </div>
        </div>
      </div>
    </div>
    // <div className="category__container">
    //   <div className="category">
    //     <div className="category__header__container">
    //       <div className="category__header__big">
    //         <div className="category__header">
    //           <h2>{props.id}</h2>
    //         </div>
    //         <div className="category__header__line"></div>
    //       </div>
    //     </div>

    //     <div className="category__card__container">
    //       <div className="category__product__card">
    //         {items.length > 0 ? (
    //           items.map((data) => (
    //             <ItemCard item={data} category={props.category} />
    //           ))
    //         ) : (
    //           <>NO RESULT</>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Category;
