import React from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "@/components/ui/Card";
import * as yup from "yup";
import Breadcrumbschild from "@/components/ui/Breadcrumbschild";
import { useCreateDataMutation } from "@/store/api/app/appSlice";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";

const FormValidationSchema = yup
    .object({
        huruf: yup.string().required("Huruf is Required"),
        deskripsi: yup.string().required("Deskripsi is Required")
    })
    .required();

const CreatePilihanJawaban = () => {
    const [createData, { isLoading, isError, error, isSuccess }] = useCreateDataMutation();
    const params = useParams();
    const location = useLocation();
    const propsData = location.state;
    console.log('propsdata pilihan jawaban', propsData);
    console.log('params pilihan jawaban', params);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
    });
    const navigate = useNavigate();

    
    const onSubmit = async (data) => {
        data['soalcat_id'] = propsData[1].tes.id;

       
        console.log(data);
        try {
            const response = await createData({ path: '/pilihan-jawaban', post: data });
            console.log('response upload', response);
            if (response.error) {
                console.log('1');
                toast.error('Terjadi kesalahan');
                // throw new Error(response.error.message);
                return;
            }

            if (response.data.error) {
                console.log('2');
                throw new Error('Terjadi kesalahan');
            }
            if(response.data.message !== '' && response.data.success === false){
                toast.info(response.data.message);
                return;
            }
            if(response.data.success === true){
                navigate(`/pilihan-jawaban/${params.id}`, {
                    state: propsData
                });
                toast.success("Create data Successful");
            }

            
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'Pilihan Jawaban', path: `/pilihan-jawaban/${params.id}`, childMenu: 'Tambah Pilihan Jawaban', state: propsData }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Create Kelola Sesi</h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">

                        <Textinput
                            name="huruf"
                            label="Huruf"
                            type="text"
                            placeholder="Enter Huruf"
                            register={register}
                            error={errors.huruf}
                            msgTooltip
                        />
                        <Textarea
                            name="deskripsi"
                            label="Deskripsi"
                            type="text"
                            placeholder="Enter Deskripsi"
                            register={register}
                            error={errors.deskripsi}
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

export default CreatePilihanJawaban;
