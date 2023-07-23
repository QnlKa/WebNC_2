import "./NavBrand.css";
import { Link } from "react-router-dom";

const NavBrand = () => {
  const customer = sessionStorage.getItem("customer")
    ? JSON.parse(sessionStorage.getItem("customer"))
    : null;
  return (
    <div href="#home" className="navbrand__container">
      <h5 className="navbrand">
        {customer ? <Link to="/">Hello {customer.name}</Link> : <></>}
      </h5>
    </div>
  );
};

export default NavBrand;
