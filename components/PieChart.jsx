'use client'
import React from 'react'
import { ArcElement, Chart } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';

const PieChart = () => {

    Chart.register(ArcElement);

    return (
        <Doughnut
        style={{height: "110px"}}
            data={{
                labels: [
                    'hello',
                    'Blue',
                    'Yellow',
                ],
                datasets: [{
                    label: 'My First Dataseteee',
                    data: [100],
                    backgroundColor: [
                        'rgb(255 211 105)',
                        'rgb(238, 238, 238)',
                        'rgb(57, 62, 70)',
                    ],
                }]
            }} />
    )
}

export default PieChart
