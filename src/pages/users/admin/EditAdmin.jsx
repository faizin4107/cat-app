import React, {useEffect, useState} from "react";
import axios from 'axios';
import { getTokenFromLocalStorage } from "../../../store/localStorage";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../../components/ui/Card";
import Breadcrumbschild from "../../../components/ui/Breadcrumbschild";
import { useGetDataMutation } from "../../../store/api/app/appSlice";
// import { useState } from "react";
import { toast } from "react-toastify";
import baseurl from "../../../constant/baseurl";
import Button from "../../../components/ui/Button";
// import Textarea from "../../components/ui/Textarea";



const EditAdmin = (props) => {
    const [getData] = useGetDataMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const propsData = location.state;
    const [isLoading, setIsLoading] = useState(false);

    
    // console.log('propsData', propsData);

    // const listStatus = [
    //     { value: "Aktif", label: "Aktif" },
    //     { value: "Tidak Aktif", label: "Tidak Aktif" },
    // ];
    const [password, setPassword] = useState('');
    const [state, setState] = useState({
        id: propsData.id,
        name: propsData.name,
        email: propsData.email,
    });





    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: "14px",
        }),
    };

    const handleChange = (e, type) => {
        // setValueSesi(e.value);
        setPassword(e.target.value);
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

        const data = {
            id: state.id,
            name: state.name,
            email: state.email,
            password: password
        }
        // console.log('data', data)
        try {
            const response = await axios.post(`${baseurl.apiUrl}/admin/${state.id}?_method=PUT`, data, {
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
            // console.log('response', response)
            // console.log('response update', response.data.message);
            if(response.response != null){
                if (response.response.data.message === 'Email terdaftar') {
                    console.log('1');
                    toast.info('Email terdaftar, silahkan gunakan email lain');
                    // throw new Error(response.error.message);
                    return;
                }
            }
            
            
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

            navigate("/admin");
            toast.success("Update data Successful");

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'User Admin', path: '/admin', childMenu: 'Edit User Admin' }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Edit User Admin</h4>
                    </div>
                    <form onSubmit={handleSubmit.bind(this)} className="space-y-4 " encType="multipart/form-data">
                        {/* <FormGroup error={errors.nama_test_cat}> */}
                        <div>
                            <label htmlFor="name" className="form-label">
                                Nama
                            </label>
                            <input
                                name="name"
                                type="text"
                                id="name"
                                className="form-control py-2"
                                value={state.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                id="email"
                                className="form-control py-2"
                                value={state.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                id="password"
                                className="form-control py-2"
                                onChange={e => handleChange(e, 'password')}
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

export default EditAdmin;
