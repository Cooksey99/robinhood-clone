import './portfolio.css'
import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';

export const Chart = () => {


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
            <Line
            data={{
                labels: ['1', '2', '3', '4', '5'],
                datasets: [
                    {
                        data: [200, 300, 1300, 520, 2000, 350, 150],
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
