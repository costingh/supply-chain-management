import React, { useEffect, useState } from 'react'
import BarChart from '../../components/BarChart'
import moment from 'moment'
import StatisticsService from '../../services/statistics-service'

function Home() {
    const [numberOfInvoices, setNumberOfInvoices] = useState(0)
    const [numberOfOrders, setNumberOfOrders] = useState(0)
    const [numberOfSuppliers, setNumberOfSuppliers] = useState(0)
    const [numberOfEmployees, setNumberOfEmployees] = useState(0)

    useEffect(() => {
        StatisticsService.numberOfInvoices()
            .then((data) => {
                setNumberOfInvoices(data.result.total_facturi)
            })
            .catch((err) => console.log(err))

        StatisticsService.numberOfOrders()
            .then((data) => {
                setNumberOfOrders(data.result.total_comenzi)
            })
            .catch((err) => console.log(err))

        StatisticsService.numberOfSuppliers()
            .then((data) => {
                setNumberOfSuppliers(data.result.total_furnizori)
            })
            .catch((err) => console.log(err))

        StatisticsService.numberOfEmployees()
            .then((data) => {
                setNumberOfEmployees(data.result.total_angajati)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="homeContainer">
            <nav>
                <h1>Bine ai revenit!</h1>
                <p>{moment().format('LL')}</p>
            </nav>
            <div className="inner">
                <div className="innerL">
                    <div className="homeTop">
                        <div className="box">
                            <div className="icon">{/* svg */}</div>
                            <div>
                                <p>Facturi</p>
                                <h2>{numberOfInvoices}</h2>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">{/* svg */}</div>
                            <div>
                                <p>Comenzi</p>
                                <h2>{numberOfOrders}</h2>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">{/* svg */}</div>
                            <div>
                                <p>Furnizori</p>
                                <h2>{numberOfSuppliers}</h2>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">{/* svg */}</div>
                            <div>
                                <p>Angajati</p>
                                <h2>{numberOfEmployees}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="middle" style={{ padding: '10px' }}>
                        <BarChart />
                    </div>
                    <div className="bottom"></div>
                </div>
                <div className="innerR">
                    <div className="innerRtop"></div>
                    <div className="innerRbottom"></div>
                </div>
            </div>
        </div>
    )
}

export default Home
