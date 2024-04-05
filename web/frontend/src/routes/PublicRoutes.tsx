// @ts-nocheck
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useAuth } from "../context/authContext";
import { ToastContainerNotification } from "../utils/notifications";

const PublicRoutes = ({ children }: any) => {
  const { isLoggedIn, authUser } = useAuth();
  const route = useLocation().pathname;
  const navigate = useNavigate();
  const isStoreLinked = authUser?.shop && authUser?.access_token;

  useEffect(() => {
    if (route === "/") {
      navigate("/signup");
    }
    if (isLoggedIn && isStoreLinked) {
      navigate("/dashboard");
    }
  }, [isStoreLinked, isLoggedIn, navigate, route]);

  return (
    <>
      <Header />
      <Outlet>{children}</Outlet>
      <ToastContainerNotification />
    </>
  );
};

export default PublicRoutes;
