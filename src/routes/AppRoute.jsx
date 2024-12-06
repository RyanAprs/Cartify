import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import Navbar from "../components/Navbar";
import NavbarSecondary from "../components/NavbarSecondary";
import Home from "../pages/Home";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/product/:id"
          element={
            <>
              <Navbar />
              <ProductDetail />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <NavbarSecondary />
              <Cart />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
