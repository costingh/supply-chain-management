import React, { useState, useEffect } from 'react'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const BarChart = () => {
    const [labels, setLabels] = useState([])

    useEffect(() => {
        getLastSixMonths()
    }, [])

    useEffect(() => {
        if (labels && labels.length > 0) {
            const ctx = document.getElementById('myChart')
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            /* borderColor: '#8491a2', */
                            borderWidth: 1,
                            fill: 'start',
                            backgroundColor: '#3c42b9',
                            lineTension: 0.5,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            })
        }
    }, [labels])

    const getLastSixMonths = () => {
        let monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]

        let today = new Date()
        let lastSixMonths = []

        for (let i = 6; i > 0; i -= 1) {
            let d = new Date(today.getFullYear(), today.getMonth() - i, 1)
            lastSixMonths.push(monthNames[d.getMonth()])
        }
        setLabels(lastSixMonths)
    }

    return (
        <canvas id="myChart" style={{ height: '100%', width: '100%' }}></canvas>
    )
}

export default BarChart
