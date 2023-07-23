import ItemCarousel from "./Carousel/ItemCarousel";
import Description from "./Description/Description";
import Detail from "./Detail/Detail";
import "./Item.css";
import Related from "./Related/Related";
import { useEffect, useState } from "react";
import axios from "axios";
const Item = (props) => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("/api/customer/products/" + props.id)
      .then((res) => {
        setItem(res.data);
        setLoading(true);
        console.log(item);
      })
      .catch((err) => console.log(err));
  }, [props.id]);
  if (!loading) {
    return null; // Return null or a loading indicator until data is loaded
  }
  return (
    <div className="item__container">
      <div className="detail__and__carousel__container">
        <ItemCarousel image={item.image} />
        <Detail item={item} />
      </div>
      {console.log(item.image)}
      <div className="item__description__container">
        <Description item={item.decription} />
      </div>
      {/* <div className="related__items__container">
        <Related category={props.item} />
      </div>{" "} */}
    </div>
  );
};

export default Item;
