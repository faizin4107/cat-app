import React from "react";
import Textinput from "../../../components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../store/api/auth/authApiSlice";
import { setUser } from "../../../store/api/auth/authSlice";
import { toast } from "react-toastify";
const schema = yup
  .object({
    username: yup.string().required("Username is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

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
    data['role'] = 'peserta';
    // console.log('data', data)

    try {
      // console.log('data',data)
      const response = await login(data);
      // console.log('response login', response);
      // console.log('isError', isError)
      // console.log('error', error)
      // console.log('error', error)
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
        const userData = {
          username: response.data.data.username,
          name: response.data.data.name,
          accessToken: response.data.access_token,
          role: response.data.data.role
        }

        dispatch(setUser(userData));
        navigate("/dashboard-peserta");
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Login Successful");
      } else {
        toast.error('Terjadi kelasahan');
      }





    } catch (error) {
      toast.error(error.message);
    }
  };

  // const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="username"
        label="Username"
        defaultValue=""
        type="text"
        placeholder="Enter Username"
        register={register}
        error={errors.username}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="Password"
        type="password"
        defaultValue=""
        placeholder="Enter Password"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <div className="flex justify-end">

        {/* <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link> */}
      </div>

      <Button
        type="submit"
        text="Login"
        className="btn btn-dark block w-full text-center "
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginForm;
