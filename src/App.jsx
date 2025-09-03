import "./App.css";
import Product from "./Product";
import Navbar from "./Navbar";
import Cart from "./Cart";
import { useState } from "react";

function App() {
  const [cartToggle, setCartToggle] = useState(false);
  const setToggle = () => {
    setCartToggle(!cartToggle);
  };
  return (
    <>
      <Navbar setCartToggle={setToggle} />
      <Product />
      <Cart cartToggle={cartToggle} />
    </>
  );
}

export default App;
