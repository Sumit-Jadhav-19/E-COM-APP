import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./CartContext";
import { ToastProvider } from "./ToastContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </CartProvider>
  </StrictMode>
);
