import React, { useState, useEffect } from 'react'
import StatisticsService from '../services/statistics-service'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const BarChart = () => {
    const [monthsRange, setMonthsRange] = useState(6)
    const [chart, setChart] = useState(null)

    useEffect(() => {
        fetchData(6)
    }, [])

    const fetchData = (num) => {
        setMonthsRange(num)
        StatisticsService.totalSpentByMonth(num)
            .then((data) => {
                console.log(data.result)
                if (data.result && data.result.length > 0) {
                    let arrayOfMonths = []
                    let arrayOfData = []
                    data.result.map((res) => {
                        arrayOfMonths.push(res.nume_luna)
                        arrayOfData.push(res.total)
                    })

                    drawChart(arrayOfMonths, arrayOfData)
                }
            })
            .catch((err) => console.log(err))
    }

    const drawChart = (labels, data) => {
        if (labels && labels.length > 0 && data && data.length > 0) {
            const ctx = document.getElementById('myChart')
            let length = 400,
                angle = 270
            let gradient = ctx
                .getContext('2d')
                .createLinearGradient(
                    700,
                    500,
                    300 + Math.cos(angle) * length,
                    300 + Math.sin(angle) * length
                )
            gradient.addColorStop(1, 'rgba(60,66,185,0.4)')
            gradient.addColorStop(0, 'rgba(0,0,0,0)')

            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            backgroundColor: gradient,
                            label: 'Total comenzi (LEI)',
                            data: data,
                            borderColor: 'rgba(60,66,185,255)',
                            borderWidth: 2,
                            fill: 'start',
                            lineTension: 0.5,
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            })

            setChart(myChart)
        }
    }

    const clearChart = (num) => {
        if (chart) {
            chart.destroy()
            setChart(null)
            fetchData(num)
        }
    }

    return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <div className="range">
                <div
                    className={`${monthsRange === 3 && 'active'}`}
                    onClick={() => clearChart(3)}
                >
                    3 Luni
                </div>
                <div
                    className={`${monthsRange === 6 && 'active'}`}
                    onClick={() => clearChart(6)}
                >
                    6 Luni
                </div>
                <div
                    className={`${monthsRange === 12 && 'active'}`}
                    onClick={() => clearChart(12)}
                >
                    12 Luni
                </div>
            </div>
            <canvas
                id="myChart"
                style={{ height: '100%', width: '100%', position: 'relative' }}
            ></canvas>
        </div>
    )
}

export default BarChart
