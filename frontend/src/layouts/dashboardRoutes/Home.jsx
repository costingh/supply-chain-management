// React
import React, { useEffect, useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'

// charts
import BarChart from '../../charts/BarChart'
import Doughnut from '../../charts/Doughnut'

// time formatting
import moment from 'moment'

// services
import StatisticsService from '../../services/statistics-service'
import SuppliersService from '../../services/suppliers.service'

// constants
const backgrounds = [
    'rgba(60, 66, 185, 0.2)',
    'rgba(60, 162, 185, 0.2)',
    'rgba(60, 185, 112, 0.2)',
    'rgba(162, 185, 60, 0.2)',
    'rgba(185, 166, 60, 0.2)',
    'rgba(185, 124, 60, 0.2)',
    'rgba(185, 60, 60, 0.2)',
    'rgba(112, 60, 185, 0.2)',
    'rgba(170, 60, 185, 0.2)',
    'rgba(185, 60, 122, 0.2)',
]
const colors = [
    'rgba(60, 66, 185, 0.4)',
    'rgba(60, 162, 185, 0.4)',
    'rgba(60, 185, 112, 0.4)',
    'rgba(162, 185, 60, 0.4)',
    'rgba(185, 166, 60, 0.4)',
    'rgba(185, 124, 60, 0.4)',
    'rgba(185, 60, 60, 0.4)',
    'rgba(112, 60, 185, 0.4)',
    'rgba(170, 60, 185, 0.4)',
    'rgba(185, 60, 122, 0.4)',
]

function Home({ setData }) {
    const { user: currentUser } = useSelector((state) => state.auth)

    const [numberOfInvoices, setNumberOfInvoices] = useState(0)
    const [numberOfOrders, setNumberOfOrders] = useState(0)
    const [numberOfSuppliers, setNumberOfSuppliers] = useState(0)
    const [numberOfEmployees, setNumberOfEmployees] = useState(0)
    const [popularProducts, setPopularProducts] = useState([])
    const [popularSupplier, setPopularSupplier] = useState(null)
    const [mostExperiencedEmployee, setMostExperiencedEmployee] = useState(null)
    const [suppliersWithoutOrders, setSuppliersWithoutOrders] = useState(null)

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

        StatisticsService.favouriteSupplier()
            .then((data) => {
                setPopularSupplier(data.result)
            })
            .catch((err) => console.log(err))

        StatisticsService.numberOfEmployees()
            .then((data) => {
                setNumberOfEmployees(data.result.total_angajati)
            })
            .catch((err) => console.log(err))

        StatisticsService.bestEmployee()
            .then((data) => {
                setMostExperiencedEmployee(data.result)
            })
            .catch((err) => console.log(err))

        StatisticsService.popularProducts()
            .then((data) => {
                setPopularProducts(data.result)
            })
            .catch((err) => console.log(err))

        StatisticsService.suppliersWithNoOrders()
            .then((data) => {
                setSuppliersWithoutOrders(data.result)

                data.result.map((d) => {
                    StatisticsService.listOfProductsFromSupplier(
                        d.nume_furnizor
                    )
                        .then((data) => {
                            console.log(data.result)
                        })
                        .catch((err) => console.log(err))
                })
            })
            .catch((err) => console.log(err))
    }, [])

    const computeAge = (date) => {
        return moment(date, 'YYYYMMDD').fromNow().substr(0, 9)
    }

    const getMonth = (month) => {
        const months = [
            'Ianuarie',
            'Februarie',
            'Martie',
            'Aprilie',
            'Mai',
            'Iunie',
            'Iulie',
            'August',
            'Septembrie',
            'Octombrie',
            'Noiembrie',
            'Decembrie',
        ]

        return months[month - 1]
    }

    const handleDeleteSupplier = (s) => {
        SuppliersService.deleteSupplier(s.nume_furnizor)
            .then((data) => {
                setData(data.data)
                setTimeout(() => {
                    window.location.reload(false)
                }, 2000)
            })
            .catch((error) => console.log(error))
    }

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
                            <div className="icon">
                                <svg
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                >
                                    <path d="M9.484 15.696l-.711-.696-2.552 2.607-1.539-1.452-.698.709 2.25 2.136 3.25-3.304zm0-5l-.711-.696-2.552 2.607-1.539-1.452-.698.709 2.25 2.136 3.25-3.304zm0-5l-.711-.696-2.552 2.607-1.539-1.452-.698.709 2.25 2.136 3.25-3.304zm10.516 11.304h-8v1h8v-1zm0-5h-8v1h8v-1zm0-5h-8v1h8v-1zm4-5h-24v20h24v-20zm-1 19h-22v-18h22v18z" />
                                </svg>
                            </div>
                            <div>
                                <p>Facturi</p>
                                <h2>{numberOfInvoices}</h2>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <svg
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                >
                                    <path d="M23 6.066v12.065l-11.001 5.869-11-5.869v-12.131l11-6 11.001 6.066zm-21.001 11.465l9.5 5.069v-10.57l-9.5-4.946v10.447zm20.001-10.388l-9.501 4.889v10.568l9.501-5.069v-10.388zm-5.52 1.716l-9.534-4.964-4.349 2.373 9.404 4.896 4.479-2.305zm-8.476-5.541l9.565 4.98 3.832-1.972-9.405-5.185-3.992 2.177z" />
                                </svg>
                            </div>
                            <div>
                                <p>Comenzi</p>
                                <h2>{numberOfOrders}</h2>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <svg
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                >
                                    <path d="M16 3h-8v-1h8v1zm4 10.228c-1.194.276-3.91.772-8 .772-4.091 0-6.807-.496-8-.772v-8.228h16v8.228zm.5-9.228h-17c-.276 0-.5.224-.5.5v9.5s3.098 1 9 1 9-1 9-1v-9.5c0-.276-.224-.5-.5-.5zm-5.5 14.5c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5zm4 .5c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm0-3c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-14 3c-.551 0-1-.448-1-1s.449-1 1-1c.551 0 1 .448 1 1s-.449 1-1 1zm0-3c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm18-5h-1v9c0 .621-.52 1-1 1h-18c-.617 0-1-.516-1-1v-9h-1v-3h1v-5c0-1.103.897-2 2-2h16c1.103 0 2 .897 2 2v5h1v3zm-3 12h-2v-1h2v1zm-14 0h-2v-1h2v1zm17-16v-4c0-1.657-1.343-3-3-3h-16c-1.657 0-3 1.343-3 3v4c-.552 0-1 .448-1 1v3c0 .552.448 1 1 1v8c0 1.239 1.037 2 2 2v1c0 .552.448 1 1 1h2c.552 0 1-.448 1-1v-1h10v1c0 .552.448 1 1 1h2c.552 0 1-.448 1-1v-1c.958 0 2-.758 2-2v-8c.552 0 1-.448 1-1v-3c0-.552-.448-1-1-1z" />
                                </svg>
                            </div>
                            <div>
                                <p>Furnizori</p>
                                <h2>{numberOfSuppliers}</h2>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.997 18h-.998c0-1.552.06-1.775-.88-1.993-1.438-.332-2.797-.645-3.293-1.729-.18-.396-.301-1.048.155-1.907 1.021-1.929 1.277-3.583.702-4.538-.672-1.115-2.707-1.12-3.385.017-.576.968-.316 2.613.713 4.512.465.856.348 1.51.168 1.908-.49 1.089-1.836 1.4-3.262 1.728-.982.227-.92.435-.92 2.002h-.995l-.002-.623c0-1.259.1-1.985 1.588-2.329 1.682-.389 3.344-.736 2.545-2.209-2.366-4.365-.676-6.839 1.865-6.839 2.492 0 4.227 2.383 1.867 6.839-.775 1.464.824 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.81-2.214c-1.289-.298-2.489-.559-1.908-1.657 1.77-3.342.47-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.325 0 1.269.574 2.175.904 2.925h1.048c-.17-.75-1.466-2.562-.766-3.736.412-.692 1.704-.693 2.114-.012.38.631.181 1.812-.534 3.161-.388.733-.28 1.301-.121 1.648.305.666.977.987 1.737 1.208 1.507.441 1.368.042 1.368 1.48h.997l.002-.463c0-.945-.074-1.492-1.193-1.75zm-22.805 2.214h.997c0-1.438-.139-1.039 1.368-1.48.761-.221 1.433-.542 1.737-1.208.159-.348.267-.915-.121-1.648-.715-1.349-.914-2.53-.534-3.161.41-.682 1.702-.681 2.114.012.7 1.175-.596 2.986-.766 3.736h1.048c.33-.75.904-1.656.904-2.925.001-1.509-.982-2.326-2.247-2.326-1.87 0-3.17 1.787-1.4 5.129.581 1.099-.619 1.359-1.908 1.657-1.12.258-1.194.805-1.194 1.751l.002.463z" />
                                </svg>
                            </div>
                            <div>
                                <p>Angajati</p>
                                <h2>{numberOfEmployees}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="middle" style={{ padding: '10px' }}>
                        <BarChart />
                    </div>
                    <div className="bottom">
                        <div className="bottomBox">
                            <div
                                className="img"
                                style={{
                                    background: 'rgba(60, 185, 112, 0.6)',
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    style={{
                                        fill: 'rgba(60, 185, 112, 1)',
                                    }}
                                >
                                    <path d="M23.995 24h-1.995c0-3.104.119-3.55-1.761-3.986-2.877-.664-5.594-1.291-6.584-3.458-.361-.791-.601-2.095.31-3.814 2.042-3.857 2.554-7.165 1.403-9.076-1.341-2.229-5.413-2.241-6.766.034-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 4.983 0 8.451 4.766 3.732 13.678-1.551 2.928 1.65 3.624 5.09 4.418 2.979.688 3.178 2.143 3.178 4.663l-.005 1.241zm-13.478-6l.91 2h1.164l.92-2h-2.994zm2.995 6l-.704-3h-1.615l-.704 3h3.023z" />
                                </svg>
                            </div>
                            <div className="textContainer">
                                <h1>Cel mai experimentat angajat</h1>
                                <p
                                    style={{
                                        color: 'rgba(60, 185, 112, 0.6)',
                                    }}
                                >
                                    {mostExperiencedEmployee &&
                                        `${mostExperiencedEmployee.nume} ${mostExperiencedEmployee.prenume}`}
                                </p>
                                <p>
                                    {mostExperiencedEmployee &&
                                        `${computeAge(
                                            mostExperiencedEmployee.data_nastere
                                        )} - ${
                                            mostExperiencedEmployee.salariu
                                        } Lei/Luna`}
                                </p>
                            </div>
                        </div>
                        <div className="bottomBox">
                            <div
                                className="img"
                                style={{
                                    background: 'rgba(60, 162, 185, 0.6)',
                                }}
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    style={{
                                        fill: 'rgba(60, 162, 185, 1)',
                                    }}
                                >
                                    <path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z" />
                                </svg>
                            </div>
                            <div className="textContainer">
                                <h1>Furnizorul Preferat</h1>
                                <p
                                    style={{
                                        color: 'rgba(60, 162, 185, 0.6)',
                                    }}
                                >
                                    {popularSupplier &&
                                        popularSupplier.nume_furnizor}
                                </p>
                                <p>
                                    {popularSupplier &&
                                        `Total produse achizitionate: ${popularSupplier.cantitate}`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="innerR">
                    <div className="innerRtop">
                        <h1>Produse populare</h1>
                        <div className="popularProducts">
                            {popularProducts &&
                                popularProducts.map((p) => (
                                    <div
                                        className="popularProduct"
                                        key={p.nume_produs}
                                    >
                                        <div>
                                            <img
                                                src={p.imagine_produs}
                                                alt=""
                                            />
                                            <div className="txt">
                                                <div className="title">
                                                    {p.nume_produs}
                                                </div>
                                                <div className="desc">
                                                    {getMonth(p.luna)}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="price">
                                                {p.pret} <span>LEI</span>
                                            </div>
                                            <div className="quantity">
                                                Cantitate: {p.cantitate_lunara}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="innerRbottom">
                        {' '}
                        <Doughnut />
                    </div>
                </div>
            </div>
            <div className="tabels">
                <h1>Furnizori de la care nu ati achizitionat produse</h1>
                <div className="tbl">
                    <div className="tableColumns header">
                        <div className="tableCol">Nume Furnizor</div>
                        <div className="tableCol">Oras Furnizor</div>
                        <div className="tableCol">Numar Telefon</div>
                        <div className="tableCol">Actiuni</div>
                    </div>
                    {suppliersWithoutOrders &&
                        suppliersWithoutOrders.map((s, index) => (
                            <div
                                className="tableColumns data"
                                key={s.nume_furnizor}
                            >
                                <div className="tableCol">
                                    <div
                                        className="suppImg"
                                        style={{
                                            background:
                                                backgrounds[
                                                    index > backgrounds.length
                                                        ? index %
                                                          backgrounds.length
                                                        : index
                                                ],
                                            fill: colors[
                                                index > colors.length
                                                    ? index % colors.length
                                                    : index
                                            ],
                                        }}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                        >
                                            <path d="M3 18h-2c-.552 0-1-.448-1-1v-13c0-.552.448-1 1-1h13c.552 0 1 .448 1 1v2h4.667c1.117 0 1.6.576 1.936 1.107.594.94 1.536 2.432 2.109 3.378.188.312.288.67.288 1.035v4.48c0 1.089-.743 2-2 2h-1c0 1.656-1.344 3-3 3s-3-1.344-3-3h-6c0 1.656-1.344 3-3 3s-3-1.344-3-3zm3-1.2c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm12 0c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm-3-2.8h-13v2h1.765c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h7.53c.549-.614 1.347-1 2.235-1 .888 0 1.686.386 2.235 1h1.765v-4.575l-1.711-2.929c-.179-.307-.508-.496-.863-.496h-4.426v6zm-2-9h-11v7h11v-7zm3 4v3h5l-1.427-2.496c-.178-.312-.509-.504-.868-.504h-2.705z" />
                                        </svg>
                                    </div>
                                    <p className="supplierNameCol">
                                        {s.nume_furnizor}
                                    </p>
                                </div>
                                <div className="tableCol">{s.oras}</div>
                                <div className="tableCol">{s.nr_telefon}</div>
                                <div className="tableCol">
                                    {currentUser &&
                                    currentUser.administrator === 'D' ? (
                                        <p
                                            style={{
                                                padding: '6px 15px',
                                                borderRadius: '5px',
                                                background: '#111',
                                                cursor: 'pointer',
                                                display: 'inline-block',
                                            }}
                                            onClick={() =>
                                                handleDeleteSupplier(s)
                                            }
                                        >
                                            Stergeti
                                        </p>
                                    ) : (
                                        <p
                                            style={{
                                                padding: '6px 15px',
                                                borderRadius: '5px',
                                                background: '#1e2835',
                                                color: '#7e7b7a',
                                            }}
                                        >
                                            Stergeti
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Home
