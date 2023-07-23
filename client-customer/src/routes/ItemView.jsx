import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Item from "../components/Item/Item";

const ProductView = (props) => {
  const param = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     axios
  //       .get("/api/customer/products/" + param.id)
  //       .then((res) => {
  //         setItem(res.data);
  //         setLoading(false);
  //       })
  //       .catch((err) => console.log(err));
  //   }, [param.id]);

  return (
    <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
      {console.log(item)}
      <Item id={param.id} />
    </div>
  );
};

export default ProductView;
