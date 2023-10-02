import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import HomeBredCurbs from "../HomeBredCurbs";
import Breadcrumbschild from "@/components/ui/Breadcrumbschild";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetDataMutation } from "@/store/api/app/appSlice";
import { addSoal, getSoal, removeListSoal } from "@/store/api/app/soalSlice";
import { nextNomorSoal, removeNomorSoal } from "@/store/api/app/incrementSoal";
import Loading from "@/components/Loading";


const PenjelasanSesi = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [getData, { isLoading }] = useGetDataMutation();
    const [title, setTitle] = useState();
    const location = useLocation();
    const propsData = location.state;
    useEffect(() => {
        setTitle('Petunjuk Pengerjaan Soal ' + propsData[0].value)
        async function fetchData() {
            const response = await getData(`/peraturan/${propsData[0].id}`);
            setData(response.data.data);
        }
        fetchData();
        
    }, [])
    // 
    // const onConfirmRefresh = function (event) {
    //     event.preventDefault();
    //     // return window.location.href = '/dashboard-peserta'
    //     return event.returnValue = "Are you sure you want to leave the page?";
    //   }
      
    //   window.addEventListener("beforeunload", onConfirmRefresh, { capture: true });

    const toSoal = async (e) => {
        e.preventDefault();
        dispatch(removeListSoal());
        dispatch(removeNomorSoal());
        // console.log('response penjelasan 1', propsData[0].id)
        const response = await getData(`/soal-cat/${propsData[0].kelolates_id}/${propsData[0].id}`);
        console.log('response penjelasan 2', response)
        if (response.data.data.length === 0) {
            toast.info("Soal belum tersedia, silahkan hubungi administrator")
            return;
        } else {
            let dataPilihan = [];

            for (var i = 0; i < response.data.data.length; i++) {
                let array = [];
                if (response.data.data[i]['pilihan_jawaban']) {
                    for (var j = 0; j < response.data.data[i]['pilihan_jawaban'].length; j++) {
                        let data = {
                            value: response.data.data[i]['pilihan_jawaban'][j]['huruf'],
                            label: response.data.data[i]['pilihan_jawaban'][j]['huruf'] + ". " + response.data.data[i]['pilihan_jawaban'][j]['deskripsi']
                        }
                        array.push(data);
                    }
                }
                dataPilihan.push({ ...response.data.data[i], pilihan_jawaban: array })

            }
            console.log('dataPilihan', dataPilihan);
            dispatch(nextNomorSoal(1));
            dispatch(addSoal(dataPilihan));
            dispatch(getSoal({ nomor: 1 }));
            navigate('/soal', {
                state: propsData
            });
        }

        // console.log('value', dataPilihan)





    }
    return (
        <div>
            <Breadcrumbschild menu={{ currentMenu: 'Pilih Sesi', path: `/pilih-sesi`, childMenu: 'Penjelasan Sesi', state: propsData[1] }} />
            <HomeBredCurbs title={title} />

            <div className="flex justify-center content-center">
                {isLoading ? (
                    <Loading />
                ) : (
                    <Card className="sm:w-[100px] md:w-[600px] lg:w-[1000px] container mx-auto">

                        <div >
                            <ol className="list-disc">
                                {data.map((item, i) => (
                                    <li className="text-sm text-start break-words" key={i}>{item.deskripsi}</li>
                                ))}
                            </ol>
                        </div>
                        <div className="mt-9 flex justify-center content-center">
                            <button className="btn btn-dark block w-[200px] text-center text-white-600" onClick={(e) => toSoal(e)}>Mulai</button>
                        </div>
                    </Card>
                )}








            </div>


        </div>
    );
};

export default PenjelasanSesi;
