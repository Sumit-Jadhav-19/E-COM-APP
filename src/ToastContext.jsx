import { createContext, useContext, useState } from "react";

export const ToastContext = createContext();
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(false);
  const showToast = (val) => {
    setToast(val);
  };
  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
