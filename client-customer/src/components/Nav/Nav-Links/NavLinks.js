import { Link } from "react-router-dom";
import "./NavLinks.css";
import { useState, useEffect } from "react";
import axios from "axios";
const NavLinks = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiGetCategories();
  }, []);

  const apiGetCategories = () => {
    axios
      .get("/api/customer/categories")
      .then((res) => {
        const result = res.data;
        setCategories(result);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  const cates = categories.map((item) => {
    return (
      <li key={item._id} className="nav-link">
        <Link to={"/category/" + item._id}>{item.name}</Link>
      </li>
    );
  });
  return (
    <nav className="nav__bottom__container">
      <div className="bottom__container">
        <ul className="nav">
          <li className="nav-link">
            <Link to="/">Home</Link>
          </li>
          {/* <li className='nav-link'><Link to="/shop">Shop</Link> </li>
                        <li className='nav-link'><Link to="/category/men">Men</Link></li> 
                        <li className='nav-link'><Link to="/category/women">Women</Link></li> 
                        <li className='nav-link'><Link to="/category/kids">Kids</Link></li> */}
          {cates}
          {console.log(categories)}
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;
