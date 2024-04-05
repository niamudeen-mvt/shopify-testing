// @ts-nocheck
import { Outlet, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/main-layout";
import { ToastContainerNotification } from "../utils/notifications";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

const ProtectedRoutes = ({ children }: any) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signup");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <MainLayout>
        <Outlet>{children}</Outlet>
      </MainLayout>
      <ToastContainerNotification />
    </>
  );
};

export default ProtectedRoutes;
