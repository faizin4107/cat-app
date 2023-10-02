import React, { useEffect, useState } from "react";
import axios from 'axios';
import Textinput from "../../../components/ui/Textinput";
import Fileinput from "../../../components/ui/Fileinput";
import { useForm } from "react-hook-form";
import { getTokenFromLocalStorage } from "../../../store/localStorage"
// import Icon from "../../ui/Icon";
import Select from "react-select";
import Icon from "../../../components/ui/Icon";
import { useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../../../components/ui/Card";
import * as yup from "yup";
import Breadcrumbschild from "../../../components/ui/Breadcrumbschild";
import { useGetDataMutation } from "../../../store/api/app/appSlice";
// import { useState } from "react";
// import { useEffect } from "react";
import ValidateFile from "../../utility/ValidateFile";
import { toast } from "react-toastify";
import baseurl from "../../../constant/baseurl";
import Button from "../../../components/ui/Button";
// import { useRef } from "react";

// const FormValidationSchema = yup
//     .object({
//         nama_test_cat: yup.string().required("Nama test cat is Required")
//     })
//     .required();

const EditTesPsikologi = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const propsData = location.state;
    const [getData] = useGetDataMutation();
    // const [kelolaTest, setKelolaTest] = useState({
    //     namaTestCat: propsData.nama_test_cat ? propsData.nama_test_cat : '',
    //     icon: propsData.icon ? propsData.icon : '',
    //     status: propsData.status ? propsData.status : ''
    //   });
    // const { namaTestCat, icon, status } = kelolaTest;
    const [isLoading, setIsLoading] = useState(false);
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
    // ];
    const [pilihanJawaban, setPilihanJawaban] = useState(propsData.pilihan_jawaban);
    const [pilihanJawabanTemp, setPilihanJawabanTemp] = useState(propsData.pilihan_jawaban);
    const [valSesi, setValueSesi] = useState(propsData.sesi);

    // console.log('propsData', propsData);


    // const [namaTestCat, setNamaTestCat] = useState(propsData.nama_test_cat);

    const [gambar, setGambar] = useState(propsData.gambar);
    // const [pilihan_jawaban, setPilihanJawaban] = useState(propsData.pilihan_jawaban);
    // const [kunci_jawaban, setKunciJawaban] = useState(propsData.kunci_jawaban);
    const [sesi, setSesi] = useState(propsData.sesi);
    const [state, setState] = useState({
        id: propsData.id,
        soal_cat: propsData.soal_cat,
        timer: propsData.timer
    });
    let dataPush = [];
    useEffect(() => {
        async function fetchData() {
            const response = await getData('/kelola-sesi');
            for (var i = 0; i < response.data.data.length; i++) {
                const data = {}
                data['value'] = response.data.data[i].nama_sesi_cat + ' (' + response.data.data[i].tanggal + ')';
                data['label'] = response.data.data[i].nama_sesi_cat + ' (' + response.data.data[i].tanggal + ')';
                // 
                dataPush.push(data)
            }
            setSesi(dataPush);
        }
        fetchData();
    }, [])

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
            if(type === 'pilihan_jawaban'){
                setPilihanJawaban(e);
            }else if(type === 'kunci_jawaban'){
                console.log('e', e)
                setKunciJawaban(e.value);
            }else if(type === 'sesi'){
                // setLengthSesi(1);
                setValueSesi(e.value);
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
        console.log('e', state.id)
        e.preventDefault();
        // console.log('ya', valNameTest.current.value);
        // const values = [namaTestCat, icon, status];
        // console.log('nama_test_cat', state.nama_test_cat);
        // console.log('status', status);

        // data['status'] = valStatus;
        // // data['icon'] = selectedFile;
        const listJawaban = [];
        for(var i = 0; i < pilihanJawaban.length; i++){
            const data = {} 
            if(pilihanJawaban[i]['value']){
                // console.log('pilih', pilihanJawaban[i]['value'])
                data['value'] = pilihanJawaban[i]['value']
                listJawaban.push(data)
            }
        }

        const formData = new FormData();
        let resultSesi = valSesi.split("(");
        let resultStringSesi = resultSesi[0].trim();
        formData.set('id', state.id);
        formData.set('soal_cat', state.soal_cat);
        formData.set('timer', state.timer);
        if(listJawaban.length === 0){
            // console.log('yes')
            if(pilihanJawaban.length === 0){
                formData.set('pilihan_jawaban', pilihanJawabanTemp);
            }else{
                formData.set('pilihan_jawaban', pilihanJawaban);
            }
        }else{
            formData.set('pilihan_jawaban', JSON.stringify(listJawaban));
        }
        
        formData.set('kunci_jawaban', kunciJawaban);
        formData.set('sesi', valSesi);
        formData.set('value_sesi', resultStringSesi);
        formData.append('gambar', selectedFile);

        console.log('soal_cat', state.soal_cat);
        if(listJawaban.length === 0){
            // console.log('yes')
            if(pilihanJawaban.length === 0){
                // console.log('yes 1')
                console.log('pilihan_jawaban1 1', pilihanJawabanTemp);
            }else{
                console.log('pilihan_jawaban1 2', pilihanJawaban);
            }
        }else{
            console.log('pilihan_jawaban2', JSON.stringify(listJawaban));
            // console.log('todal')
        }
        // console.log('pilihan_jawaban1', JSON.parse(pilihanJawaban));
        // console.log('pilihan_jawaban2', listJawaban);
        console.log('kunci_jawaban', kunciJawaban);
        console.log('sesi', valSesi);
        // console.log('sesi length', lengthSesi);
        console.log('gambar', selectedFile);

        // formData.set('sta', status);
        // formData.append('icon', selectedFile);
        // console.log(formData.get('nama_test_cat'))
        // console.log(formData.get('nama_test_cat'))
        // console.log(formData.get('icon'))
        // console.log(formData.get('status'))
        // console.log('ud', state.id);
        // var options = { content: formData };
        // const data = {
        //     id: state.id,
        //     nama_test_cat: state.nama_test_cat,
        //     icon: selectedFile,
        //     status: state.status
        // }
        try {
            const response = await axios.post(`${baseurl.apiUrl}/tes-psikologi/${state.id}?_method=PUT`, formData, {
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

            navigate("/tes-psikologi");
            toast.success("Update data Successful");

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'Tes Psikologi', path: '/tes-psikologi', childMenu: 'Edit Tes Psikologi' }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Edit Tes Psikologi</h4>
                    </div>
                    <form onSubmit={handleSubmit.bind(this)} className="space-y-4 " encType="multipart/form-data">
                        {/* <FormGroup error={errors.nama_test_cat}> */}
                        <div>
                            <label htmlFor="soal_cat" className="form-label">
                                Soal CAT
                            </label>
                            <input
                                name="soal_cat"
                                type="text"
                                id="soal_cat"
                                label="Soal CAT"
                                className="form-control py-2"
                                value={state.soal_cat}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="gambar" className="form-label">
                                Gambar
                            </label>
                            {gambar !== '' && selectedFile != '' ? (
                                <span className="inline-flex items-center">
                                    <span className="w-12 h-12 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                                        <img
                                            src={`${baseurl.imageurl}/${gambar}`}
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
                                name="gambar"
                                id="gambar"
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
                        <div>
                            <label htmlFor="timer" className="form-label">
                                Timer
                            </label>
                            <input
                                name="timer"
                                type="time"
                                id="timer"
                                label="Timer"
                                className="form-control py-2"
                                value={state.timer}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="sesi" className="form-label">
                                Sesi
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                options={sesi}
                                styles={styles}
                                id="sesi"
                                name="sesi"
                                onChange={e => handleChange(e, 'sesi')}
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

export default EditTesPsikologi;
