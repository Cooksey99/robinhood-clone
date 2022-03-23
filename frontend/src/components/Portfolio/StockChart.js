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

    const getUnixTime = () => {
        let timeObj = {};
        timeObj.now = Math.round((new Date()));
        timeObj.yesterday = Math.round((new Date()))
        setUnixTimes(timeObj)
    }


    useEffect(() => {

        getUnixTime();

        if (setUnixTimes.length > 0 && option === 'asset') {
            finnhubClient.stockCandles(symbol, "D", 1590988249, currentTime, (error, data, response) => {
                setStockCandles(data)
            });
        }
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            },
            scales: {
                y: {
                    display: false
                }
            }
        }
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
                    options={options}
                />
            </div>
        </>
    )
}
