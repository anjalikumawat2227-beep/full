
import { useAuth } from "../../hooks/useAuth.js";

const LoginFrom = () => {
  const { register, error,isloading,handleSubmit,loginForm,navigate} = useAuth();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-200">
      <h1 className="font-bold text-xl px-30 py-3">Login Here</h1>
      <form onSubmit={handleSubmit(loginForm)}
       className="p-5 flex flex-col gap-4 bg-gray-400 w-100 rounded border border-gray-900 "
      >
        <input
          className=" outline-none cursor-pointer
             focus:border-blue-500 focus:ring-2 focus:ring-blue-200
             transition border border-gray-700 bg-gary-300 p-2 rounded"
          type="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
     
        <input
          className=" outline-none cursor-pointer
             focus:border-blue-500 focus:ring-2 focus:ring-blue-200
             transition border border-gray-700 bg-gary-300 p-2 rounded"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          type="submit"
          disabled={isloading}
        >
          {isloading ? "loging" : "login"}
        </button>
        {error && <p> {error.message || "login failed"} </p>}
      </form>
      <div className="mt-10 border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-purple-500 font-semibold cursor-pointer hover:text-purple-400"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
   
  );
};

export default LoginFrom;
