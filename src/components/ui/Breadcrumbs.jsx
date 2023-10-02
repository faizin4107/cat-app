import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { menuItemsAdmin, menuItemsPeserta } from "@/constant/data";
import Icon from "../ui/Icon";

const Breadcrumbs = () => {
  const location = useLocation();
  const locationName = location.pathname.replace("/", "");

  const [isHide, setIsHide] = useState(null);
  const [groupTitle, setGroupTitle] = useState("");
  const [hideAll, setHideAll] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if(userData != null){
      if(userData.role === 'admin'){
        const currentMenuItem = menuItemsAdmin.find(
          (item) => item.link === locationName
        );
        const currentChild = menuItemsAdmin.find((item) =>
          item.child?.find((child) => child.childlink === locationName)
        );
        
    
        if (currentMenuItem) {
          
          setIsHide(currentMenuItem.isHide);
          
        } else if (currentChild) {
          setIsHide(currentChild?.isHide || false);
          setGroupTitle(currentChild?.title);
          
        }else{
          setHideAll(true);
        }
      }else{
        const currentMenuItem = menuItemsPeserta.find(
          (item) => item.link === locationName
        );
    
        const currentChild = menuItemsPeserta.find((item) =>
          item.child?.find((child) => child.childlink === locationName)
        );
        
    
        if (currentMenuItem) {
          
          setIsHide(currentMenuItem.isHide);
          
        } else if (currentChild) {
          setIsHide(currentChild?.isHide || false);
          setGroupTitle(currentChild?.title);
          
        }else{
          setHideAll(true);
        }
      }
    }
    
  }, [location, locationName]);

  return (
    <>
      {hideAll ? 
      null :
        (
          

          <>
          {!isHide ? (
        <div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
          <ul className="breadcrumbs">
            <li className="text-primary-500">
              <NavLink to="/dashboard" className="text-lg">
                <Icon icon="heroicons-outline:home" />
              </NavLink>
              <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                <Icon icon="heroicons:chevron-right" />
              </span>
            </li>
            {groupTitle && (
              <li className="text-primary-500">
                <button type="button" className="capitalize">
                  {groupTitle}
                </button>
                <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                  <Icon icon="heroicons:chevron-right" />
                </span>
              </li>
            )}
            <li className="capitalize text-slate-500 dark:text-slate-400">
              {locationName}
            </li>
          </ul>
        </div>
      ) : null}
          </>
        )
    }
      
    </>
  );
};

export default Breadcrumbs;
