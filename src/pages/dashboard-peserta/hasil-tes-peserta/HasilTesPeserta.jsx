import React, { useEffect } from "react";
import Card from "@/components/ui/Card";
import { Link, useLocation } from "react-router-dom";

const HasilTesPeserta = () => {
    const location = useLocation();
    const props = location.state;
    console.log('props', props)
    // const [getData] = useGetDataMutation();
    // const [sesi, setSesi] = useState([]);
    let dataPush = [];

    useEffect(() => {

    }, [])


    //   const [filterMap, setFilterMap] = useState("usa");
    return (
        <div>
            <h3 className="font-medium lg:text-1xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 ml-2">
               
                {props.sesi + " " + props.nama_tes.nama_tes_cat}
            </h3>
            {/* <HomeBredCurbs title="Sesi 1 Tes Pengetahuan Dasar" /> */}
            <div className="flex justify-center content-center mt-8">

                <div>
                    <Card className="w-[1100px]">
                        <div className="grid grid-cols-1 gap-3">
                            <h5 className="flex justify-center content-center">Hasil {props.nama_tes.nama_tes_cat + " " + props.sesi}</h5>
                            <div className="flex justify-center content-center">
                                <Card className="w-[400px]" bodyClass="bg-neutral-200 p-2">
                                    <h4 className="font-medium lg:text-1xl text-xl text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                                        <p>Nama Peserta: {props.username}</p>
                                        <p>Tanggal Pengerjaan: {props.tanggal}</p>
                                        <p>Waktu Pengerjaan: {props.waktu}</p>
                                    </h4>

                                </Card>
                            </div>

                        </div>
                        <div className="mt-2 flex justify-center content-center">
                                <Link to="/dashboard-peserta"  className="btn btn-dark block w-[400px] text-center text-white-600">Kembali</Link>
                            </div>
                    </Card>
                </div>

            </div>


        </div>
    );
};

export default HasilTesPeserta;
