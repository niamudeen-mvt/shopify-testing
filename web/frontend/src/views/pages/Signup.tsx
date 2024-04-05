import { useForm } from "react-hook-form";
import ThemeContainer from "../../components/layout/ThemeContainer";
import TextError from "../../components/shared/TextError";
import { Link, useNavigate } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { registerUser } from "../../services/api/auth";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    dispatch(startLoading());
    let res = await registerUser(data);
    if (res?.status === 201) {
      sendNotification("success", res.data.message);
      navigate("/login");
    } else {
      sendNotification("warning", res?.response?.data?.message);
    }
    dispatch(stopLoading());
  };

  return (
    <ThemeContainer themeCenter={true} isCenter={true}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-[500px] text-black p-10 rounded-md bg-white shadow-xl"
      >
        <h1 className="text-3xl mb-10">Signup Form</h1>
        <div className="mb-6 flex flex-col">
          <label>Username</label>
          <input
            type="text"
            {...register("name", {
              required: true,
              validate: (value) => isNaN(value),
            })}
            className="form__input"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.name && errors.name.type === "required" && (
            <TextError msg="Username is required" />
          )}
          {errors.name && errors.name.type === "validate" && (
            <TextError msg="Numbers are not allowed" />
          )}
        </div>
        <div className="form-control mb-6 flex flex-col">
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
            className="form__input"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.email && errors.email.type === "required" && (
            <TextError msg="Email is required." />
          )}
          {errors.email && errors.email.type === "pattern" && (
            <TextError msg="Email is not valid." />
          )}
        </div>
        <div className="form-control mb-6 flex flex-col">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 3,
            })}
            className="form__input"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.password && errors.password.type === "required" && (
            <TextError msg="Password is required." />
          )}
          {errors.password && errors.password.type === "minLength" && (
            <TextError msg="Password should be at-least 6 characters." />
          )}
        </div>{" "}
        <div className="mb-6 flex flex-col">
          <label>Contact Number</label>
          <input
            type="text"
            {...register("phone", {
              required: true,
              maxLength: 10,
            })}
            className="form__input"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.phone && errors.phone.type === "required" && (
            <TextError msg="Contact number is required" />
          )}
          {errors.phone && errors.phone.type === "maxLength" && (
            <TextError msg="Contact number should not contain more than 10 digits." />
          )}
        </div>
        <button
          type="submit"
          className="bg-secondary text-white px-7 py-2 rounded-lg border w-full mb-10"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
        <p className="text-sm text-center font-normal">
          Already have an account ?{" "}
          <Link to="/login">
            <span className="text-black font-medium">Signin</span>
          </Link>
        </p>
      </form>
    </ThemeContainer>
  );
};

export default SignupPage;
