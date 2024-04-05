import LoginPage from "../views/pages/LoginPage";
import SignupPage from "../views/pages/Signup";

export const MENU_ITEMS = [
  {
    id: "signup",
    path: "/signup",
    element: <SignupPage />,
  },
  {
    id: "login",
    path: "/login",
    element: <LoginPage />,
  }
];

