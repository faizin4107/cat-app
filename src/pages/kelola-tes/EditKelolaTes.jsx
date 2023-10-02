import React from "react";
import axios from 'axios';
import Fileinput from "@/components/ui/Fileinput";
import { getTokenFromLocalStorage } from "@/store/localStorage";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@/components/ui/Card";
import Breadcrumbschild from "../../components/ui/Breadcrumbschild";
import { useState } from "react";
import { useEffect } from "react";
import ValidateFile from "../utility/ValidateFile";
import { toast } from "react-toastify";
import baseurl from "@/constant/baseurl";
import Button from "@/components/ui/Button";


const EditKelolaTes = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const propsData = location.state;
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileSizeOver, setFileSizeOver] = useState('');
    const [fileNotValid, setFileNotValid] = useState('');


    // console.log('propsData', propsData);

    const listStatus = [
        { value: "Aktif", label: "Aktif" },
        { value: "Tidak Aktif", label: "Tidak Aktif" },
    ];
    // const [namaTestCat, setNamaTestCat] = useState(propsData.nama_test_cat);
    const [status, setStatus] = useState(propsData.status);
    const listNamaTes = [
        { value: "Tes Pengetahuan Dasar", label: "Tes Pengetahuan Dasar" },
        { value: "Tes Psikologi", label: "Tes Psikologi" },
    ];
    let data = {};
    useEffect(() => {
        console.log('props', propsData);
        data = {
            value: propsData.nama_tes_cat,
            label: propsData.nama_tes_cat
        };

    })

    const [icon, setIcon] = useState(propsData.icon);
    const [state, setState] = useState({
        id: propsData.id,
        nama_tes_cat: propsData.nama_tes_cat
    });
    // const [namaTestCat, setNamaTesCat] = useState(data.value);

    // const valNameTest = useRef("");
    // const valStatus = useRef("");
    // useEffect(() => {
    // console.log('propsData', propsData.status)
    // setNamaTestCat(propsData.nama_test_cat)
    // setStatus(propsData.status)
    // setIcon(propsData.icon)
    // valNameTest.current.valueOf = propsData.nama_test_cat;
    // valStatus.current.valueOf = propsData.status;
    // console.log('namaTestCat', namaTestCat)
    // })







    // const handleFileChange2 = (e) => {
    //     setSelectedFile2(e.target.files[0]);
    // };
    // const {
    //     register,
    //     formState: { errors },
    //     handleSubmit,
    // } = useForm({
    //     resolver: yupResolver(FormValadtionSchema),
    // });
    // const {
    //     register,
    //     reset,
    //     formState: { errors },
    //     handleSubmit,
    // } = useForm({
    //     resolver: yupResolver(FormValidationSchema),

    //     mode: "all",
    // });
    // const navigate = useNavigate();


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
            if (type === 'status') {
                setStatus(e.value);
            } else {
                setNamaTesCat(e.value);
            }
        }

    };

    const handleInputChange = (event) => {
        console.log('name', event)
        const { name, value } = event.target;

        // console.log('value', value)
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        console.log('e', state.nama_tes_cat)
        e.preventDefault();
        // console.log('ya', valNameTest.current.value);
        // const values = [namaTestCat, icon, status];
        // console.log('nama_test_cat', state.nama_test_cat);
        // console.log('status', status);

        // data['status'] = valStatus;
        // // data['icon'] = selectedFile;

        const formData = new FormData();

        formData.set('id', state.id);
        formData.set('nama_tes_cat', state.nama_tes_cat);

        formData.set('status', status);
        formData.append('icon', selectedFile);
        try {
            const response = await axios.post(`${baseurl.apiUrl}/kelola-tes/${state.id}?_method=PUT`, formData, {
                headers: {
                    "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
                },
            }).then(
                result => {
                    console.log('result', result)
                    return result;
                },
                err => {
                    console.log('err', err)
                    return err;
                },
            );
            console.log('response', response)
            console.log('response update', response);
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
            toast.success("Update data Successful");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'Kelola Tes', path: '/kelola-tes', childMenu: 'Edit Kelola Tes' }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Edit Kelola Tes</h4>
                    </div>
                    <form onSubmit={handleSubmit.bind(this)} className="space-y-4 " encType="multipart/form-data">
                        {/* <FormGroup error={errors.nama_test_cat}> */}
                        <div>
                            <label htmlFor="nama_test_cat" className="form-label">
                                Nama Test CAT
                            </label>
                            <input
                                name="nama_tes_cat"
                                type="text"
                                id="nama_tes_cat"
                                label="Nama Tes CAT"
                                className="form-control py-2"
                                value={state.nama_tes_cat}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="icon" className="form-label">
                                Icon
                            </label>
                            {icon !== '' && selectedFile != '' ? (
                                <span className="inline-flex items-center">
                                    <span className="w-12 h-12 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                                        <img
                                            src={`${baseurl.imageurl}/${icon}`}
                                            alt=""
                                            className="object-cover w-full h-full rounded-full"
                                        />
                                    </span>
                                    {/* <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
                                  {row?.cell?.value.name}
                                </span> */}
                                </span>
                            ) : null}
                            <Fileinput
                                name="icon"
                                id="icon"
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
                                options={listStatus}
                                styles={styles}
                                id="status"
                                name="status"
                                // value={status}
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

export default EditKelolaTes;
