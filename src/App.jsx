import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import About from "./About";
import Home from "./Home";
import Navbar from "./Navbar";
import Cart from "./Cart";
import Login from "./Login";
import Contact from "./Contact";
import ProductDetails from "./ProductDetails";

function App() {
  const [cartToggle, setCartToggle] = useState(false);
  const setToggle = () => {
    setCartToggle(!cartToggle);
  };
  return (
    <>
      <BrowserRouter>
        <Navbar setCartToggle={setToggle}  />
        <Cart cartToggle={cartToggle} setCartToggle={setCartToggle} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productdetails" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
