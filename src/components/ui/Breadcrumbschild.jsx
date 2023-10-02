import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../ui/Icon";

const Breadcrumbschild = ({ menu }) => {
  const [role, setRole] = useState();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData !== null) {
      setRole(userData.role);
    }
  }, [])
  return (
    <>
      <div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
        <ul className="breadcrumbs">
          <li className="text-primary-500">
            {role === 'admin' ? (
              <NavLink to="/dashboard-admin" className="text-lg">
              <Icon icon="heroicons-outline:home" />
            </NavLink>
            ) : (
              <NavLink to="/dashboard-peserta" className="text-lg">
              <Icon icon="heroicons-outline:home" />
            </NavLink>
            )}
            
            <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
              <Icon icon="heroicons:chevron-right" />
            </span>
          </li>
          <li className="text-primary-500">
            <NavLink to={menu.path} state={menu.state} className="capitalize">
              {menu.currentMenu}
            </NavLink>
            <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
              <Icon icon="heroicons:chevron-right" />
            </span>
          </li>
          <li className="capitalize text-slate-500 dark:text-slate-400">
            {menu.childMenu}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Breadcrumbschild;
