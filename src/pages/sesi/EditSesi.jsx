import React from "react";
import axios from 'axios';
import Fileinput from "../../components/ui/Fileinput";
import { getTokenFromLocalStorage } from "../../store/localStorage";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/ui/Card";
import Breadcrumbschild from "../../components/ui/Breadcrumbschild";
// import { useEditKelolaSesiMutation } from "../../store/api/app/kelolaSesiSlice";
import { useState } from "react";
import ValidateFile from "../utility/ValidateFile";
import { toast } from "react-toastify";
import baseurl from "../../constant/baseurl";
import Button from "../../components/ui/Button";
import { useEffect } from "react";



const EditKelolaSesi = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const propsData = location.state;
    console.log('propsdata edit', propsData);
    const [isLoading, setIsLoading] = useState(false);


    // console.log('propsData', propsData);

    const listStatus = [
        { value: "Aktif", label: "Aktif" },
        { value: "Tidak Aktif", label: "Tidak Aktif" },
    ];
    // const [namaTestCat, setNamaTestCat] = useState(propsData.nama_test_cat);
    const [status, setStatus] = useState(propsData[1].sesi.status);
    // const [listMenit, setListMenit] = useState([]);
    // const [waktuPengerjaan, setWaktuPengerjaan] = useState([]);
    // useEffect(() => {
    //     for(var i = 1; i < 61; i++){
    //         listMenit.push(
    //             {
    //                 value: i < 10 ? `0${i}` : `${i}`,
    //                 label: i < 10 ? `0${i}` : `${i}`
    //             }
    //         )
    //     }
    //     console.log('listmeni', listMenit)
        
    //     setWaktuPengerjaan(listMenit[0].value)
    // }, [])
    const [state, setState] = useState({
        id: propsData[1].sesi.id,
        nama_sesi_cat: propsData[1].sesi.nama_sesi_cat,
        tanggal: propsData[1].sesi.tanggal,
        waktu_pengerjaan: propsData[1].sesi.waktu_pengerjaan,
        kelolates_id: propsData[1].sesi.kelolates_id,
    });





    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
        }),
    };

    const handleChange = (e, type) => {
        if (type === 'status') {
            setStatus(e.value);
        }else if(type === 'waktu_pengerjaan'){
            setWaktuPengerjaan(e.value);
        }

    };

    const handleInputChange = (event) => {
        console.log('name', event)
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // let waktu = '';
        // if (waktuPengerjaan.charAt(0) === '0') {
        //     waktu = waktuPengerjaan.replace('0', '');
        // } else {
        //     waktu = waktuPengerjaan;
        // }
        // data['waktu_pengerjaan'] = waktu;
        const data = {
            id: state.id,
            nama_sesi_cat: state.nama_sesi_cat,
            tanggal: state.tanggal,
            waktu_pengerjaan: state.waktu_pengerjaan,
            kelolates_id: state.kelolates_id,
            status: status
        }
        console.log('data', data)
        try {
            const response = await axios.post(`${baseurl.apiUrl}/kelola-sesi/${state.id}?_method=PUT`, data, {
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

            navigate(`/sesi/${state.kelolates_id}`, {
                state: propsData[0]
            });
            toast.success("Update data Successful");

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'Kelola Sesi', path: `/sesi/${state.kelolates_id}`, childMenu: 'Edit Sesi', state:propsData[0] }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Edit Kelola Sesi</h4>
                    </div>
                    <form onSubmit={handleSubmit.bind(this)} className="space-y-4 " encType="multipart/form-data">
                        {/* <FormGroup error={errors.nama_test_cat}> */}
                        <div>
                            <label htmlFor="nama_test_cat" className="form-label">
                                Nama Sesi CAT
                            </label>
                            <input
                                name="nama_sesi_cat"
                                type="text"
                                id="nama_sesi_cat"
                                className="form-control py-2"
                                value={state.nama_sesi_cat}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="tanggal" className="form-label">
                                Tanggal
                            </label>
                            <input
                                name="tanggal"
                                type="date"
                                id="tanggal"
                                className="form-control py-2"
                                value={state.tanggal}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="waktu_pengerjaan" className="form-label">
                            Waktu Pengerjaan (Menit)
                            </label>
                            <input
                                name="waktu_pengerjaan"
                                type="number"
                                id="waktu_pengerjaan"
                                className="form-control py-2"
                                value={state.waktu_pengerjaan}
                                onChange={handleInputChange}
                            />
                        </div>

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
                        {/* <div>
                            <label htmlFor="peraturan" className="form-label">
                                Peraturan
                            </label>
                            <textarea
                                id="peraturan"
                                name="peraturan"
                                className="form-control"
                                placeholder="Enter Peraturan"
                                rows="10"
                                value={state.peraturan}
                                onChange={handleInputChange}
                            />
                        </div> */}


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

export default EditKelolaSesi;
