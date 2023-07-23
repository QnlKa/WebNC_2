import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Category from "../components/Category/Category";

const CategoryView = () => {
  const param = useParams();
  const [menItems, setMenItems] = useState();
  const [womenItems, setWomenItems] = useState();
  const [kidsItems, setKidsItems] = useState();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    apiGetCategories();
  }, [param.id]);
  const apiGetCategories = () => {
    axios
      .get("/api/customer/categories")
      .then((res) => {
        const result = res.data;
        setCategory(result.filter((item) => item._id === param.id));
        console.log(category);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  if (!isDataLoaded) {
    return null; // Return null or a loading indicator until data is loaded
  }
  return (
    <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
      {/* {loading && (
        <ReactLoading
          type="balls"
          color="#FFE26E"
          height={100}
          width={100}
          className="m-auto"
        />
      )} */}
      <Category id={param.id} name={category[0].name} />
    </div>
  );
};

export default CategoryView;
