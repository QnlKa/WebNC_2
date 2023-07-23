import { useEffect, useState } from "react";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import "./index.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemCard from "../Card/ItemCard/ItemCard";
const Search = () => {
  const [search, setSearch] = useState([]);
  const param = useParams();
  console.log(param);
  const apiGetProductsByKeyword = (keyword) => {
    axios.get("/api/customer/products/search/" + keyword).then((res) => {
      const result = res.data;
      console.log("result:", result);
      setSearch(result);
      console.log("search:", search);
    });
  };

  useEffect(() => {
    apiGetProductsByKeyword(param.id);
    console.log(param.id);
  }, [param.id]);
  const searchProds = search.map((oneproduct) => {
    return <ItemCard item={oneproduct} category="featured" />;
  });
  return (
    <>
      {search.length > 0 ? (
        <>
          <div className="featured__categories__container">
            <div className="featured__categories">
              <div className="featured__categories__header">
                <h1 className="featured__header__big">
                  Results found for: {param.id}{" "}
                </h1>
                <div className="featured__categories__header__line"></div>
                <div className="featured__products__card__container">
                  {searchProds}
                </div>
              </div>
              {/* <div className="featured__categories__card__container">
                  { featuredCategories.map((category) =>  <CategoryCard key={category.id} data={category}/>)}
              </div> */}
              <div className="featured__products__card__container"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="search__container">
          <div className="search__container__header">
            <h1>No results found for "{param.id}"</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
