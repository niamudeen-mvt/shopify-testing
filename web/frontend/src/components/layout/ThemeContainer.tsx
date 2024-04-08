import { useTheme } from "../../context/themeContext";

type Props = {
  children: React.ReactNode;
  isCenter?: boolean;
  themeCenter?: boolean;
  isTransparent?: boolean;
};

const ThemeContainer = ({
  children,
  isCenter,
  themeCenter,
  isTransparent,
}: Props) => {
  const { isThemeLight, setIsThemeLight } = useTheme();
  return (
    <section
      className={`min-h-screen w-full ${themeCenter ? "flex__center" : ""} ${
        isThemeLight && !isTransparent ? "" : isTransparent ? "" : "dark__mode"
      }`}
    >
      <div className={`custom__container  ${isCenter ? "flex__center" : ""}`}>
        {children}
      </div>
      {/* <div className="flex flex-col gap-4 fixed bottom-10 right-10">
        <FaMoon
          size={25}
          onClick={() => setIsThemeLight(false)}
          className="cursor-pointer"
        />
        <GoSun
          size={25}
          onClick={() => setIsThemeLight(true)}
          className="cursor-pointer"
        />
      </div> */}
    </section>
  );
};

export default ThemeContainer;
