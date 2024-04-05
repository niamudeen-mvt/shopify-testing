import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import TextError from "../../components/shared/TextError";
import { RootState } from "../../store";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { verifyCredentials } from "../../services/api/auth";
import { sendNotification } from "../../utils/notifications";
import { updateUser } from "../../services/api/user";
import StaticPage from "../../components/shared/StaticPage";

const VerificationPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    dispatch(startLoading());
    const { store, access_token } = data;

    if (store && access_token) {
      try {
        const { data } = await verifyCredentials({
          store,
          access_token,
        });

        if (data?.code === "SUCCESS") {
          await updateUser({
            shop: data?.shop,
            access_token: data?.access_token,
          });
          sendNotification("success", "Store has been successfully linked");
          navigate("/dashboard");
          reset();
        } else if (data?.code === "AUTHORIZATION") {
          sendNotification("error", "Please provie a valid access token");
        } else if (data?.code === "INAVALID_STORE") {
          sendNotification("error", "Store name is inavalid.");
        } else if (data?.code === "NOT_FOUND") {
          sendNotification("error", "Please provie valid credentials");
        }

        dispatch(stopLoading());
      } catch (error) {
        console.log("error: ", error);
        dispatch(stopLoading());
      }
    }
  };

  return (
    <section className="p-25 w-full sm:max-w-[1000px] mx-auto flex__center flex-col mb-10 relative">
      <section className="mb-6 bg-white p-8 shadow-sm mt-40">
        <StaticPage />
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-[100px] max-w-xxl p-10 rounded-lg -z-0 bg-white shadow-lg flex flex-col sm:flex-row gap-8 fixed bottom-5"
      >
        <div className="form-control flex flex-col">
          <label className="mb-3 text-black">
            Store (myshopify.com domain)
          </label>
          <input
            type="text"
            placeholder="myshopify.com domain"
            {...register("store", {
              required: {
                value: true,
                message: "Store name is required.",
              },
            })}
            autoComplete="off"
            spellCheck={false}
            className={`text-sm border-b mb-4 py-2 text-black pl-4`}
          />
          {errors.store && (
            <TextError color="dark" msg={errors.store.message} />
          )}
        </div>
        <div className="form-control flex flex-col">
          <label className="mb-3 text-black">Access Token</label>
          <input
            type="text"
            placeholder="shpat_abc123def456ghi789"
            {...register("access_token", {
              required: {
                value: true,
                message: "Access token is required.",
              },
            })}
            autoComplete="off"
            spellCheck={false}
            className={`text-sm border-b py-2 text-black pl-4`}
          />
          {errors.access_token && (
            <TextError color="dark" msg={errors.access_token.message} />
          )}
        </div>
        <button
          type="submit"
          className="text-white mt-8 px-7 rounded-lg border w-full bg-blue-600 h-10"
        >
          {isLoading ? "Linking..." : "Link Store"}
        </button>
      </form>
    </section>
  );
};

export default VerificationPage;
