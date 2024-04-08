import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../components/layout/main-layout";
import { ToastContainerNotification } from "../utils/notifications";
import { useAuth } from "../context/authContext";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }

  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <ToastContainerNotification />
    </>
  );
};

export default ProtectedRoutes;
