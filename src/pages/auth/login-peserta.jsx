import React from "react";
import LoginFormPeserta from "./common/login-form-peserta";
import LogoBcp from "@/assets/images/logo-bg.jpeg";

const loginPeserta = () => {
  // const [isDark] = useDarkMode();
  return (
    <div className="loginwrapper">
      <div className="lg-inner-column">
        <div className="right-column relative">
          <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
            <div className="auth-box h-full flex flex-col justify-center">
              {/* <div className="mobile-logo text-center mb-6 md:hidden block">
                <Link to="/">
                  <img
                    src={LogoBcp}
                    alt=""
                    className="mx-auto"
                  />
                </Link>
              </div> */}
              <div className="text-center 2xl:mb-10 mb-4">
                <h4 className="font-medium">Login</h4>
                <div className="text-slate-500 dark:text-slate-400 text-base">
                  Login Tes CAT Bina Cipta Bangsa
                </div>
              </div>
              <LoginFormPeserta />
              
            </div>
            <div className="auth-footer text-center">
              Copyright 2023, Bina Cipta Bangsa All Rights Reserved.
            </div>
          </div>
        </div>
        <div
          className="left-column bg-contain bg-no-repeat bg-center "
          style={{
            backgroundImage: `url(${LogoBcp})`,
          }}
        >
          <div className="flex flex-col h-full justify-center">
            {/* <div className="flex-1 flex flex-col justify-center items-center">
              <Link to="/">
                <img src={LogoWhite} alt="" className="mb-10" />
              </Link>
            </div> */}
            <div>
              {/* <div className="black-500-title max-w-[525px] mx-auto pb-20 text-center">
               
                <span className="text-white font-bold"> bina cipta bangsa</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginPeserta;
