import { SidebarItem } from "./SideNavigation";
import { RxDashboard } from "react-icons/rx";
import { BiBarChartSquare } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import SideNavigation from "./SideNavigation";
import { TbTableImport } from "react-icons/tb";

const MENU_ITEMS = [
  {
    id: "dashboard",
    title: "Dashboard",
    url: "/dashboard",
    icon: <RxDashboard size={20} />,
  },
  {
    id: "product_import",
    title: "Product Import",
    url: "/product-import",
    icon: <BiBarChartSquare size={20} />,
  },
  {
    id: "import_history",
    title: "Import History",
    url: "/import-history",
    icon: <TbTableImport size={20} />,
  },
];

export default function MainLayout({ children }: any) {
  const route = useLocation().pathname;

  return (
    <section className="min-h-100 w-full flex relative">
      <SideNavigation>
        {MENU_ITEMS?.map((menu) => {
          return (
            <SidebarItem
              key={menu?.id}
              icon={menu?.icon}
              text={menu?.title}
              alert
              url={menu?.url}
              active={route === menu?.url ? true : false}
            />
          );
        })}
      </SideNavigation>
      <main className="w-full min-h-screen px-4 py-10 sm:p-10 overflow-y-auto max-h-screen bg-slate-50">
        <div className="min-w-xxl mx-auto flex justify-center items-center flex-col">
          <div className="p-20 bg-white max-w-[750px]">{children}</div>
        </div>
      </main>
    </section>
  );
}
