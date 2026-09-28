import { useAuth } from "../../hooks/useAuth.js";

const RegisterFrom = () => {
  const { register, error, errors, isloading, handleSubmit, registerForm,navigate } =
    useAuth();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-200">
      <h1 className="font-bold text-xl px-30 py-3">Register Now</h1>

      <form
        onSubmit={handleSubmit(registerForm)}
        className="p-5 flex flex-col gap-4 bg-gray-400 w-100 rounded border border-gray-900 "
      >
        <input
          className=" outline-none cursor-pointer
             focus:border-blue-500 focus:ring-2 focus:ring-blue-200
             transition border border-gray-700 bg-gary-300 p-2 rounded"
          type="text"
          placeholder="Enter your name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          className=" outline-none cursor-pointer
             focus:border-blue-500 focus:ring-2 focus:ring-blue-200
             transition border border-gray-700 bg-gary-300 p-2 rounded"
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          className="border border-gray-700 bg-gary-300 p-2 rounded  outline-none cursor-pointer
             focus:border-blue-500 focus:ring-2 focus:ring-blue-200
             transition"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          className="outline-none border border-gray-700 bg-gary-300 p-2 rounded cursor-pointer
             focus:border-blue-500 focus:ring-2 focus:ring-blue-200
             transition"
          type="password"
          placeholder="confirm password"
          {...register("confirmPassword", {
            required: "confirm password required",
          })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <select
           className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 
             outline-none cursor-pointer
             focus:border-blue-500 focus:ring-2 focus:ring-blue-200
             transition"
          {...register("role", { required: "Role is required" })}
        >
          <option value="user">Buyer</option>
          <option value="seller">Seller</option>
        </select>

         {errors.role && <p>{errors.role.message}</p>}
       
        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          type="submit"
          disabled={isloading}
        >
          {isloading ? "Registering" : "Register"}
        </button>
        {error && <p> {error.message || "Registration failed"} </p>}
      </form>
      <p className="text-center text-gray-500 pt-8 text-lg">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-purple-500 font-semibold cursor-pointer hover:text-purple-400"
                >
                  Log In
                </span>
              </p>
    </div>
  );
};

export default RegisterFrom;
