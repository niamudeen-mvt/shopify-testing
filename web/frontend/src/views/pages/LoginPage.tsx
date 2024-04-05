import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import TextError from "../../components/shared/TextError";
import ThemeContainer from "../../components/layout/ThemeContainer";
import { sendNotification } from "../../utils/notifications";
import { storeAccessTokenLS, storeRefreshTokenLS } from "../../utils/helper";
import { useAuth } from "../../context/authContext";
import { loginUser } from "../../services/api/auth";
import { RootState } from "../../store";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";

const LoginPage = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setIsLoggedIn, setAuthUser } = useAuth();

  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    dispatch(startLoading());
    let res = await loginUser(data);
    if (res?.status === 200) {
      setAuthUser(res?.data?.user);
      setIsLoggedIn(true);
      sendNotification("success", res.data.message);
      storeAccessTokenLS(res.data.access_token);
      storeRefreshTokenLS(res.data.refresh_token);

      const { store, access_token } = res?.data?.user;

      const isStoreLinked = store && access_token;
      console.log("isStoreLinked: ", isStoreLinked);
      if (isStoreLinked) {
        navigate("/dashboard");
      } else {
        navigate("/verification");
      }
    } else {
      sendNotification("warning", res?.response?.data?.message);
    }
    dispatch(stopLoading());
  };

  return (
    <ThemeContainer themeCenter={true} isCenter={true}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-[500px] border text-black bg-white  shadow-xl  p-10 rounded-md relative -z-0"
      >
        <h1 className="text-3xl mb-10">Login Form</h1>
        <div className="form-control mb-6 flex flex-col">
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required.",
              },
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
            })}
            autoComplete="off"
            spellCheck={false}
            className="form__input"
          />
          {errors.email && <TextError msg={errors.email.message} />}
        </div>
        <div className="form-control mb-6 flex flex-col">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required.",
              },
              minLength: {
                value: 3,
                message: "Password should be at-least 3 characters.",
              },
            })}
            autoComplete="off"
            spellCheck={false}
            className="form__input"
          />
          {errors.password && <TextError msg={errors.password.message} />}
        </div>
        <button
          type="submit"
          className="mb-10 bg-secondary text-white px-7 py-2 rounded-lg border w-full"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>

        <p className="text-sm text-center font-normal">
          Dont't have an account ?{" "}
          <Link to="/signup">
            <span className="text-black font-medium">Signup</span>
          </Link>
        </p>
      </form>
    </ThemeContainer>
  );
};

export default LoginPage;
