import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useAuth } from "../context/authContext";
import { ToastContainerNotification } from "../utils/notifications";
import { useEffect } from "react";

const PublicRoutes = () => {
  const { isLoggedIn, authUser } = useAuth();
  const route = useLocation().pathname;
  const isStoreLinked = authUser?.shop && authUser?.access_token;

  const naviagte = useNavigate();

  useEffect(() => {
    if (route === "/" && !isLoggedIn) {
      naviagte("/signup");
    }
    if (isLoggedIn && isStoreLinked) {
      naviagte("/dashboard");
    }
    if (isLoggedIn && !isStoreLinked) {
      naviagte("/verification");
    }
  }, [route, isLoggedIn, naviagte, isStoreLinked]);

  return (
    <>
      <Header />
      <Outlet />
      <ToastContainerNotification />
    </>
  );
};

export default PublicRoutes;
