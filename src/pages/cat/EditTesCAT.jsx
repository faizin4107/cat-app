import React, { useEffect, useState } from "react";
import axios from 'axios';
import Fileinput from "@/components/ui/Fileinput";
import { getTokenFromLocalStorage } from "@/store/localStorage";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@/components/ui/Card";
import Breadcrumbschild from "@/components/ui/Breadcrumbschild";
import ValidateFile from "../utility/ValidateFile";
import { toast } from "react-toastify";
import baseurl from "@/constant/baseurl";
import Button from "@/components/ui/Button";
import { useParams } from "react-router-dom";

const EditTesCAT = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const propsData = location.state;
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
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
    // ];
    const [pilihanJawaban, setPilihanJawaban] = useState(propsData[1].tes.pilihan_jawaban);
    // const [pilihanJawabanTemp, setPilihanJawabanTemp] = useState(propsData[1].tes.pilihan_jawaban);
    // const [valuePilihanJawabanTemp, setvaluePilihanJawabanTemp] = useState(propsData[1].tes.value_pilihan_jawaban);

    const [listMenit, setListMenit] = useState([]);
    const [timer, setTimer] = useState([]);
    // const [valSesi, setValueSesi] = useState(propsData.sesi);

    // console.log('propsData', propsData);


    // const [namaTestCat, setNamaTestCat] = useState(propsData.nama_test_cat);

    const [gambar, setGambar] = useState(propsData[1].tes.gambar);
    const [video, setVideo] = useState(propsData[1].tes.video);
    // const [pilihan_jawaban, setPilihanJawaban] = useState(propsData.pilihan_jawaban);
    // const [kunci_jawaban, setKunciJawaban] = useState(propsData.kunci_jawaban);
    const [changeTimer, setChangeTimer] = useState(false);
    let [state, setState] = useState({
        id: propsData[1].tes.id,
        soal_cat: propsData[1].tes.soal_cat,
    });

    useEffect(() => {
        for(var i = 1; i < 61; i++){
            listMenit.push(
                {
                    value: i < 10 ? `0${i}` : `${i}`,
                    label: i < 10 ? `0${i}` : `${i}`
                }
            )
        }
        // console.log('listmeni', listMenit)
        
        setTimer(propsData[1].tes.timer)
    }, [])
   


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
            setSelectedVideo(null);
            // setNameVideo('');
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
        }
        else {
            if (type === 'pilihan_jawaban') {
                setPilihanJawaban(e);
            } else if (type === 'kunci_jawaban') {
                // console.log('e', e)
                setKunciJawaban(e.value);
            }else if(type === 'timer'){
                setTimer(e.value);
            }
        }

    };

    const handleInputChange = (event) => {
        // console.log('name', event)
        const { name, value } = event.target;

        // console.log('value', value)
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if(state.timer !== ''){
            setChangeTimer(false)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('pilihanJawaban', pilihanJawaban)
        let waktu = '';
        if (timer.charAt(0) === '0') {
            waktu = timer.replace('0', '');
        } else {
            waktu = timer;
        }
        // const listJawaban = [];
        // for (var i = 0; i < pilihanJawaban.length; i++) {
        //     const data = {}
        //     if (pilihanJawaban[i]['value']) {
        //         // console.log('pilih', pilihanJawaban[i]['value'])
        //         data['value'] = pilihanJawaban[i]['value']
        //         listJawaban.push(data)
        //     }
        // }
        // console.log('timer', waktu)

        const formData = new FormData();
        formData.set('id', state.id);
        formData.set('soal_cat', state.soal_cat);
        // if (listJawaban.length === 0) {
        //     // console.log('4')
        //     if (pilihanJawaban.length === 0) {
        //         toast.info('Pilhan jawaban is required');
        //         return;
        //     } else {
        //         // console.log('2 pilihan_jawaban', pilihanJawaban)
        //         // console.log('2 value_pilihan_jawaban', valuePilihanJawabanTemp)
        //         formData.set('pilihan_jawaban', pilihanJawaban);
        //         formData.set('value_pilihan_jawaban', valuePilihanJawabanTemp);
        //     }
        // } else {
        //     // console.log('3 pilihan_jawaban', listJawaban)
        //         // console.log('3 value_pilihan_jawaban', pilihanJawaban)
        //     formData.set('pilihan_jawaban', JSON.stringify(listJawaban));
        //     formData.set('value_pilihan_jawaban', JSON.stringify(pilihanJawaban));
        // }
        formData.set('kunci_jawaban', kunciJawaban);
        formData.set('timer', waktu);
        formData.append('gambar', selectedFile);
        formData.append('video', selectedVideo);

        try {
            const response = await axios.post(`${baseurl.apiUrl}/soal-cat/${state.id}?_method=PUT`, formData, {
                headers: {
                    "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
                },
            }).then(
                result => {
                    // console.log('result', result)
                    return result;
                },
                err => {
                    // console.log('err', err)
                    return err;
                },
            );
            // console.log('response', response)
            // console.log('response update', response);
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
            toast.success("Update data Successful");

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'Soal ' + propsData[0].propsData[0].nama_tes_cat, path: `/cat/${params.sesiId}`, state: propsData[0], childMenu: 'Edit ' + propsData[0].propsData[0].nama_tes_cat }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                    <h4 className="card-title">Edit {propsData[0].propsData[0].nama_tes_cat}</h4>

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
                        <div>
                            <label htmlFor="video" className="form-label">
                                Video / Audio
                            </label>
                            
                            <Fileinput
                                name="video"
                                id="video"
                                selectedFile={selectedVideo}
                                // onChange={handleFileChange2}
                                onChange={e => handleChange(e, 'video')}
                            />
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
                        {/* <label className="form-label" htmlFor="pilihan_jawaban">
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
                        /> */}

                        <div>
                            <label htmlFor="kunci_jawaban" className="form-label">
                                Kunci Jawaban
                            </label>
                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                // defaultValue={listKunciJawaban[0]}
                                // value={kunciJawaban}
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

export default EditTesCAT;
