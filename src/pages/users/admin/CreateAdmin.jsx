import React, { useEffect } from "react";
import Textinput from "../../../components/ui/Textinput";
import Fileinput from "../../../components/ui/Fileinput";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../../../components/ui/Card";
import * as yup from "yup";
import Breadcrumbschild from "../../../components/ui/Breadcrumbschild";
import { useCreateDataMutation, useGetDataMutation } from "../../../store/api/app/appSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
// import Textarea from "../../components/ui/Textarea";

const FormValidationSchema = yup
    .object({
        name: yup.string().required("Nama is Required"),
        email: yup.string().email("Invalid email").required("Email is Required"),
        password: yup
        .string()
        .min(6, "Password must be at least 8 characters")
        .max(20, "Password shouldn't be more than 20 characters")
        .required("Password is required"),
        })
        .required();

const CreateAdmin = () => {
    const [createData, { isLoading, isError, error, isSuccess }] = useCreateDataMutation();
    const [getData] = useGetDataMutation();
    // const [tanggal, setTanggal] = useState(new Date());
    // const listStatus = [
    //     { value: "Aktif", label: "Aktif" },
    //     { value: "Tidak Aktif", label: "Tidak Aktif" },
    // ];
    const [peraturan, setPeraturan] = useState('');

    // const handleFileChange2 = (e) => {
    //     setSelectedFile2(e.target.files[0]);
    // };
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });
    const navigate = useNavigate();


    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
        }),
    };

    const handleChange = (e, type) => {
        if (type === 'sesi') {
            setValueSesi(e.value);
        } else if (type === 'peraturan') {
            setPeraturan(e.target.value)
        }


    };

    const onSubmit = async (data) => {
        data['role'] = 'admin';
        data['username'] = '';
        console.log(data);
        try {
            const response = await createData({ path: '/admin', post: data });
            console.log('response upload', response);
            if (response.error) {
                console.log('1', response.error.data.message);
                if(response.error.data.message !== 'Email already exist'){
                    toast.error('Terjadi kesalahan');
                }else{
                    toast.info(response.error.data.message);
                }
                
                // throw new Error(response.error.message);
                return;
            }

            if (response.data.error) {
                console.log('2');
                throw new Error('Terjadi kesalahan');
            }

            navigate("/admin");
            toast.success("Create data Successful");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'User Admin', path: '/admin', childMenu: 'Create User Admin' }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Create User Admin</h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                        <Textinput
                            name="name"
                            label="Nama"
                            type="text"
                            placeholder="Enter Nama"
                            register={register}
                            error={errors.name}
                            msgTooltip
                        />
                        <Textinput
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Enter Email"
                            register={register}
                            error={errors.email}
                            msgTooltip
                        />
                        <Textinput
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Enter Password"
                            register={register}
                            error={errors.password}
                            msgTooltip
                        />
                        <div className="ltr:text-right rtl:text-left">

                            <Button
                                type="submit"
                                text="Submit"
                                className="btn btn-dark text-center "
                                isLoading={isLoading}
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default CreateAdmin;
