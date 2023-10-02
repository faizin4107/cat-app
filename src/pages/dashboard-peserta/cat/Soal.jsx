import React, { useState, useEffect, useRef } from "react";
import Card from "@/components/ui/Card";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@/components/ui/Radio";
import clsx from "clsx";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useLocation, useNavigate } from "react-router-dom";
import { updateListSoal, getSoal } from "@/store/api/app/soalSlice";
import { nextNomorSoal, prevNomorSoal, changeMinutes } from "@/store/api/app/incrementSoal";
import { useGetDataMutation } from "@/store/api/app/appSlice";
import baseurl from "@/constant/baseurl";
import { toast } from "react-toastify";
import { confirmTesCancel } from "@/pages/components/confirm-tes-cancel";
// import axios from 'axios';
import Swal from "sweetalert2";
import { getTokenFromLocalStorage } from "@/store/localStorage";
import { useImageViewer } from 'react-image-viewer-hook';
import { useTimer } from 'react-timer-hook';
import { useParams } from "react-router-dom";
import { useCreateDataMutation } from "@/store/api/app/appSlice";
const STATUS = {
    STARTED: 'Started',
    STOPPED: 'Stopped',
}

const Soal = () => {


    const navigate = useNavigate();
    const { getOnClick, ImageViewer } = useImageViewer();
    const [createData, { isLoading, isError, error, isSuccess }] = useCreateDataMutation();
    // window.addEventListener("beforeunload", (event) => {
    //     event.preventDefault();
    //     console.log("page is fully loaded");
    //     window.location.href = '/dashboard-peserta'
    //   });
    const { items, listSoal, listJawaban } = useSelector((state) => state.soal);
    const { nomorSoal } = useSelector((state) => state.incsoal);

    const [getData] = useGetDataMutation();
    const [title, setTitle] = useState();
    const [nomorStop, setNomorStop] = useState(0);
    const [soal, setSoal] = useState([]);
    const location = useLocation();
    const propsData = location.state;
    const params = useParams();
    console.log('params', params)
    // console.log('props list', propsData)
    // console.log('listSoal', listSoal)

    const [selectOption, setSelectOption] = useState("");
    const [valueListJawaban, setValueListJawaban] = useState([]);
    // let [runMinutes, setMinutes] = useState();
    // let [runSeconds, setSeconds] = useState();
    const [waktuPergerjaan, setWaktuPengerjaan] = useState('');


    // let listTemp = [];
    useEffect(() => {

        if (listSoal[0].timer !== null) {
            handleStart()
        }
        // console.log('1 useeffect');
        // if(listSoal[0].length !== 0){
        //     console.log('1');
        //     listTemp = listSoal[0];
        //     // localStorage.setItem("data", JSON.stringify(listTemp));
        // }else{
        //     console.log('2');
        //     const userData = JSON.parse(localStorage.getItem("data"));
        //     dispatch(addSoal(userData));
        //     dispatch(getSoal({ nomor: nomorSoal }));
        //     listTemp = userData;
        // }

        // if(listSoal[0].length !== 0){

        // }else{
        //     if (listTemp.timer !== null) {
        //         handleStart()
        //     }
        // }


        // window.onbeforeunload = () => { return "" };
        // navigate('/404');
        // // Unmount the window.onbeforeunload event
        // return () => { window.onbeforeunload = null };
        // console.log('path', window.location.pathname)
        if (window.location.pathname === '/soal') {
            console.log('ya soal')
            window.onblur = function () {
                Swal.fire({
                    title: 'Dilarang membuka program lain, reload browser atau membuka tab baru pada browser',
                    text:
                        'Pertanyaan akan diulang dari awal lagi',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya!'
                }).then(async result => {
                    if (result.value) {
                        window.onblur = function () {
                            return false
                        }
                        navigate('/dashboard-peserta')
                    }
                });

            };
        }


    }, [])
    let data = window.performance.getEntriesByType("navigation")[0].type;
    if (data === 'reload') {
        window.location.href = '/dashboard-peserta'
    }





    // console.log('listSoal', listSoal)
    // const [nomor, setNomor] = useState(0);
    const dispatch = useDispatch();
    // const [sesi, setSesi] = useState(namesesi);
    // const [timerSoal, setTimerSoal] = useState(listSoal[0].timer);
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + (parseInt(propsData[0].waktu_pengerjaan) * 60));
    const {
        hours,
        seconds,
        minutes,
        pause,
        resume
    } = useTimer({ expiryTimestamp, onExpire: () => confirmModal('done-time') });

    // const onConfirmRefresh =  function (event) {
    //     // navigate('/404');
    //     // dispatch(getSoal({ nomor: 1 }));
    //     console.log('event', event.button)
    //     event.preventDefault();
    //     // dispatch(getSoal({ nomor: nomo }));

    //     // window.location.href = '/404'
    // }

    // window.addEventListener("beforeunload", onConfirmRefresh, { capture: true });
    // const expiryTimestampTimer = new Date();
    // expiryTimestampTimer.setSeconds(expiryTimestampTimer.getSeconds() + (parseInt(listSoal[0].timer) * 60));
    // const {
    //     seconds: timerSeconds,
    //     minutes: timerMinutes,
    //     pause: timerPause,
    //     resume: timerResume,
    //     restart
    // } = timer({ expiryTimestamp: expiryTimestampTimer, autoStart: true, onExpire: () => confirmModal('done-time-timer') });









    const handleOption = (e, id) => {
        // const item = listSoal.find((item) => item.id === id);
        setSelectOption(e.target.value);
        dispatch(updateListSoal({ nomor: nomorSoal, jawaban: e.target.value, keterangan: 'Terjawab' }));
    };

    // const { listSoal2 } = useSelector((state) => state.soal);
    const nextStep = async (e) => {
        e.preventDefault();
        if (listSoal[0].timer !== null) {
            dispatch(nextNomorSoal(1));
            if ((nomorSoal + 1) > items.length) {
                setNomorStop(items.length);
                pause()
                confirmModal('done');
                return;
            } else {
                Swal.fire({
                    title: 'Pemberitahuan',
                    text:
                        'Apakah anda yakin? soal saat ini tidak dapat diulangi kembali',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya!',
                    cancelButtonText: 'Batal!',
                }).then(async result => {
                    if (result.value) {
                        dispatch(getSoal({ nomor: nomorSoal + 1 }));
                        nomorSoal - 1
                        handleReset('next');
                    }
                });
            }

        } else {
            dispatch(nextNomorSoal(1));
            if ((nomorSoal + 1) > items.length) {
                setNomorStop(items.length);
                pause()
                confirmModal('done');
                return;
            } else {
                // resume
                dispatch(getSoal({ nomor: nomorSoal + 1 }));

                nomorSoal - 1
            }
        }

        // console.log('nomor soal tes', nomorSoal)

    }

    const nextStepTimer = async () => {
        // e.preventDefault();
        dispatch(nextNomorSoal(1));

        if ((nomorSoal + 1) > items.length) {
            setNomorStop(items.length);
            pause()
            confirmModal('done');
            return;
        } else {
            // resume
            dispatch(getSoal({ nomor: nomorSoal + 1 }));

            nomorSoal - 1
        }

        if (listSoal[0].timer !== null) {

            handleReset('next');
        }
    }

    const prevStep = async (e) => {
        e.preventDefault();
        if (nomorSoal === 1) {
            confirmTesCancel();
            return;
        }
        if (listSoal[0].timer !== null) {
            toast.info('Anda tidak bisa mengulang soal');
            Swal.fire({
                title: 'Pemberitahuan',
                text:
                    'Anda tidak bisa mengulang soal',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya!',
            }).then(async result => {
                if (result.value) {
                    return;
                }
            });

        }
        dispatch(prevNomorSoal(1));
        dispatch(getSoal({ nomor: nomorSoal - 1 }));
        if (listSoal[0].timer !== null) {
            handleReset('prev');
        }
    }

    const confirmModal = (name) => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const countJawaban = [];
        const countHasilJawabanBenar = [];
        const countHasilJawabanSalah = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i]['keterangan'] === 'Belum Terjawab') {
                countJawaban.push(i);
            }
            if (items[i]['jawaban_user'] === items[i]['kunci_jawaban']) {
                countHasilJawabanBenar.push(1);
            } else {
                countHasilJawabanSalah.push(1);
            }
        }

        let sumJawabanBenar = 0;
        countHasilJawabanBenar.forEach(num => {
            sumJawabanBenar += num;
        })
        let sumJawabanSalah = 0;
        countHasilJawabanSalah.forEach(num => {
            sumJawabanSalah += num;
        })
        // console.log('propsData 2', propsData)
        
        Swal.fire({
            title: name === 'done' ? 'Apakah sudah yakin?' : 'Waktu pengerjaan telah berakhir',
            text:
                countJawaban.length === 0 ?
                    'Jawaban akan langsung diproses' :
                    `Ada ${countJawaban.length} jawaban yang belum dijawab, Jawaban akan langsung diproses`,
            icon: 'warning',
            showCancelButton: name === 'done' ? true : false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!',
            cancelButtonText: 'Batal!',
            allowOutsideClick: name === 'done' ? true : false
        }).then(async result => {
            if (result.value) {
                const data = {
                    'username': storedUser.name,
                    'nama_tes': propsData[1].nama_tes_cat,
                    'tanggal': propsData[0].tanggal,
                    'kelolasesi_id': propsData[0].id,
                    'jawaban_benar': sumJawabanBenar,
                    'jawaban_salah': sumJawabanSalah,
                    'nilai': 0
                }
                console.log('data', data);
                const response = await createData({ path: '/hasil-tes', post: data });
                console.log('response upload nilai', response);
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


                differenceTime(storedUser.name);
            } else {
                dispatch(prevNomorSoal(1));
            }
        });
    }

    const differenceTime = (user) => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let runMinutes = '';
        let runSeconds = '';
        if (minutes < 10) {
            runMinutes = '0' + minutes.toString();
        } else {
            runMinutes = minutes.toString();
        }
        if (seconds < 10) {
            runSeconds = '0' + seconds.toString();
        } else {
            runSeconds = seconds.toString();
        }
        let newHour = 0;
        let newMinutes = 0;
        let timeProps = propsData[0].waktu_pengerjaan;
        if (parseInt(propsData[0].waktu_pengerjaan) > 60) {
            newHour = (parseInt(propsData[0].waktu_pengerjaan) / 60) - 1;
            newMinutes = 59;
        } else {
            newHour = hour;
            newMinutes = timeProps;
        }

        let myDate1 = day + "/" + month + "/" + year + " " + newHour.toString() + ":" + newMinutes.toString() + ":" + "59";
        let myDate2 = day + "/" + month + "/" + year + " " + newHour.toString() + ":" + runMinutes.toString() + ":" + runSeconds.toString();
        console.log('myDate1', myDate1);
        console.log('myDate2', myDate2);
        var date1 = new Date(myDate2);
        var date2 = new Date(myDate1);

        var diff = date2.getTime() - date1.getTime();

        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;

        setWaktuPengerjaan(mm + ":" + ss);
        let timeH = 0;
        if (hh < 10) {
            timeH = '0' + hh.toString();
        } else {
            timeH = hh.toString();
        }
        let timeM = 0;
        if (mm < 10) {
            timeM = '0' + mm.toString();
        } else {
            timeM = mm.toString();
        }
        let timeS = 0;
        if (ss < 10) {
            timeS = '0' + ss.toString();
        } else {
            timeS = ss.toString();
        }
        // console.log('mm', minutes)
        // console.log('ss', seconds)
        // console.log('mm', mm)
        // console.log('ss', ss)
        // console.log('minute', timeM)
        // console.log('second', timeS)
        const props = {
            'username': user,
            'nama_tes': propsData[1],
            'tanggal': propsData[0].tanggal,
            'waktu': timeH + ":" + timeM + ":" + timeS,
            'sesi': propsData[0].value,
            'nilai': 0
        }
        // console.log('data', props)
        navigate('/hasil-tes-peserta', {
            state: props
        })
    }

    const [secondsRemaining, setSecondsRemaining] = useState(parseInt(listSoal[0].timer) * 60)
    const [status, setStatus] = useState(STATUS.STOPPED)

    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

    const handleStart = () => {
        setStatus(STATUS.STARTED)
    }
    const handleStop = () => {
        setStatus(STATUS.STOPPED)
    }
    const handleReset = (step) => {
        setStatus(STATUS.STOPPED)
        // const listSoal = useSelector((state) => state.soal);
        if (step === 'next') {
            for (var i = 0; i < items.length; i++) {
                if (parseInt(items[i]['nomor']) === (nomorSoal + 1)) {
                    console.log('state', items[i])
                    //   data = state.items[i];
                    // console.log('data', data)
                    setSecondsRemaining(parseInt(items[i].timer) * 60);
                    handleStart();
                    break;
                }
            }
        } else {
            for (var i = 0; i < items.length; i++) {
                if (parseInt(items[i]['nomor']) === (nomorSoal - 1)) {
                    console.log('state', items[i])
                    //   data = state.items[i];
                    // console.log('data', data)
                    setSecondsRemaining(parseInt(items[i].timer) * 60);
                    handleStart();
                    break;
                }
            }
        }


    }

    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1)
            } else {
                // nomorSoal + 1) > items.length
                // console.log('nomor', nomorSoal);
                // console.log('items.length', items.length);
                setStatus(STATUS.STOPPED)
                if (nomorSoal === items.length) {
                    confirmModal('done-time')
                } else {
                    Swal.fire({
                        title: 'Pemberitahuan',
                        text:
                            'Waktu pengerjaan soal telah berakhir, silahkan lanjut ke soal berikutnya',
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ya!',
                        allowOutsideClick: false
                    }).then(async result => {
                        if (result.value) {
                            nextStepTimer();
                        }
                    });
                }

            }
        },
        status === STATUS.STARTED ? 1000 : null,
        // passing null stops the interval
    )
    // const onConfirmRefresh = function (event) {
    //     console.log('ya');
    //     event.preventDefault();
    //     console.log('event', event)
    //     return event.return = "";
    //   }

    //   window.addEventListener("beforeunload", onConfirmRefresh, { capture: true });
    return (
        <div>
            <div>
                <Card noborder bodyClass="p-2">
                    <div className="flex justify-between">
                        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                            {propsData[1].nama_tes_cat}
                        </h4>

                        <div className="flex justify-end">
                            <Icon icon="ri:time-line" className="mt-1" />
                            <p className="font-medium lg:text-1xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 ml-2">
                                {hours < 10 ? (
                                    <span>0{hours}</span>
                                ) : (
                                    <span>{hours}</span>
                                )}
                                :
                                {minutes < 10 ? (
                                    <span>0{minutes}</span>
                                ) : (
                                    <span>{minutes}</span>
                                )}
                                :
                                {seconds < 10 ? (
                                    <span>0{seconds}</span>
                                ) : (
                                    <span>{seconds}</span>
                                )}
                            </p>
                        </div>

                        {/* <Button text={propsData[0].waktu_pengerjaan} icon="ri:time-line" className="btn-outline-primary btn-sm" /> */}
                    </div>
                    <div className="box-border w-full md:h-[40px] xl:h-[100px] h-42 p-1 border-4 overflow-auto mt-2 mb-3">
                        <div className="grid xl:grid-cols-8 md:grid-cols-8 grid-cols-3 gap-5">
                            {items.map((item, i) => (
                                // <StepBox item={item} key={i} stepNumber={step} index={i} />
                                <div className="" key={i}>
                                    {/* <Link to={`/penjelasan-sesi/${item.id}`} key={i} state={[item, title]}>
                                        
                                    </Link> */}
                                    <li key={i}
                                        className={clsx(
                                            `relative flex ${item.keterangan === 'Terjawab' ? 'bg-lime-400' : 'bg-stone-300'} dark:bg-slate-700  items-center justify-center text-center  lg:border border-slate-300 dark:border-slate-700 rounded-t xl:px-10 xl:py-7 lg:px-3 lg:py-6  transition-all duration-150 after:absolute  after:bottom-[-8px] after:rounded-b after:w-full lg:after:h-2`,

                                        )}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-3 ">

                                            <div className="text-base font-medium">
                                                {item.soal_cat}
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="flex justify-start">
                        <Button className="btn btn-warning btn-sm bg-lime-400" />
                        <h5 className="font-medium lg:text-1xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 ml-2">
                            Terjawab
                        </h5>

                        <Button className="btn btn-danger btn-sm bg-stone-300" />
                        <h5 className="font-medium lg:text-1xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 ml-2">
                            Belum Terjawab
                        </h5>
                    </div>

                    <div className="box-border h-202 w-full p-4 border-4 overflow-auto mt-5 mb-3">
                        {listSoal.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between">
                                    <h4 className="font-medium lg:text-1xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                                        {/* {nomorStop !== 0 ? (
                                 <span>Pertanyaan No {nomorStop}</span>
                             ) : (
                                 <span>Pertanyaan No {nomorSoal}</span>
                             )} */}
                                        <span>Pertanyaan No {item.nomor}</span>
                                    </h4>
                                    {listSoal[0].timer !== null ? (
                                        <div className="flex justify-end">
                                            <Icon icon="ri:time-line" className="mt-1" />
                                            <p className="font-medium lg:text-1xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 ml-2">
                                                {twoDigits(hoursToDisplay)}:
                                                {twoDigits(minutesToDisplay)}:
                                                {twoDigits(secondsToDisplay)}
                                            </p>
                                        </div>
                                    ) : null}

                                </div>
                                <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400">
                                    {item.soal_cat}
                                </p>
                                <p className="font-medium lg:text-1xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mt-2">
                                    Jawab:
                                </p>
                                <div className="flex justify-between">

                                    <div className="space-xy-5 mt-2">

                                        {listSoal[0].pilihan_jawaban.map((option, i) => (
                                            <Radio
                                                labelClass="sm:break-words md:break-words"
                                                // className="break-words"
                                                key={i}
                                                label={option.label}
                                                name="option"
                                                value={option.value}
                                                checked={item.jawaban_user === option.value}
                                                onChange={(e) => handleOption(e, item.id)}
                                            />
                                        ))}
                                    </div>
                                    <div className="grid grid-rows-2 grid-flow-col gap-4">
                                        <Card noborder bodyClass="p-0">
                                            <div className="image-box">
                                                {item.video === 'null' || item.video === null || item.video === '' ? (
                                                    null
                                                ) : (
                                                    <>
                                                        <video className="h-[170px] w-[250px]" id="player" controls="controls" data-poster="https://vjs.zencdn.net/v/oceans.png">
                                                            <source src={`${baseurl.imageurl}/${item.video}`} type="video/mp4" />
                                                        </video>

                                                    </>
                                                )}

                                            </div>


                                        </Card>
                                        <Card noborder bodyClass="p-0">
                                            <div className="image-box">
                                                {item.gambar === 'null' || item.gambar === null || item.gambar === '' ? (
                                                    null
                                                ) : (
                                                    <div className="gallery rounded-t-md h-[170px] w-[250px] object-contain">
                                                        <a
                                                            key={`${baseurl.imageurl}/${item.gambar}`}
                                                            href={`${`${baseurl.imageurl}/${item.gambar}`}?auto=compress&cs=tinysrgb&w=1200`}
                                                            onClick={getOnClick(`${`${baseurl.imageurl}/${item.gambar}`}?auto=compress&cs=tinysrgb&w=1200`)}
                                                        >
                                                            <img src={`${`${baseurl.imageurl}/${item.gambar}`}?auto=compress&cs=tinysrgb&w=300`} />
                                                        </a>
                                                        <ImageViewer />
                                                    </div>
                                                    // <img
                                                    //     src={`${baseurl.imageurl}/${item.gambar}`}
                                                    //     alt=""
                                                    //     className="rounded-t-md h-[170px] w-[250px] object-contain"
                                                    // />
                                                )}

                                            </div>


                                        </Card>
                                    </div>


                                </div>

                            </div>
                        ))}



                    </div>

                    {/* {propsData[0].peraturan} */}
                    <div className="mt-2 flex justify-between">
                        {/* <Link to="/pilih-sesi" state={propsData[1]} className="btn btn-dark block w-[200px] text-center text-white-600">Kembali</Link> */}
                        {/* <Link to="/soal" state={[propsData, data]} className="btn btn-dark block w-[200px] text-center text-white-600">Berikutnya</Link> */}


                        <button className="btn btn-dark block w-[200px] text-center text-white-600" onClick={(e) => prevStep(e)}>Kembali</button>
                        <button className="btn btn-dark block w-[200px] text-center text-white-600" onClick={(e) => nextStep(e)}>Berikutnya</button>

                    </div>


                </Card>
            </div>

        </div>
    );
};

export default Soal;


function useInterval(callback, delay) {
    const savedCallback = useRef()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, '0')
