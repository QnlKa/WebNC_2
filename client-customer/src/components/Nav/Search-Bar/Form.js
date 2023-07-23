import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Form.css";
import { useContext } from "react";
import { SearchContext } from "../../../Context/SearchContext";
import { Link } from "react-router-dom";
const Form = () => {
  const [searchInput, setSearchInput] = useState("");
  const searchContext = useContext(SearchContext);
  const navigate = useNavigate();

  const handelChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handelFormSubmit = (e) => {
    e.preventDefault();
    // searchContext.setSearchQuery(searchInput);
  };

  return (
    <form className="search__form" onSubmit={handelFormSubmit}>
      <input
        type="text"
        placeholder="Search for products"
        className="search__form__input"
        value={searchInput}
        onChange={handelChange}
        required
      />

      <button className="search__form__button" type="submit">
        <Link to={"/search/" + searchInput}>
          <SearchIcon fontSize="medium" />{" "}
        </Link>
      </button>
    </form>
  );
};

export default Form;
