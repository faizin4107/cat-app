import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import HomeBredCurbs from "../HomeBredCurbs";
import Breadcrumbschild from "@/components/ui/Breadcrumbschild";
import clsx from "clsx";
import Icon from "@/components/ui/Icon";
import { Link, useLocation } from "react-router-dom";
import { useGetDataMutation } from "@/store/api/app/appSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";


const PilihSesi = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const propsData = location.state;
    console.log('propsData sesi', propsData)
    const [getData, { isLoading }] = useGetDataMutation();
    const [sesi, setSesi] = useState([]);
    let dataPush = [];

    useEffect(() => {
        async function fetchData() {
            let username = '';
            const userData = JSON.parse(localStorage.getItem("user"));
            if(userData !== null){
                username = userData.username;
            }
            const response = await getData(`/kelola-sesi-aktif/${propsData.id}/${username}`);
            console.log('response sesi', response)
            // setSesi(response.data.data);

            for (var i = 0; i < response.data.data.length; i++) {
                const data = {}
                data['id'] = response.data.data[i].id;
                data['step'] = 1;
                data['icon'] = response.data.data[i].status_sesi === 'Selesai' ? 'line-md:confirm-circle' : 'mdi:form-outline';
                data['value'] = response.data.data[i].nama_sesi_cat;
                data['status_sesi'] = response.data.data[i].status_sesi;
                data['waktu_pengerjaan'] = response.data.data[i].waktu_pengerjaan;
                data['tanggal'] = response.data.data[i].tanggal;
                data['kelolates_id'] = response.data.data[i].kelolates_id;
                data['title'] = response.data.data[i].nama_sesi_cat + ' (' + response.data.data[i].tanggal + ')';
                // 
                dataPush.push(data)
            }
            console.log('sesi', dataPush)
            // setLengthSesi(dataPush.length);
            setSesi(dataPush);


        }
        fetchData();
    }, [])

    const handleToPage = (e, id, item) => {
        e.preventDefault();

        console.log('item', item)
        var date = new Date();

        // Get year, month, and day part from the date
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });

        // Generate yyyy-mm-dd date string
        var formattedDate = year + "-" + month + "-" + day;
        console.log(formattedDate);  // Prints: 2022-05-04
        if (formattedDate !== item.tanggal) {
            toast.info('Jadwal sesi tidak sesuai dengan tanggal saat ini')
            return
        } else if(item.status_sesi === 'Selesai'){
            toast.info('Sesi yang anda pilih telah selesai dikerjakan')
            return
        }else{
            navigate(`/penjelasan-sesi/${id}`, {
                state: [item, propsData]
            });
        }
    }


    //   const [filterMap, setFilterMap] = useState("usa");
    return (
        <div>
            <Breadcrumbschild menu={{ currentMenu: 'Dashboard', path: `/dashboard-peserta`, childMenu: 'Pilih Sesi' }} />
            <HomeBredCurbs title={propsData.nama_tes_cat} />

            <div className="flex justify-center content-center ">
                {isLoading ? (
                    <Loading />
                ) : (
                    <div>
                    <Card className="w-[848px]">
                        <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-5">
                            {sesi.map((item, i) => (
                                <ul key={i}>
                                    <li key={item.id}
                                        className={clsx(
                                            "relative flex  bg-white dark:bg-slate-700  items-center justify-center text-center md:border md:border-solid lg:border border-slate-300 dark:border-slate-700 rounded-t xl:px-10 xl:py-7 lg:px-3 lg:py-6 md:px-3 md:py-6 transition-all duration-150 after:absolute  after:bottom-[-8px] after:rounded-b after:w-full lg:after:h-2 md:after:h-5",

                                        )}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-3 ">
                                            <Icon className=" h-8 w-8" icon={item.icon} />
                                            <div className="text-base font-medium">
                                                {item.title}
                                            </div>
                                            <div className="mt-2 flex justify-center content-center">
                                                <button className="btn btn-dark btn-sm block w-[200px] text-center text-white-600" onClick={(e) => handleToPage(e, item.id, item)}>Pilih</button>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            ))}
                        </div>

                    </Card>
                </div>
                )}
                

            </div>


        </div>
    );
};

export default PilihSesi;
