import React, { useState, useEffect, useRef } from "react";
import Card from "../../../components/ui/Card";
import { useDispatch, useSelector } from "react-redux";
import HomeBredCurbs from "../HomeBredCurbs";
import Radio from "../../../components/ui/Radio";
import clsx from "clsx";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/Icon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addSoal, updateListSoal, getSoal } from "../../../store/api/app/soalSlice";
import { nextNomorSoal, prevNomorSoal, changeMinutes } from "../../../store/api/app/incrementSoal";
import { useGetDataMutation } from "../../../store/api/app/appSlice";
import baseurl from "../../../constant/baseurl";
import { toast } from "react-toastify";
import { confirmTesDone } from "../../../pages/components/confirm-tes-done";
import { confirmTesCancel } from "../../../pages/components/confirm-tes-cancel";
import axios from 'axios';
import Swal from "sweetalert2";
import { getTokenFromLocalStorage } from "../../../store/localStorage";
import Countdown from "react-countdown";
import Timer from "./countdownTimer";
// import { set } from "react-hook-form";
// import { useTimer } from 'react-timer-hook';
// import { useTimer } from 'react-timer-hook';

// import { useTimer as timer } from 'react-timer-hook';
const STATUS = {
    STARTED: 'Started',
    STOPPED: 'Stopped',
}




const ListSoal = () => {
    const { items, listSoal, listJawaban } = useSelector((state) => state.soal);
    // const INITIAL_COUNT = 120
    let { timeRun, setTimeRun } = useState(parseInt(listSoal[0].timer) * 60);
    const { nomorSoal } = useSelector((state) => state.incsoal);
    const navigate = useNavigate();
    const [getData] = useGetDataMutation();
    const [title, setTitle] = useState();
    const [nomorStop, setNomorStop] = useState(0);
    const [soal, setSoal] = useState([]);
    const location = useLocation();
    const propsData = location.state;

    const [selectOption, setSelectOption] = useState("");
    const [valueListJawaban, setValueListJawaban] = useState([]);
    let [runMinutes, setMinutes] = useState();
    let [runSeconds, setSeconds] = useState();
    const [waktuPergerjaan, setWaktuPengerjaan] = useState('');

    // console.log('listSoal', listSoal[0].timer)
    // const [nomor, setNomor] = useState(0);
    const dispatch = useDispatch();
    // const rendererTimer = ({ minutes, seconds, completed }) => {
    //     console.log('secinds', seconds)
    //     if (completed) {
    //         // Render a completed state
    //         return <span>Completed</span>;
    //     } else {
    //         // Render a countdown
    //         return <span>{minutes}:{seconds}</span>;
    //     }
    // };
    // const Ref = useRef(null);
    // const [timer, setTimer] = useState('00:00:00');
    // // const [isTime, setIsTime] = useState(item.timer);
    // // myTime = item.timer;
    // // console.log('timer', myTime)
    // const getTimeRemaining = (e) => {
    //     const total = Date.parse(e) - Date.parse(new Date());
    //     const seconds = Math.floor((total / 1000) % 60);
    //     const minutes = Math.floor((total / 1000 / 60) % 60);
    //     const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    //     return {
    //         total, hours, minutes, seconds
    //     };
    // }

    // const startTimer = (e) => {
    //     let { total, hours, minutes, seconds }
    //         = getTimeRemaining(e);
    //     if (total >= 0) {

    //         // update the timer
    //         // check if less than 10 then we need to
    //         // add '0' at the beginning of the variable
    //         setTimer(
    //             (hours > 9 ? hours : '0' + hours) + ':' +
    //             (minutes > 9 ? minutes : '0' + minutes) + ':'
    //             + (seconds > 9 ? seconds : '0' + seconds)
    //         )
    //     }
    // }

    // const clearTimer = (e) => {

    //     // If you adjust it you should also need to
    //     // adjust the Endtime formula we are about
    //     // to code next   
    //     setTimer(timer);
    //     console.log('timer now', timer)

    //     // If you try to remove this line the
    //     // updating of timer Variable will be
    //     // after 1000ms or 1sec
    //     if (Ref.current) clearInterval(Ref.current);
    //     const id = setInterval(() => {
    //         startTimer(e);
    //     }, 1000)
    //     Ref.current = id;
    // }
    // const deadline = new Date();

    // // This is where you need to adjust if
    // // you entend to add more time

    // console.log('ya', listSoal[0].timer)
    // deadline.setSeconds(deadline.getSeconds() + (parseInt(listSoal[0].timer) * 60));

    useEffect(() => {
        handleStart()
        // setIsTime(item.timer);
        // clearTimer(getDeadTime());

    }, []);

    const onClickReset = () => {

        // clearTimer(getDeadTime());
    }


    // const getDeadTime = () => {

    //     return deadline;
    // }

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
    const handleReset = () => {
        setStatus(STATUS.STOPPED)
        setSecondsRemaining(parseInt(listSoal[0].timer) * 60);
        handleStart();
    }

    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1)
            } else {
                setStatus(STATUS.STOPPED)
            }
        },
        status === STATUS.STARTED ? 1000 : null,
        // passing null stops the interval
    )
    return (
        <>
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
                        <div className="flex justify-end">
                            <Icon icon="ri:time-line" className="mt-1" />
                            <p className="font-medium lg:text-1xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 ml-2">
                                {/* <Countdown
                                date={Date.now() + (parseInt(item.timer) * 60000)}
                                renderer={rendererTimer}
                                autoStart={true}
                            /> */}
                                <div style={{ padding: 20 }}>
                                    {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
                                    {twoDigits(secondsToDisplay)}
                                </div>
                                <div>Status: {status}</div>
                                <button onClick={handleReset} type="button">
                                    Reset
                                </button>
                            </p>
                        </div>
                    </div>
                    <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400">
                        {item.soal_cat}
                    </p>
                    <h5 className="font-medium lg:text-1xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4 mt-2">
                        Jawab:
                    </h5>
                    <div className="flex justify-between">

                        <div className="space-xy-5 mt-2">

                            {JSON.parse(item.value_pilihan_jawaban).map((option, i) => (
                                <Radio
                                    key={i}
                                    label={option.label}
                                    name="option"
                                    value={option.value}
                                    checked={item.jawaban_user === option.value}
                                    onChange={(e) => handleOption(e, item.id)}
                                />
                            ))}
                        </div>
                        <Card noborder bodyClass="p-0">
                            <div className="image-box">
                                {item.gambar !== 'null' ? (
                                    <img
                                        src={`${baseurl.imageurl}/${item.gambar}`}
                                        alt=""
                                        className="rounded-t-md h-[170px] w-[250px] object-contain"
                                    />
                                ) : null}

                            </div>


                        </Card>


                    </div>

                </div>
            ))}
        </>
    );
};

export default ListSoal;

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

