
import { useSelector, useDispatch } from "react-redux";
import { handleMobileMenu } from "@/store/layout";

const useMobileMenu = () => {
  const dispatch = useDispatch();
  const mobileMenu = useSelector((state) => state.layout.mobileMenu);
  // const location = useLocation();

  // ** Toggles Mobile Menu
  const setMobileMenu = (val) => dispatch(handleMobileMenu(val));

  return [mobileMenu, setMobileMenu];
};

export default useMobileMenu;
