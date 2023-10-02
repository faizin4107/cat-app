import React, { useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "@/components/ui/Card";
import * as yup from "yup";
import Breadcrumbschild from "@/components/ui/Breadcrumbschild";
import { useCreateDataMutation, useGetDataMutation } from "@/store/api/app/appSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";

const FormValidationSchema = yup
    .object({
        name: yup.string().required("Nama is Required"),
        username: yup.string().required("Username is Required"),
        password: yup
        .string()
        .min(6, "Password must be at least 8 characters")
        .max(20, "Password shouldn't be more than 20 characters")
        .required("Password is required"),
        })
        .required();

const CreatePeserta = () => {
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


    const onSubmit = async (data) => {
        data['role'] = 'peserta';
        data['email'] = '';
        console.log(data);
        try {
            const response = await createData({ path: '/peserta', post: data });
            console.log('response upload', response);
            if (response.error) {
                console.log('1');
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

            navigate("/peserta");
            toast.success("Create data Successful");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'User Peserta', path: '/peserta', childMenu: 'Create User Peserta' }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Create User Peserta</h4>
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
                            name="username"
                            label="Username"
                            type="text"
                            placeholder="Enter Username"
                            register={register}
                            error={errors.username}
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

export default CreatePeserta;
