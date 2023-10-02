import React, {useEffect, useState} from "react";
import axios from 'axios';
import { getTokenFromLocalStorage } from "../../store/localStorage";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/ui/Card";
import Breadcrumbschild from "../../components/ui/Breadcrumbschild";
import { useGetDataMutation } from "../../store/api/app/appSlice";
// import { useState } from "react";
import { toast } from "react-toastify";
import baseurl from "../../constant/baseurl";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import { useParams } from "react-router-dom";



const EditPeraturan = (props) => {
    const [getData] = useGetDataMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const propsData = location.state;
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    console.log('props edit', propsData)
    const [state, setState] = useState({
        id: propsData[1].peraturan.id,
        deskripsi: propsData[1].peraturan.deskripsi,
        
    });

    
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
        
        
        const data = {
            id: state.id,
            deskripsi: state.deskripsi
        }
        try {
            const response = await axios.post(`${baseurl.apiUrl}/peraturan/${state.id}?_method=PUT`, data, {
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

            navigate(`/peraturan/${propsData[1].peraturan.kelolasesi_id}`, {
                state: propsData[0]
            });
            toast.success("Update data Successful");

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
        <Breadcrumbschild menu={{ currentMenu: 'Peraturan', path: `/peraturan/${propsData[1].peraturan.kelolasesi_id}`, childMenu: 'Edit Peraturan', state: propsData[0] }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Edit Pengaturan Tes</h4>
                    </div>
                    <form onSubmit={handleSubmit.bind(this)} className="space-y-4 " encType="multipart/form-data">
                        {/* <FormGroup error={errors.nama_test_cat}> */}
                        <div>
                            <label htmlFor="nama_test_cat" className="form-label">
                                Peraturan
                            </label>
                            <input
                                name="deskripsi"
                                type="text"
                                id="deskripsi"
                                className="form-control py-2"
                                value={state.deskripsi}
                                onChange={handleInputChange}
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

export default EditPeraturan;
