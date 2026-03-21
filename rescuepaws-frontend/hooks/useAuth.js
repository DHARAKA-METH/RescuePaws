import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../services/authService";
import toast from "react-hot-toast";

// 🔐 LOGIN
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      // save token
      localStorage.setItem("token", data.JwtToken);

      toast.success("Login successful 🎉");

      // redirect
      window.location.href = "/";
    },

    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });
};

// REGISTER
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      localStorage.setItem("token", data.JwtToken);
      toast.success("Registration successful 🎉");
      window.location.href = "/";
    },

    onError: (error) => {
      toast.error(error.message || "Register failed");
    },
  });
};
