import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import HomeBredCurbs from "./HomeBredCurbs";
import { Link } from "react-router-dom";
import cardImage6 from "@/assets/images/all-img/card-6.png";
import { useGetDataMutation } from "@/store/api/app/appSlice";
import baseurl from "@/constant/baseurl";
import Loading from "@/components/Loading";



const DashboardPeserta = () => {
    const [getData, {isLoading}] = useGetDataMutation();
    const [kelolaTes, setKelolaTes] = useState([]);
    let dataPush = [];

    useEffect(() => {
        async function fetchData() {
            const response = await getData('/kelola-tes-aktif');
            console.log('response', response)
            // setSesi(response.data.data);

            for (var i = 0; i < response.data.data.length; i++) {
                const data = {}
                data['id'] = response.data.data[i].id;
                data['nama_tes_cat'] = response.data.data[i].nama_tes_cat;
                data['icon'] = response.data.data[i].icon;
                // 
                dataPush.push(data)
            }

            // setLengthSesi(dataPush.length);
            setKelolaTes(dataPush);


        }
        fetchData();
    }, [])
    console.log('nama tes', kelolaTes)
    //   const [filterMap, setFilterMap] = useState("usa");
    return (
        <div>
            <HomeBredCurbs title="Pilih Tes" />
        {isLoading ? (
            <Loading />
        ) : (
            <div className="flex justify-center content-center">
                
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-10 card-height-auto">
                {kelolaTes.map((item, i) => (
                    <div key={i}>
                        <Card noborder bodyClass="p-0">
                            <div className="image-box">
                                {item.icon === 'null' || item.icon === '' || item.icon === null ? (
                                    <img
                                    src={cardImage6}
                                    alt=""
                                    className="rounded-t-md w-[300px] h-[300px] object-contain"
                                />
                                ) : (
                                    <img
                                    src={`${baseurl.imageurl}/${item.icon}`}
                                    alt=""
                                    className="rounded-t-md w-[300px] h-[300px] object-contain"
                                />
                                    
                                )}

                            </div>
                            <div className="p-6 text-center">
                                <div className="card-title mb-5">{item.nama_tes_cat}</div>
                                {/* <div className="text-sm">
      Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed do
      eiusmod tempor incididun ut .
    </div> */}
                            </div>
                            <div className="mt-2">
                                <Link to="/pilih-sesi" state={item} className="btn btn-dark block w-full text-center text-white-600">Pilih Tes</Link>
                            </div>
                        </Card>
                    </div>
                ))}
                </div>
            
                

               

            </div>
        )}
            


        </div>
    );
};

export default DashboardPeserta;
