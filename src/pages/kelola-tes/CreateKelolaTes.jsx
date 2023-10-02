import React from "react";
import Textinput from "../../components/ui/Textinput";
import Fileinput from "../../components/ui/Fileinput";
import { useForm } from "react-hook-form";
// import Icon from "../../ui/Icon";
import Select from "react-select";
import Icon from "../../components/ui/Icon";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../../components/ui/Card";
import * as yup from "yup";
import Breadcrumbschild from "../../components/ui/Breadcrumbschild";
import { useCreateDataMutation } from "../../store/api/app/appSlice";
import { useState } from "react";
import { useEffect } from "react";
import ValidateFile from "../utility/ValidateFile";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";

const FormValidationSchema = yup
    .object({
        nama_tes_cat: yup.string().required("Nama tes cat is Required")
    })
    .required();

const CreateKelolaTes = () => {
    const [createData, { isLoading, isError, error, isSuccess }] = useCreateDataMutation();
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileSizeOver, setFileSizeOver] = useState('');
    const [fileNotValid, setFileNotValid] = useState('');
    const status = [
        { value: "Aktif", label: "Aktif" },
        { value: "Tidak Aktif", label: "Tidak Aktif" },
    ];
    const [valStatus, setStatus] = useState(status[0].value);

    // const listNamaTes = [
    //     { value: "Tes Pengetahuan Dasar", label: "Tes Pengetahuan Dasar" },
    //     { value: "Tes Psikologi", label: "Tes Psikologi" },
    // ];

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

        if (type === 'file') {
            setSelectedFile(null);
            setFileSizeOver('');
            setFileNotValid('');
            if (e.target.files[0] !== undefined) {
                const data = ValidateFile.ValidatorImage(e.target.files[0]);
                if (data.hasOwnProperty('gambarNotValid')) {
                    setFileNotValid(data.gambarNotValid)
                } else if (data.hasOwnProperty('sizeOver')) {
                    setFileSizeOver(data.sizeOver)

                } else {
                    setSelectedFile(data.fileObject)
                }
            }
        } else {

            setStatus(e.value);
        }

    };

    const onSubmit = async (data) => {
        console.log('ya');

        data['status'] = valStatus;
        // data['icon'] = selectedFile;

        let formData = new FormData();
        formData.set('nama_tes_cat', data.nama_tes_cat);
        formData.append('icon', selectedFile);
        formData.set('status', valStatus);

        // console.log(data);
        try {
            const response = await createData({path: '/kelola-tes', post: formData});
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

            navigate("/kelola-tes");
            toast.success("Create data Successful");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'Kelola Tes', path: '/kelola-tes', childMenu: 'Create Kelola Tes' }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Create Kelola Tes</h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 " encType="multipart/form-data">
                        <Textinput
                            name="nama_tes_cat"
                            label="Nama Tes CAT"
                            type="text"
                            placeholder="Enter Nama Tes CAT"
                            register={register}
                            error={errors.nama_tes_cat}
                            msgTooltip
                        />
                        <div>
                            <label htmlFor="status" className="form-label">
                                Icon
                            </label>
                            <Fileinput
                                name="icon"
                                selectedFile={selectedFile}
                                // onChange={handleFileChange2}
                                onChange={e => handleChange(e, 'file')}
                                preview
                            />
                            {fileNotValid != '' ? (
                                <>

                                    <p className="text-sm font-light text-warning-500 mt-1">{fileNotValid}</p>
                                </>
                            ) : null}
                            {fileSizeOver != '' ? (
                                <>
                                    <p className="text-sm font-light text-warning-500 mt-1">{fileSizeOver}</p>
                                </>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="status" className="form-label">
                                Status
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={status[0]}
                                options={status}
                                styles={styles}
                                id="status"
                                name="status"
                                onChange={e => handleChange(e, 'status')}
                            />
                        </div>
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

export default CreateKelolaTes;
