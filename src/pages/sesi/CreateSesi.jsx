import React from "react";
import Textinput from "../../components/ui/Textinput";
import Fileinput from "../../components/ui/Fileinput";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../../components/ui/Card";
import * as yup from "yup";
import Breadcrumbschild from "../../components/ui/Breadcrumbschild";
import { useCreateDataMutation } from "../../store/api/app/appSlice";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import Flatpickr from "react-flatpickr";
import { useEffect } from "react";

const FormValidationSchema = yup
    .object({
        nama_sesi_cat: yup.string().required("Nama sesi cat is Required"),
        tanggal: yup.string().required("Tanggal is Required"),
        waktu_pengerjaan: yup.string().required("Waktu pengerjaan is Required")
    })
    .required();

const CreateKelolaSesi = () => {
    const [createData, { isLoading, isError, error, isSuccess }] = useCreateDataMutation();
    // const [tanggal, setTanggal] = useState(new Date());
    const listStatus = [
        { value: "Aktif", label: "Aktif" },
        { value: "Tidak Aktif", label: "Tidak Aktif" },
    ];
    const [status, setStatus] = useState(listStatus[0].value);
    const [listMenit, setListMenit] = useState([]);
    const [waktuPengerjaan, setWaktuPengerjaan] = useState([]);
    useEffect(() => {
        for (var i = 1; i < 61; i++) {
            listMenit.push(
                {
                    value: i < 10 ? `0${i}` : `${i}`,
                    label: i < 10 ? `0${i}` : `${i}`
                }
            )
        }
        console.log('listmeni', listMenit)

        setWaktuPengerjaan(listMenit[0].value)
    }, [])

    const [peraturan, setPeraturan] = useState('');
    const params = useParams();
    // console.log('params', params);
    // const handleFileChange2 = (e) => {
    //     setSelectedFile2(e.target.files[0]);
    // };
    const location = useLocation();
    const propsData = location.state;
    console.log('propsdata create', propsData);
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
        if (type === 'peraturan') {
            setPeraturan(e.target.value)
        } else if (type === 'status') {
            setStatus(e.value);
        } else if (type === 'waktu_pengerjaan') {
            setWaktuPengerjaan(e.value);
        }


    };

    const [formValues, setFormValues] = useState([{ peraturan: "" }])

    let handleChange2 = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { peraturan: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    // let handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert(JSON.stringify(formValues));
    // }



    const onSubmit = async (data) => {
        // console.log('formValues', formValues);
        // console.log('praturan', peraturan)
        data['status'] = status;
        data['peraturan'] = formValues;
        data['kelolates_id'] = propsData[0].id;

        // let waktu = '';
        // if (waktuPengerjaan.charAt(0) === '0') {
        //     waktu = waktuPengerjaan.replace('0', '');
        // } else {
        //     waktu = waktuPengerjaan;
        // }
        // data['waktu_pengerjaan'] = waktu;
        // data['tanggal'] = tanggal;
        // data['icon'] = selectedFile;

        // let formData = new FormData();
        // formData.set('nama_test_cat', data.nama_test_cat);
        // formData.append('icon', selectedFile);
        // formData.set('status', valStatus);
        // const post = {
        //     nama_sesi_cat: data.nama_sesi_cat,
        //     tanggal: tanggal,
        //     status: status
        // }

        console.log(data);
        try {
            const response = await createData({ path: '/kelola-sesi', post: data });
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

            navigate(`/sesi/${params.id}`, {
                state: propsData
            });
            toast.success("Create data Successful");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'Kelola Sesi', path: `/sesi/${params.id}`, childMenu: 'Create Sesi', state: propsData }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Create Kelola Sesi</h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">

                        <Textinput
                            name="nama_sesi_cat"
                            label="Nama Sesi CAT"
                            type="text"
                            placeholder="Enter Nama Sesi CAT"
                            register={register}
                            error={errors.nama_sesi_cat}
                            msgTooltip
                        />
                        <Textinput
                            name="tanggal"
                            label="Tanggal"
                            type="date"
                            placeholder="Enter Tanggal"
                            register={register}
                            msgTooltip
                        />
                        <Textinput
                            name="waktu_pengerjaan"
                            label="Waktu Pengerjaan (Menit)"
                            type="number"
                            placeholder="Enter Waktu Pengerjaan"
                            register={register}
                            msgTooltip
                        />
                        {/* <div>
                            <label htmlFor="waktu_pengerjaan" className="form-label">
                                Waktu Pengerjaan (Menit)
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={listMenit[0]}
                                options={listMenit}
                                styles={styles}
                                id="waktu_pengerjaan"
                                name="waktu_pengerjaan"
                                onChange={e => handleChange(e, 'waktu_pengerjaan')}
                            />
                        </div> */}

                        {formValues.map((element, index) => (
                            <div className="form-inline" key={index}>
                                <label htmlFor="peraturan" className="form-label">
                                    Peraturan
                                </label>
                                <input type="text" name="peraturan" placeholder="Enter peraturan" className="form-control py-2" value={element.peraturan || ""} onChange={e => handleChange2(index, e)} />

                                {
                                    index ?
                                        <button type="button" className="mt-1 btn-danger btn-sm btn btn inline-flex justify-center remove" onClick={() => removeFormFields(index)}>Remove</button>
                                        : null
                                }
                            </div>
                        ))}
                        <div className="button-section">
                            <button className="mt-2 btn-primary btn-sm btn btn inline-flex justify-center" type="button" onClick={() => addFormFields()}>Add</button>
                        </div>

                        <div>
                            <label htmlFor="status" className="form-label">
                                Status
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={listStatus[0]}
                                options={listStatus}
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

export default CreateKelolaSesi;
