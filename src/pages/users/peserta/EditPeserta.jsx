import React, { useState } from "react";
import axios from 'axios';
import { getTokenFromLocalStorage } from "@/store/localStorage";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@/components/ui/Card";
import Breadcrumbschild from "@/components/ui/Breadcrumbschild";
import { useGetDataMutation } from "@/store/api/app/appSlice";
import { toast } from "react-toastify";
import baseurl from "@/constant/baseurl";
import Button from "@/components/ui/Button";



const EditPeserta = (props) => {
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
        username: propsData.username,
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
            username: state.username,
            password: password
        }
        try {
            const response = await axios.post(`${baseurl.apiUrl}/peserta/${state.id}?_method=PUT`, data, {
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
            if(response.response != null){
                if (response.response.data.message === 'Username terdaftar') {
                    console.log('1');
                    toast.info('Username terdaftar, silahkan gunakan username lain');
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

            navigate("/peserta");
            toast.success("Update data Successful");

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'User Peserta', path: '/peserta', childMenu: 'Edit User Peserta' }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Edit User Peserta</h4>
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
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                name="username"
                                type="text"
                                id="username"
                                className="form-control py-2"
                                value={state.username}
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

export default EditPeserta;
