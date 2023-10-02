import React from "react";
import Textinput from "../../../components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { useForgotPasswordMutation } from "../../../store/api/auth/authApiSlice";
// import { setUser } from "../../../store/api/auth/authSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const schema = yup
  .object({
    code: yup.string().required("Kode is Required"),
    password: yup
    .string()
    .min(6, "Password must be at least 8 characters")
    .max(20, "Password shouldn't be more than 20 characters")
    .required("Password is required"),
  })
  .required();
const FormOtpAdmin = () => {
  const [forgotPassword, { isLoading, isError, error, isSuccess }] = useForgotPasswordMutation();

  // const dispatch = useDispatch();
  const location = useLocation();
  const propsData = location.state;
  // console.log('propsData', propsData)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data['role'] = 'admin';
    data['email'] = propsData.email
    data['valid_code'] = propsData.valid_code;
    
    // console.log('data forgot', data)

    try {
      const response = await forgotPassword(data);
      // console.log('response forgot password', response);
      if (response.error) {
        // console.log('1');
        toast.error(response.error.data.message);
        // throw new Error(response.error.message);
        return;
      }

      if (response.data.error) {
        // console.log('2');
        throw new Error(response.data.error);
      }

      if (response.data.success === true) {
        navigate("/login-admin");
        toast.success("Change password Successfully");
        return;
      } else {
        toast.error('Kode otp salah');
        return;
      }

      // if(response.data )


    } catch (error) {
      toast.error(error.message);
    }
  };

  // const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="code"
        label="Kode OTP"
        defaultValue=""
        type="text"
        placeholder="Enter Kode OTP"
        register={register}
        error={errors.code}
        className="h-[48px]"
      />
     <Textinput
        name="password"
        label="New Password"
        defaultValue=""
        type="password"
        placeholder="Enter New Password"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
     
      <div className="flex justify-end">

        
      </div>

      <Button
        type="submit"
        text="Submit"
        className="btn btn-dark block w-full text-center "
        isLoading={isLoading}
      />
    </form>
  );
};

export default FormOtpAdmin;
