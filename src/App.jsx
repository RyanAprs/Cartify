import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import NavbarSecondary from "./components/NavbarSecondary";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

function App() {
  return (
    <div className="md:px-16 px-4 py-2 min-h-screen max-h-full w-full bg-second-color">
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
    </div>
  );
}

export default App;
