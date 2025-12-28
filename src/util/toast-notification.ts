// src/lib/toast.ts
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Success toast
export const showSuccess = (message?: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
  });
};

// ✅ Error toast
export const showError = (message: string) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 10000,
    theme: "colored",
  });
};

// ✅ Info toast
export const showInfo = (message: string) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "light",
  });
};
