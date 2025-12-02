import { Link, Navigate } from "react-router";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validation/schema";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../api/authApi";

function RegisterForm() {
  //zod
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const resp = await authApi.post("/register", data);
      toast.success(resp.data.msg);
      document.getElementById("register-form");
      <Navigate to="/login" />;
    } catch (err) {
      const errMsg = err.response?.error || err.message;
      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* 1. Header  */}
      <header className="w-full   p-4 flex justify-start items-center">
        <Link to="/">Logo</Link>
      </header>

      {/* 2. Register Form */}
      <div
        className="
        w-full max-w-lg mx-auto 
        bg-white shadow-xl rounded-xl p-8 md:p-10 mt-12 mb-10 
        border border-gray-200
      "
      >
        {/* Title */}
        <div className="text-5xl font-bold text-gray-800 text-center mb-8">
          <p>REGISTER</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="space-y-5" // ระยะห่างสม่ำเสมอระหว่างฟิลด์
        >
          {/* 1. Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Username"
              {...register("username")}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.username?.message}
            </p>
          </div>

          {/* 2. Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Email"
              {...register("email")}
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          {/* 3. First Name Field */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your first name"
              {...register("firstName")}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName?.message}
            </p>
          </div>

          {/* 4. Last Name Field */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your last name"
              {...register("lastName")}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName?.message}
            </p>
          </div>

          {/* 5. Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
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

          {/* 6. Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please confirm your Password"
              {...register("confirmPassword")}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword?.message}
            </p>
          </div>

          {/* Register Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-amber-500 text-white text-lg font-semibold h-12 rounded-lg shadow-md hover:bg-amber-600 transition duration-200"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      {/* 3. Link to Login Page */}
      <div className="flex justify-center text-gray-700 mt-4 mb-10">
        <p className="mr-2">Already have an account?</p>
        <Link to="/login">
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition duration-200">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
export default RegisterForm;
