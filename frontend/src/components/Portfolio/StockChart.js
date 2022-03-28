import './portfolio.css'
import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import { useLocation, useParams } from 'react-router-dom';
import { finnhubClient } from '../finnhubSetup';
import { useSelector } from 'react-redux';

export const StockChart = ({ option, stock }) => {

    const location = useLocation();
    const url = location.pathname;

    const transactions = useSelector(state => state?.assetReducer);

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
        console.log('=========================', transactions.tranObj)

    }, [location])

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
                {option === 'asset' && stock.dp >= 0 && (
                    <Line
                        data={{
                            labels: stockCandles.t,
                            datasets: [
                                {
                                    label: '',
                                    data: stockCandles.c,
                                    fill: false,
                                    borderWidth: 2,
                                    backgroundColor: '#00C805',
                                    borderColor: '#00C805',
                                    pointRadius: 0,
                                    responsive: true
                                }
                            ]
                        }}
                        width={"30%"}
                        options={options}
                    />
                )}
                {option === 'asset' && stock.dp < 0 && (
                    <Line
                        data={{
                            labels: stockCandles.t,
                            datasets: [
                                {
                                    label: '',
                                    data: stockCandles.c,
                                    fill: false,
                                    borderWidth: 2,
                                    backgroundColor: '#FF5000',
                                    borderColor: '#FF5000',
                                    pointRadius: 0,
                                    responsive: true
                                }
                            ]
                        }}
                        width={"30%"}
                        options={options}
                    />
                )}
                {option === 'portfolio' && (
                    <Line
                        data={{
                            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            datasets: [
                                {
                                    label: '',
                                    data: [30, 28, 31, 40, 38, 35, 36, 40, 48, 49, 42,
                                        38, 35, 36, 28, 31, 40, 38],
                                    fill: false,
                                    borderWidth: 2,
                                    backgroundColor: '#00C805',
                                    borderColor: '#00C805',
                                    pointRadius: 0,
                                    responsive: true
                                }
                            ]
                        }}
                        width={"30%"}
                        options={options}
                    />
                )}


            </div>
        </>
    )
}
