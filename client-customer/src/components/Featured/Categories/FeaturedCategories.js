import { useContext, useState, useEffect } from "react";
import { FeatureCategoryContext } from "../../../Context/FeaturedCategoryContext";
import CategoryCard from "../../Card/FeaturedCard/CategoryCard";
import ItemCard from "../../Card/ItemCard/ItemCard";
import "./FeaturedCategories.css";
import axios from "axios";

const Categories = () => {
  const [cate, setCate] = useState([]);
  const [newproduct, setNewroduct] = useState([]);
  const [hotproduct, setHotroduct] = useState([]);

  useEffect(() => {
    apiGetCategories();
  }, []);

  const apiGetCategories = () => {
    axios
      .get("/api/customer/products/new")
      .then((res) => {
        const result = res.data;
        setNewroduct(result);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axios
      .get("/api/customer/categories")
      .then((res) => {
        const result = res.data;
        setCate(result);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axios
      .get("/api/customer/products/hot")
      .then((res) => {
        const result = res.data;
        setHotroduct(result);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const newprods = newproduct.map((oneproduct) => {
    return <ItemCard item={oneproduct} category="featured" />;
  });
  const hotprods = hotproduct.map((oneproduct) => {
    return <ItemCard item={oneproduct} category="featured" />;
  });

  return (
    <>
      <div className="featured__categories__container">
        <div className="featured__categories">
          <div className="featured__categories__header">
            <h1 className="featured__header__big">CATEGORIES</h1>
            <div className="featured__categories__header__line"></div>
          </div>
          <div className="featured__categories__card__container">
            {cate.map((cateitem) => (
              <CategoryCard key={cateitem._id} data={cateitem} />
            ))}
          </div>
        </div>
      </div>
      <div className="featured__categories__container">
        <div className="featured__categories">
          <div className="featured__categories__header">
            <h1 className="featured__header__big">NEW PRODUCT </h1>
            <div className="featured__categories__header__line"></div>
          </div>
          {/* <div className="featured__categories__card__container">
                    { featuredCategories.map((category) =>  <CategoryCard key={category.id} data={category}/>)}
                </div> */}
          <div className="featured__products__card__container">{newprods}</div>
        </div>
      </div>
      {hotproduct.length > 0 ? (
        <div className="featured__categories__container">
          <div className="featured__categories">
            <div className="featured__categories__header">
              <h1 className="featured__header__big">HOT PRODUCT </h1>
              <div className="featured__categories__header__line"></div>
              <div className="featured__products__card__container">
                {hotprods}
              </div>
            </div>
            {/* <div className="featured__categories__card__container">
                  { featuredCategories.map((category) =>  <CategoryCard key={category.id} data={category}/>)}
              </div> */}
            <div className="featured__products__card__container"></div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Categories;
