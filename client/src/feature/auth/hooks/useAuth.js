import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, registerUser } from "../state/authAction.jsx";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const { isloading, user, error, isAuthenticat, accessToken } = useSelector(
    (state) => state.auth,
  );
  
  let registerForm = (data) => {
    dispatch(registerUser(data));
    error?.forEach((error) => {
      setError(error.path, {
        type: "server",
        message: error.msg,
      });
    });
    reset()
    navigate("/login")
  };

  
  let loginForm = (data) => {
    dispatch(loginUser(data));
    reset()
    navigate("/main")
  };

  const handleLogout = async () => {
  const result = await dispatch(logoutUser());

  if (logoutUser.fulfilled.match(result)) {
    navigate("/login");
  }
};
  return {
    handleLogout,
    register,
    reset,
    handleSubmit,
    loginForm,
    registerForm,
    setError,
    errors,
    isloading,
    user,
    error,
    isAuthenticat,
    accessToken,
    navigate,
  };
};
