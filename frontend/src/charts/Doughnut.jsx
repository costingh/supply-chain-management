import React, { useState, useEffect } from 'react'
import StatisticsService from '../services/statistics-service'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
const BarChart = () => {
    const [chart, setChart] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let title = ''
        await StatisticsService.mostSupplierInACity()
            .then((data) => {
                title = data.result.oras
            })
            .catch((err) => console.log(err))

        await StatisticsService.suppliersByCity()
            .then((data) => {
                let labels = []
                let datasets = []
                data.result.map((d) => {
                    datasets.push(d.nr_furnizori)
                    labels.push(d.oras)
                })

                drawChart(title, labels, datasets)
            })
            .catch((err) => console.log(err))
    }

    const drawChart = (title, lb, dt) => {
        const ctx = document.getElementById('myChart2')
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
            type: 'doughnut',
            data: {
                labels: lb,
                datasets: [
                    {
                        /*  backgroundColor: gradient, */
                        backgroundColor: [
                            'rgba(60, 66, 185, 0.6)',
                            'rgba(60, 162, 185, 0.6)',
                            'rgba(60, 185, 112, 0.6)',
                            'rgba(162, 185, 60, 0.6)',
                            'rgba(185, 166, 60, 0.6)',
                            'rgba(185, 124, 60, 0.6)',
                            'rgba(185, 60, 60, 0.6)',
                            'rgba(112, 60, 185, 0.6)',
                            'rgba(170, 60, 185, 0.6)',
                            'rgba(185, 60, 122, 0.6)',
                        ],
                        label: 'Distributie furnizori pe orase',
                        data: dt,
                        borderColor: 'transparent',
                        borderWidth: 2,
                        fill: 'start',
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
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Orasul cu cei mai multi furnizori: ' + title,
                    },
                },
            },
        })

        setChart(myChart)
    }

    const clearChart = (num) => {
        if (chart) {
            chart.destroy()
            setChart(null)
            fetchData()
        }
    }

    return (
        <canvas
            id="myChart2"
            style={{ height: '100%', width: '100%', position: 'relative' }}
        ></canvas>
    )
}

export default BarChart
