// import  from "react";
import React, { useState, useEffect } from "react";
import Textinput from "../../../components/ui/Textinput";
import Fileinput from "../../../components/ui/Fileinput";
import { useForm } from "react-hook-form";
// import Icon from "../../ui/Icon";
import Select from "react-select";
// import Icon from "../../components/ui/Icon";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../../../components/ui/Card";
import * as yup from "yup";
import Breadcrumbschild from "../../../components/ui/Breadcrumbschild";
import { useCreateDataMutation, useGetDataMutation } from "../../../store/api/app/appSlice";

import ValidateFile from "../../utility/ValidateFile";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";

const FormValidationSchema = yup
    .object({
        soal_cat: yup.string().required("Soal cat is Required"),
        timer: yup.string().required("Timer is Required")
    })
    .required();

const CreateTesPsikologi = () => {
    const [createData, { isLoading, isError, error, isSuccess }] = useCreateDataMutation();
    const [getData] = useGetDataMutation();
    const [sesi, setSesi] = useState([]);
    const [valSesi, setValueSesi] = useState([]);
    // const [lengthSesi, setLengthSesi] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileSizeOver, setFileSizeOver] = useState('');
    const [fileNotValid, setFileNotValid] = useState('');
    const listKunciJawaban = [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
        { value: "D", label: "D" },
        { value: "E", label: "E" },
    ];
    const [kunciJawaban, setKunciJawaban] = useState(listKunciJawaban[0].value);
    // const listPilihanJawaban = [
    //     { value: "A", label: "A" },
    //     { value: "B", label: "B" },
    //     { value: "C", label: "C" },
    //     { value: "D", label: "D" },
    //     { value: "E", label: "E" },
    //   ];
      const [pilihanJawaban, setPilihanJawaban] = useState([]);
      let dataPush = [];

      useEffect(() => {
        async function fetchData() {
            const response = await getData('/kelola-sesi');
           
            // setSesi(response.data.data);
            
            for(var i = 0; i < response.data.data.length; i++){
                const data = {}
                data['value'] = response.data.data[i].nama_sesi_cat + ' (' + response.data.data[i].tanggal + ')';
                data['label'] = response.data.data[i].nama_sesi_cat + ' (' + response.data.data[i].tanggal + ')';
                // 
                dataPush.push(data)
            }
            // setLengthSesi(dataPush.length);
            setSesi(dataPush);
            
            
        }
        fetchData();
    }, [])
    // console.log('response', sesi)

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
            if(type === 'pilihan_jawaban'){
                setPilihanJawaban(e);
            }else if(type === 'kunci_jawaban'){
                setKunciJawaban(e.value);
            }else if(type === 'sesi'){
                // setLengthSesi(1);
                setValueSesi(e.value);
            }
            
        }

    };

    const onSubmit = async (data) => {
        console.log('ya');

        // data['status'] = valStatus;
        // data['icon'] = selectedFile;
        const listJawaban = [];
        for(var i = 0; i < pilihanJawaban.length; i++){
            const data = {} 
            if(pilihanJawaban[i]['value']){
                // console.log('pilih', pilihanJawaban[i]['value'])
                data['value'] = pilihanJawaban[i]['value']
                listJawaban.push(data)
            }
        }
        let formData = new FormData();
        formData.set('soal_cat', data.soal_cat);
        formData.set('pilihan_jawaban', JSON.stringify(listJawaban));
        formData.set('kunci_jawaban', kunciJawaban);
        formData.set('timer', data.timer);
        formData.set('sesi', valSesi);
        formData.append('gambar', selectedFile);
        

        console.log('soal_cat', data.soal_cat);
        
        console.log('pilihan_jawaban1', pilihanJawaban);
        console.log('pilihan_jawaban2', listJawaban);
        console.log('kunci_jawaban', kunciJawaban);
        console.log('sesi', valSesi);
        console.log('timer', data.timer);
        console.log('gambar', selectedFile);
       
        try {
            const response = await createData({path: '/tes-psikologi', post: formData});
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

            navigate("/tes-psikologi");
            toast.success("Create data Successful");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'Tes Psikologi', path: '/tes-psikologi', childMenu: 'Create Tes Psikologi' }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Create Tes Psikologi</h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 " encType="multipart/form-data">
                        <Textinput
                            name="soal_cat"
                            label="Soal CAT"
                            type="text"
                            placeholder="Enter Soal CAT"
                            register={register}
                            error={errors.soal_cat}
                            msgTooltip
                        />

                        <div>
                            <label htmlFor="gambar" className="form-label">
                                Icon
                            </label>
                            <Fileinput
                                name="gambar"
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
                        <label className="form-label" htmlFor="pilihan_jawaban">
                            Pilihan Jawaban
                        </label>
                        <Select
                            isClearable={false}
                            // defaultValue={[listPilihanJawaban[0]]}
                            styles={styles}
                            isMulti
                            name="pilihan_jawaban"
                            options={listKunciJawaban}
                            className="react-select"
                            classNamePrefix="select"
                            id="pilihan_jawaban"
                            onChange={e => handleChange(e, 'pilihan_jawaban')}
                        />
                        {pilihanJawaban.length === 0 ? (
                                <>
                                    <p className="text-sm font-light text-warning-500 mt-1">Pilihan jawaban is required</p>
                                </>
                            ) : null}
                        <div>
                            <label htmlFor="kunci_jawaban" className="form-label">
                                Kunci Jawaban
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={listKunciJawaban[0]}
                                options={listKunciJawaban}
                                styles={styles}
                                id="kunci_jawaban"
                                name="kunci_jawaban"
                                onChange={e => handleChange(e, 'kunci_jawaban')}
                            />
                        </div>
                        <Textinput
                            name="timer"
                            label="Timer"
                            type="time"
                            placeholder="Enter Timer"
                            register={register}
                            msgTooltip
                        />
                        <div>
                            <label htmlFor="sesi" className="form-label">
                                Sesi
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                // defaultValue={listKunciJawaban[0]}
                                options={sesi}
                                styles={styles}
                                id="sesi"
                                name="sesi"
                                onChange={e => handleChange(e, 'sesi')}
                            />
                        </div>
                        {valSesi.length == 0 ? (
                                <>
                                    <p className="text-sm font-light text-warning-500 mt-1">Sesi is required</p>
                                </>
                            ) : null}
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

export default CreateTesPsikologi;
