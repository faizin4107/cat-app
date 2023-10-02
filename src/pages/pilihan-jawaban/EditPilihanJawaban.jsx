import React from "react";
import axios from 'axios';
import { getTokenFromLocalStorage } from "@/store/localStorage";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@/components/ui/Card";
import Breadcrumbschild from "@/components/ui/Breadcrumbschild";
import { useState } from "react";
import { toast } from "react-toastify";
import baseurl from "@/constant/baseurl";
import Button from "@/components/ui/Button";


const EditPilihanJawaban = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const propsData = location.state;
    console.log('propsdata edit pilihan jawaban', propsData);
    const [isLoading, setIsLoading] = useState(false);


    console.log('propsData', propsData);

   
    const [state, setState] = useState({
        id: propsData[1].soal.id,
        huruf: propsData[1].soal.huruf,
        deskripsi: propsData[1].soal.deskripsi,
        soalcat_id: propsData[1].soal.soalcat_id,
    });





    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
        }),
    };

    // const handleChange = (e, type) => {
    //     if (type === 'status') {
    //         setStatus(e.value);
    //     }else if(type === 'waktu_pengerjaan'){
    //         setWaktuPengerjaan(e.value);
    //     }

    // };

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
        
        // data['waktu_pengerjaan'] = waktu;
        const data = {
            id: state.id,
            huruf: state.huruf,
            deskripsi: state.deskripsi,
            soalcat_id: state.soalcat_id
        }
        console.log('data', data)
        try {
            const response = await axios.post(`${baseurl.apiUrl}/pilihan-jawaban/${state.id}?_method=PUT`, data, {
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
            if(response.data.message !== '' && response.data.success === false){
                toast.info(response.data.message);
                return;
            }
            if(response.data.success === true){
                navigate(`/pilihan-jawaban/${state.soalcat_id}`, {
                    state: propsData[0]
                });
                toast.success("Update data Successful");
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'Pilihan Jawaban', path: `/pilihan-jawaban/${state.soalcat_id}`, childMenu: 'Edit Pilihan Jawaban', state:propsData[0] }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Edit Pilihan Jawaban</h4>
                    </div>
                    <form onSubmit={handleSubmit.bind(this)} className="space-y-4 " encType="multipart/form-data">
                        {/* <FormGroup error={errors.nama_test_cat}> */}
                        <div>
                            <label htmlFor="huruf" className="form-label">
                                Huruf
                            </label>
                            <input
                                name="huruf"
                                type="text"
                                id="huruf"
                                className="form-control py-2"
                                value={state.huruf}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="deskripsi" className="form-label">
                                Deskripsi
                            </label>
                            <textarea
                                name="deskripsi"
                                type="text"
                                id="deskripsi"
                                rows="4"
                                className="form-control py-2"
                                value={state.deskripsi}
                                onChange={handleInputChange}
                            ></textarea>
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

export default EditPilihanJawaban;
