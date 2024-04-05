import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import useWindowSize from "../../hooks/useWindowSize";
import { useAuth } from "../../context/authContext";
import { MENU_ITEMS } from "../../routes";

const Header = () => {
  const { userLogout, isLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const routeName = useLocation().pathname;
  const windowSize = useWindowSize();
  const navigate = useNavigate();

  useEffect(() => {
    if (windowSize.width >= 768) {
      setShowModal(false);
    }
  }, [windowSize.width]);

  function logout() {
    userLogout();
    navigate("/login");
  }

  return (
    <header className="bg-white fixed w-full z-50">
      <div className="max-w-[1200px] mx-auto  h-20 px-10 flex  items-center">
        <span className="font-semibold text-xl text-secondary w-full">
          ALI EXPRESS
        </span>
        <nav
          className={`md:block hidden w-full ${
            showModal
              ? "fixed w-full bg-white top-0 left-0 z-50 flex__center h-full"
              : ""
          }`}
        >
          <ul
            className={`flex justify-end ${
              showModal
                ? "flex-col gap-y-6 w-full bg-white top-0 left-0 flex__center h-full"
                : "gap-x-6 "
            }`}
          >
            {!isLoggedIn &&
              MENU_ITEMS?.map((route: { path: string; id: string }) => {
                return (
                  <Link
                    key={route.id}
                    to={route.path}
                    onClick={() => setShowModal(false)}
                  >
                    <li
                      className={`cursor-pointer capitalize  px-2 text-sm py-1 rounded-md text-secondary ${
                        routeName === route.path ? "font-semibold" : ""
                      }`}
                    >
                      {route.id}
                    </li>
                  </Link>
                );
              })}
            {isLoggedIn && (
              <Link to="/login">
                <li
                  onClick={() => logout()}
                  className={`cursor-pointer capitalize  px-2 text-sm py-1 rounded-md text-secondary`}
                >
                  logout
                </li>
              </Link>
            )}
          </ul>
        </nav>
        {showModal ? (
          <IoCloseSharp
            className={`cursor-pointer md:hidden h-6 w-6 z-50 fixed right-5 text-black`}
            onClick={() => setShowModal(!showModal)}
          />
        ) : (
          <AiOutlineMenu
            className={`cursor-pointer md:hidden h-6 w-6 z-50 fixed right-5 ${
              showModal ? "text-white" : "text-black"
            }`}
            onClick={() => setShowModal(!showModal)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
