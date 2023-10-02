import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "@/components/ui/Card";
import * as yup from "yup";
import Breadcrumbschild from "@/components/ui/Breadcrumbschild";
import { useCreateDataMutation } from "@/store/api/app/appSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/ui/Button";

const FormValidationSchema = yup
    .object({
        
    })
    .required();

const CreatePeraturan = () => {
    const [createData, { isLoading, isError, error, isSuccess }] = useCreateDataMutation();
    const [peraturan, setPeraturan] = useState('');
    const params = useParams();
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
        console.log('formValues', formValues);
        data['peraturan'] = formValues;
        data['kelolasesi_id'] = params.id;

        

        console.log(data);
        try {
            const response = await createData({ path: '/peraturan', post: data });
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

            navigate(`/peraturan/${params.id}`, {
                state: propsData
            });
            toast.success("Create data Successful");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Breadcrumbschild menu={{ currentMenu: 'Peraturan', path: `/peraturan/${params.id}`, childMenu: 'Create Peraturan', state: propsData }} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                <Card>
                    <div className="md:flex justify-between items-center mb-6">
                        <h4 className="card-title">Create Peraturan</h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">


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

export default CreatePeraturan;
