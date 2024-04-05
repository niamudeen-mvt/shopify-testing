// @ts-nocheck
import ThemeProvider from "../../context/themeContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { ToastContainerNotification } from "../../utils/notifications";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";

const PUBLIC_ROUTES = ["/login", "/signup"];


const LayoutRoute = ({children}:any) => {
  const { isLoggedIn,authUser } = useAuth();
  
  const routeName = useLocation().pathname;
  const navigate = useNavigate();
  
  useEffect(() => {
    if(authUser?.shop && isLoggedIn){
      navigate('/dashboard')
    }
    if (PUBLIC_ROUTES.includes(routeName) && isLoggedIn) {
      navigate("/verification");
    }
  }, [routeName, isLoggedIn, navigate,authUser?.shop]);

  return (
    <>
      <Header />
      <ThemeProvider>
        <Outlet>
          {children}
        </Outlet>
      </ThemeProvider>
      <ToastContainerNotification />
    </>
  );
};

export default LayoutRoute;
