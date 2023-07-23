import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "../routes/Home";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ManageAccount from "../components/Account/ManageAccount/ManageAccount";
import MyAccount from "../components/Account/MyAccount/MyAccount";
import Shop from "../components/Shop/Shop";
import ItemView from "../routes/ItemView";
import CategoryView from "../routes/CategoryView";
import SearchView from "../routes/Search";
import CartItemsProvider from "../Context/CartItemsProvider";
import Login from "../components/Authentication/Login/Login";
import Register from "../components/Authentication/Register/Register";
import Wishlist from "../components/Wishlist";
import Order from "../components/Card/Order/Order";
import WishItemsProvider from "../Context/WishItemsProvider";
import DrawerNav from "../components/Nav/DrawerNav/DrawerNav";
import Checkout from "../components/Checkout/Checkout";
import SearchProvider from "../Context/SearchProvider";
import MyprofileCard from "../components/Card/MyprofileCard/MyprofileCard";

function App() {
  return (
    <CartItemsProvider>
      <WishItemsProvider>
        <SearchProvider>
          <Router>
            <Header />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/account">
                <Route path="active/:id/:token" element={<ManageAccount />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<MyprofileCard />} />
              </Route>
              <Route path="/category">
                <Route path=":id" element={<CategoryView />} />
              </Route>
              <Route path="/item">
                <Route path=":id" element={<ItemView />} />
              </Route>
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/order" element={<Order />} />
              <Route path="/search">
                <Route path=":id" element={<SearchView />} />
              </Route>
            </Routes>
            <Footer />
            <Routes>
              <Route path="/admin" element={<Wishlist />} />
            </Routes>
          </Router>
        </SearchProvider>
      </WishItemsProvider>
    </CartItemsProvider>
  );
}

export default App;
