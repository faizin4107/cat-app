import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";
import MainLogo from "@/assets/images/logo-bcp.jpeg";
import LogoWhite from "@/assets/images/logo-bcp.jpeg";
import MobileLogo from "@/assets/images/logo-bcp.jpeg";
import MobileLogoWhite from "@/assets/images/logo-bcp.jpeg";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="#">
        {width >= breakpoints.xl ? (
          <img src={isDark ? LogoWhite : MainLogo} alt="" className="h-[30px] w-[30px]" />
        ) : (
          <img src={isDark ? MobileLogoWhite : MobileLogo} alt="" className="h-[30px] w-[30px]" />
        )}
      </Link>
    </div>
  );
};

export default Logo;
