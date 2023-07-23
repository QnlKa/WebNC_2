import NavLinks from "../Nav/Nav-Links/NavLinks";
import Navtop from "../Nav/Container/Container";
import "./Header.css";

const Header = () => {
  return (
    <div className="header__container">
      <Navtop />
      <NavLinks />
    </div>
  );
};

export default Header;
