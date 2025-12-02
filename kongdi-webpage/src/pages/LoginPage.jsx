import React from "react";
import { Link, useNavigate } from "react-router";
import useUserStore from "../stores/userStore";
import { loginSchema } from "../validation/schema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginPage() {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      login(data);
      navigate("/");
    } catch (err) {
      const errMsg = err.response?.data.message || err.message;
      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* 1. Header */}
      <header className="w-full  p-4 flex justify-start items-center">
        <Link to="/">Logo</Link>
      </header>

      {/* 2. Login Form  */}
      <div
        className="
          w-full max-w-sm mx-auto 
          bg-white shadow-xl rounded-xl p-8 mt-12 mb-10 
          border border-gray-200
        "
      >
        {/* Header/Title */}
        <div className="text-5xl font-bold text-gray-800 text-center mb-8">
          <p>LOGIN</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500" // สไตล์ Input มาตรฐานที่ดี
              placeholder="Enter your Username"
              {...register("username")}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.username?.message}
            </p>
          </div>

          {/* Password  */}
          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Password"
              {...register("password")}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white text-lg font-semibold h-12 rounded-lg shadow-md hover:bg-amber-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>

      {/* New user */}
      <div className="flex justify-center text-gray-700 mt-4">
        <p className="mr-2">New User?</p>
        <Link to="/register">
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition duration-200">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
