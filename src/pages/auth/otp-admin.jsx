import React from "react";
import { Link } from "react-router-dom";
import FormOtpAdmin from "./common/form-otp-admin";
// import Social from "./common/social";
// import useDarkMode from "../../hooks/useDarkMode";

// image import
// import LogoWhite from "../../assets/images/logo/logo-white.svg";
// import Logo from "../../assets/images/logo/logo.svg";
import Illustration from "../../assets/images/logo-bg.jpeg";

const otpAdmin = () => {
    // const [isDark] = useDarkMode();
    return (
        <div className="loginwrapper">
            <div className="lg-inner-column">
                <div className="left-column relative z-[1]">
                    <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">

                        <h4 className="ml-2">
                            Bina Cipta Bangsa

                        </h4>
                    </div>
                    <div className="absolute left-0 2xl:bottom-[-60px] bottom-[-30px] h-full w-full z-[-1]">
                        <img
                            src={Illustration}
                            alt=""
                            className="h-full w-full object-contain"
                        />
                    </div>
                </div>
                <div className="right-column relative">
                    <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                        <div className="auth-box h-full flex flex-col justify-center">
                            {/* <div className="mobile-logo text-center mb-6 lg:hidden block">
                <Link to="/">
                  <img
                    src={isDark ? LogoWhite : Logo}
                    alt=""
                    className="mx-auto"
                  />
                </Link>
              </div> */}
                            <div className="text-center 2xl:mb-10 mb-4">
                                <h4 className="font-medium">Bina Cipta Bangsa</h4>
                                <div className="text-slate-500 text-base">
                                    <p>Kode OTP telah dikirim ke email anda</p>
                                    <p>Silahkan Masukan Kode OTP dan Password Baru Anda</p>
                                </div>
                            </div>
                            <FormOtpAdmin />
                            <div className=" relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6 mt-3">
                                
                                <Link
                                    type="button"
                                    className="btn btn-dark block w-full text-center "
                                    to="/forgot-password-admin"
                                >Kembali</Link>
                            </div>


                        </div>
                        <div className="auth-footer text-center">
                            Copyright 2023, Bina Cipta Bangsa.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default otpAdmin;
