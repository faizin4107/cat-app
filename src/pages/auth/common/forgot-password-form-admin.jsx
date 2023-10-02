import React from "react";
import Textinput from "../../../components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { useCheckEmailMutation } from "../../../store/api/auth/authApiSlice";
// import { setUser } from "../../../store/api/auth/authSlice";
import { toast } from "react-toastify";
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required")
  })
  .required();
const ForgotPasswordFormAdmin = () => {
  const [checkEmail, { isLoading, isError, error, isSuccess }] = useCheckEmailMutation();

  const dispatch = useDispatch();

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
    // console.log('data', data)

    try {
      const response = await checkEmail(data);
      // console.log('response check email', response);
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
        // console.log('response check email 2', response.data);
        // console.log('response check email 3', response.data.data);
        const datauser = {
            valid_code: response.data.data,
            role: 'admin',
            email: data.email
        }
        // console.log('data', datauser)
        navigate("/otp-admin", {
            state: datauser
        });
      } else {
        toast.error('Email tidak terdaftar');
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
        name="email"
        label="Email"
        defaultValue=""
        type="email"
        placeholder="Enter Email"
        register={register}
        error={errors.email}
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

export default ForgotPasswordFormAdmin;
