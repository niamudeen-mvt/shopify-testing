import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../../context/authContext";
import useWindowSize from "../../../hooks/useWindowSize";

type SideNavigationTypes = {
  expanded: boolean;
};

const defaultContext: SideNavigationTypes = {
  expanded: true,
};

const SidebarContext = createContext(defaultContext);

type PropTypes = {
  children: ReactNode;
};
export default function SideNavigation({ children }: PropTypes) {
  const windowSize = useWindowSize();

  const [expanded, setExpanded] = useState(true);
  const { userLogout } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    userLogout();
    navigate("/signup");
  };

  useEffect(() => {
    if (windowSize?.width <= 946) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [windowSize?.width]);

  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-10 flex justify-between items-center">
            <span
              className={`overflow-hidden transition-all font-bold text-secondary ${
                expanded ? "w-32" : "w-0"
              }`}
            >
              ALI EXPRESS
            </span>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <LuChevronFirst /> : <LuChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <div className={`flex items-center overflow-hidden transition-all`}>
              <IoLogOutOutline
                size={22}
                className="cursor-pointer"
                onClick={() => logout()}
              />
              {expanded && (
                <div className="leading-4 ml-3">
                  <span className="text-sm text-gray-600">Logout</span>
                </div>
              )}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

type SideBarItemPropTypes = {
  icon: any;
  text: string;
  active: boolean;
  alert: any;
  url: string;
};

export function SidebarItem({
  icon,
  text,
  active = false,
  alert,
  url,
}: SideBarItemPropTypes) {
  const { expanded } = useContext(SidebarContext);
  return (
    <Link to={url}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group mb-4 ${
          active
            ? "bg-gradient-to-tr  bg-secondary text-white"
            : "hover:bg-primary text-gray-600"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && active && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
