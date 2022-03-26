import './portfolio.css'
import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import { useLocation, useParams } from 'react-router-dom';
import { finnhubClient } from '../finnhubSetup';

export const StockChart = ({ option }) => {

    const location = useLocation();
    const url = location.pathname;

    const { symbol } = useParams();
    const [stockCandles, setStockCandles] = useState({});
    const [unixTimes, setUnixTimes] = useState({});
    const [currentTime, setCurrentTime] = useState(Math.round(new Date()));
    const [yesterdayTime, setYesterdayTime] = useState(new Date().getTime() - 840000000)

    const getUnixTime = () => {
        let timeObj = {};
        timeObj.now = Math.round((new Date()));

        // let date = new Date();
        // date.setDate(date.getDate() - 1);
        // date.setHours(9)
        // date.setMinutes(30)

        // // let time = (new Date().getDate() - 1).setHours(9);
        console.log(yesterdayTime)
        // timeObj.yesterday = date.getTime();

        setUnixTimes(timeObj)
    }


    useEffect(() => {

        getUnixTime();
        if (setUnixTimes.length > 0 && option === 'asset') {
            finnhubClient.stockCandles(symbol, "D", 1645846200, currentTime, (error, data, response) => {
                setStockCandles(data)
            });
        }
    }, [])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        datalabels: {
            display: false
        },
        title: {
            display: false
        },
        title: {
            display: false
        },
        scales: {
            y: {
                display: false
            },
            x: {
                display: false
            }
        },

    }

    return (
        <>
            <div id="chart-container">
                {/* <h2>{JSON.stringify(stockInfo)}</h2> */}
                <Line
                    data={{
                        labels: stockCandles.t,
                        datasets: [
                            {
                                label: '',
                                data: stockCandles.c,
                                fill: false,
                                borderWidth: 2,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'green',
                                pointRadius: 0,
                                responsive: true
                            }
                        ]
                    }}
                    width={"30%"}
                    options={options}
                />
            </div>
        </>
    )
}
