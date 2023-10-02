// import  from "react";
import React, { useState, useEffect } from "react";
import Textinput from "../../components/ui/Textinput";
import Fileinput from "../../components/ui/Fileinput";
import { useForm } from "react-hook-form";
// import Icon from "../../ui/Icon";
import Select from "react-select";
// import Icon from "../../components/ui/Icon";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "../../components/ui/Card";
import * as yup from "yup";
import Breadcrumbschild from "../../components/ui/Breadcrumbschild";
import { useCreateDataMutation } from "../../store/api/app/appSlice";
import ValidateFile from "../utility/ValidateFile";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Textarea from "../../components/ui/Textarea";

const FormValidationSchema = yup
    .object({
        // timer: yup.string().required("Timer is Required"),
        soal_cat: yup.string().required("Soal cat is Required")
    })
    .required();

const CreateTesCAT = () => {
    const [createData, { isLoading, isError, error, isSuccess }] = useCreateDataMutation();
    // const [getData] = useGetDataMutation();

    const params = useParams();
    const location = useLocation();
    const propsData = location.state;
    const [props, setProps] = useState();
    // console.log('propsData create', propsData.propsData)
    const [listMenit, setListMenit] = useState([]);
    const [timer, setTimer] = useState([]);
    useEffect(() => {
        for (var i = 1; i < 61; i++) {
            listMenit.push(
                {
                    value: i < 10 ? `0${i}` : `${i}`,
                    label: i < 10 ? `0${i}` : `${i}`
                }
            )
        }
        // console.log('listmeni', listMenit)

        setTimer(listMenit[0].value)
        setProps(propsData.propsData);
    }, [])

    // const [lengthSesi, setLengthSesi] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [nameVideo, setNameVideo] = useState('');
    const [fileSizeOver, setFileSizeOver] = useState('');
    const [fileNotValid, setFileNotValid] = useState('');

    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoSizeOver, setVideoSizeOver] = useState('');
    const [videoNotValid, setVideoNotValid] = useState('');
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
    // const [pilihanJawaban, setPilihanJawaban] = useState([]);

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
        } else if(type === 'video'){
            // console.log('video', type)
            setSelectedVideo(null);
            setNameVideo('');
            setVideoSizeOver('');
            setVideoNotValid('');
            if (e.target.files[0] !== undefined) {
                // console.log('target', e.target.files[0])
                const data = ValidateFile.ValidatorVideo(e.target.files[0]);
                // console.log('data', data)
                // setNameVideo(data.videoObject.name)
                if (data.hasOwnProperty('videoNotValid')) {
                    setVideoNotValid(data.videoNotValid)
                } else if (data.hasOwnProperty('sizeOver')) {
                    setVideoSizeOver(data.sizeOver)
                } else {
                    setSelectedVideo(data.videoObject)
                    
                }
                // console.log('selectedVideo', selectedVideo)
            }
        }else {
            if (type === 'pilihan_jawaban') {
                setPilihanJawaban(e);
            } else if (type === 'kunci_jawaban') {
                setKunciJawaban(e.value);
            }else if (type === 'timer') {
                setTimer(e.value);
            }

        }

    };

    const [valHuruf, setValHuruf] = useState(false);
    const [valDeskripsi, setValDeskripsi] = useState(false);
    const [formValues, setFormValues] = useState([{ huruf: "", deskripsi: "" }])

    let handleChange2 = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { huruf: "", deskripsi: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const onSubmit = async (data) => {
        // console.log('form', formValues)
        if (formValues[0].huruf === '') {
            setValHuruf(true)
            toast.info('Huruf is required')
            return;
        } else {
            setValHuruf(false)
        }
        if (formValues[0].deskripsi === '') {
            setValDeskripsi(true);
            toast.info('Deskripsi is required')
            return;
        } else {
            setValDeskripsi(false);
        }

        let formData = new FormData();
        formData.set('soal_cat', data.soal_cat);
        formData.set('kunci_jawaban', kunciJawaban);
        formData.set('timer', data.timer);
        formData.set('pilihan_jawaban', JSON.stringify(formValues));
        formData.set('kelolates_id', propsData.propsData[0].id);
        formData.set('kelolasesi_id', propsData.sesi.id);
        formData.append('gambar', selectedFile);
        formData.append('video', selectedVideo);
        try {
            const response = await createData({ path: '/soal-cat', post: formData });
            // console.log('response upload', response);
            if (response.error) {
                // console.log('1');
                toast.error('Terjadi kesalahan');
                // throw new Error(response.error.message);
                return;
            }

            if (response.data.error) {
                // console.log('2');
                throw new Error('Terjadi kesalahan');
            }

            navigate(-1);
            toast.success("Create data Successful");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            {propsData.propsData.propsData === undefined ? (
                <Breadcrumbschild menu={{ currentMenu: 'Soal ' + propsData.propsData[0].nama_tes_cat, path: `/cat/${params.sesiId}`, state: propsData, childMenu: 'Create ' + propsData.propsData[0].nama_tes_cat }} />
            ) : (
                <Breadcrumbschild menu={{ currentMenu: 'Soal ' + propsData.propsData.propsData[0].nama_tes_cat, path: `/cat/${params.sesiId}`, state: propsData, childMenu: 'Create ' + propsData.propsData.propsData[0].nama_tes_cat }} />
            )}

            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        {propsData.propsData.propsData === undefined ? (
                            <h4 className="card-title">Create {propsData.propsData[0].nama_tes_cat}</h4>
                        ) : (
                            <h4 className="card-title">Create {propsData.propsData.propsData[0].nama_tes_cat}</h4>
                        )}

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 " encType="multipart/form-data">
                        {/* <Textinput
                            name="nomor"
                            label="Nomor Soal"
                            type="number"
                            placeholder="Enter Nomor Soal"
                            register={register}
                            error={errors.nomor}
                            msgTooltip
                        /> */}
                        <Textarea
                            name="soal_cat"
                            label="Soal CAT"
                            type="text"
                            placeholder="Enter Soal CAT"
                            register={register}
                            error={errors.soal_cat}
                            msgTooltip
                        />
                        <Textinput
                            name="timer"
                            label="Timer (Menit)"
                            type="number"
                            placeholder="Enter Timer"
                            register={register}
                        />

                        {/* <div>
                            <label htmlFor="timer" className="form-label">
                                Timer (Menit)
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={listMenit[0]}
                                options={listMenit}
                                styles={styles}
                                id="timer"
                                name="timer"
                                onChange={e => handleChange(e, 'timer')}
                            />
                        </div> */}

                        <div>
                            <label htmlFor="gambar" className="form-label">
                                Gambar
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

                        <div>
                            <label htmlFor="video" className="form-label">
                                Video atau Audio
                            </label>
                            <Fileinput
                                name="video"
                                selectedFile={selectedVideo}
                                // onChange={handleFileChange2}
                                onChange={e => handleChange(e, 'video')}
                            />
                            {nameVideo !== '' ? (
                                <span>{nameVideo}</span>
                            ) : null}
                            {videoNotValid != '' ? (
                                <>

                                    <p className="text-sm font-light text-warning-500 mt-1">{videoNotValid}</p>
                                </>
                            ) : null}
                            {videoSizeOver != '' ? (
                                <>
                                    <p className="text-sm font-light text-warning-500 mt-1">{videoSizeOver}</p>
                                </>
                            ) : null}
                        </div>

                        {formValues.map((element, index) => (
                            <div className="form-inline" key={index}>
                                <label htmlFor="peraturan" className="form-label">
                                    Huruf
                                </label>
                                <input type="text" name="huruf" placeholder="Enter huruf" className="form-control py-2" value={element.huruf || ""} onChange={e => handleChange2(index, e)} />
                                {valHuruf  ? (
                                    <>
                                        <p className="text-sm font-light text-warning-500 mt-1">Huruf is required</p>
                                    </>
                                ) : null}
                                <label htmlFor="peraturan" className="form-label mt-2">
                                    Deskripsi
                                </label>
                                <textarea type="text" name="deskripsi" placeholder="Enter deskripsi" rows={3} className="form-control py-2" value={element.deskripsi || ""} onChange={e => handleChange2(index, e)} ></textarea>
                                {valDeskripsi ? (
                                    <>
                                        <p className="text-sm font-light text-warning-500 mt-1">Deskripsi is required</p>
                                    </>
                                ) : null}
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
                        {/* <label className="form-label" htmlFor="pilihan_jawaban">
                            Pilihan Jawaban
                        </label> */}
                        {/* <Select
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
                        /> */}
                        {/* {pilihanJawaban.length === 0 ? (
                            <>
                                <p className="text-sm font-light text-warning-500 mt-1">Pilihan jawaban is required</p>
                            </>
                        ) : null} */}
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

export default CreateTesCAT;
