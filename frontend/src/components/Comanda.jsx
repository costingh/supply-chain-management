// react
import { useState, useEffect } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// components
import GenerareFactura from './GenerareFactura'
// router
import { useLocation, Link } from 'react-router-dom'
// services
import OrdersService from '../services/orders.service'
// moment js for date formatting
import moment from 'moment'
import 'moment/locale/ro'
moment.locale('ro')

export default function Comanda() {
    const { user: currentUser } = useSelector((state) => state.auth)

    const location = useLocation()
    const [orderNumber, setOrderNumber] = useState(null)
    const [detaliiComanda, setDetaliiComanda] = useState(null)
    const [produseComanda, setProduseComanda] = useState([])
    const [totalPriceTabel, setTotalPriceTabel] = useState(0)
    const [generateInvoiceOpened, setGenerateInvoiceOpened] = useState(false)

    // generare factura
    const [detaliiComandaFactura, setDetaliiComandaFactura] = useState(null)
    const [produseComandaFactura, setProduseComandaFactura] = useState([])

    useEffect(() => {
        setOrderNumber(location.pathname.split('/')[5])
    }, [])

    const ellipsis = (text) => {
        return text.length > 17 ? text.substring(0, 17 - 3) + '...' : text
    }

    useEffect(() => {
        if (orderNumber)
            OrdersService.getOrderByNumber(orderNumber)
                .then((resp) => {
                    setDetaliiComanda(resp.comanda[0][0])
                    setProduseComanda(resp.comanda[1])
                })
                .catch((err) => console.log(err))
    }, [orderNumber])

    useEffect(() => {
        let pret = 0

        if (produseComanda.length > 0) {
            produseComanda.map((pc) => {
                pret += pc.cantitate * pc.pret
            })
        }
        setTotalPriceTabel((Math.round(pret * 100) / 100).toFixed(2))
    }, [produseComanda])

    const handleGenerateInvoice = (nr_comanda) => {
        setGenerateInvoiceOpened(true)
        if (nr_comanda > 0)
            OrdersService.getOrderByNumber(nr_comanda)
                .then((resp) => {
                    setDetaliiComandaFactura(resp.comanda[0][0])
                    setProduseComandaFactura(resp.comanda[1])
                })
                .catch((err) => console.log(err))
    }

    return (
        <div className="ordersContainer">
            {generateInvoiceOpened && (
                <GenerareFactura
                    setGenerateInvoiceOpened={setGenerateInvoiceOpened}
                    detaliiComanda={detaliiComandaFactura}
                    produseComanda={produseComandaFactura}
                    nrComanda={orderNumber}
                />
            )}
            <div className="nav">
                <h1>Comanda #{orderNumber}</h1>
                <div style={{ display: 'flex', columnGap: '20px' }}>
                    <Link
                        to={`/${
                            currentUser && currentUser.administrator === 'N'
                                ? 'employee'
                                : 'admin'
                        }/dashboard/comenzi`}
                    >
                        <div className="addNewOrder">Inapoi</div>
                    </Link>
                    {detaliiComanda && !detaliiComanda.nr_factura && (
                        <Link
                            to={`/${
                                currentUser && currentUser.administrator === 'N'
                                    ? 'employee'
                                    : 'admin'
                            }/dashboard/comenzi/comanda/editati/${orderNumber}`}
                        >
                            <div className="addNewOrder">Editati</div>
                        </Link>
                    )}
                </div>
            </div>
            <div className="ordersInner">
                <div className="ordersColumn" style={{ width: '60%' }}>
                    <div className="rowLeft">
                        <h1>Istoric</h1>
                        <div className="historyTable">
                            <div
                                className="historyTableRow"
                                style={{ background: '#4552613a' }}
                            >
                                <p className="date">
                                    {detaliiComanda &&
                                    detaliiComanda.data_comanda
                                        ? moment(
                                              detaliiComanda.data_comanda
                                          ).format('llll')
                                        : '-'}
                                </p>
                                <p className="desc">Comanda plasata</p>
                                <p className="suppName">
                                    {detaliiComanda &&
                                        detaliiComanda.nume_furnizor}
                                </p>
                            </div>
                            <div className="historyTableRow">
                                <p className="date">
                                    -
                                    {/* {detaliiComanda &&
                                    detaliiComanda.data_comanda
                                        ? moment(
                                              detaliiComanda.data_comanda
                                          ).format('llll')
                                        : '-'} */}
                                </p>
                                <p className="desc">Preluata de curier</p>
                                <p className="suppName">
                                    {detaliiComanda &&
                                        detaliiComanda.nume_furnizor}
                                </p>
                            </div>
                            <div
                                className="historyTableRow"
                                style={{ background: '#4552613a' }}
                            >
                                <p className="date">
                                    {detaliiComanda &&
                                    detaliiComanda.data_livrare
                                        ? moment(
                                              detaliiComanda.data_livrare
                                          ).format('llll')
                                        : '-'}
                                </p>
                                <p className="desc">
                                    {detaliiComanda &&
                                    detaliiComanda.data_livrare
                                        ? 'Livrare Estimata'
                                        : 'Comanda in tranzit'}
                                </p>
                                <p className="suppName">
                                    {detaliiComanda?.nume_furnizor}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="productsTableFromOrder">
                        <h1>Produse Comandate</h1>
                        <div className="productsTableFromOrderInner">
                            <div className="th">
                                <div style={{ width: '30%' }}>Produs</div>
                                <div>Cantitate</div>
                                <div>Descriere</div>
                                <div>Categorie</div>
                                <div style={{ width: '15%' }}>Pret</div>
                            </div>
                            <div className="tr">
                                {produseComanda &&
                                    produseComanda.map((pc) => (
                                        <div key={pc.nume_produs}>
                                            <div className="trProductName">
                                                <img
                                                    src={pc.imagine_produs}
                                                    alt=""
                                                    style={{ width: '50px' }}
                                                />
                                                <p>{pc.nume_produs}</p>
                                            </div>
                                            <div>
                                                {pc.cantitate}{' '}
                                                {pc.unitate_masura}
                                            </div>
                                            <div>
                                                {ellipsis(pc.descriere_produs)}
                                            </div>
                                            <div>
                                                {ellipsis(pc.nume_categorie)}
                                            </div>
                                            <div style={{ width: '15%' }}>
                                                {pc.pret}{' '}
                                                <span
                                                    style={{
                                                        fontSize: '12px',
                                                        color: '#e1e1e1',
                                                    }}
                                                >
                                                    RON
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="tf">
                                <div>Produs</div>
                                <div>
                                    Total{' '}
                                    <span>
                                        {totalPriceTabel}{' '}
                                        <span
                                            style={{
                                                fontSize: '12px',
                                                color: '#8491a2',
                                            }}
                                        >
                                            RON
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ordersColumn" style={{ width: '40%' }}>
                    <div className="rowRight">
                        <h1>Detalii Comanda</h1>
                        <div className="invoiceContainer">
                            <div className="title">Comanda #{orderNumber}</div>
                            <div className="dateFacturare">
                                <div className="data">
                                    <span>data comanda</span>

                                    <p style={{ textAlign: 'center' }}>
                                        {detaliiComanda &&
                                        detaliiComanda.data_comanda
                                            ? moment(
                                                  detaliiComanda.data_comanda
                                              ).format('L')
                                            : '-'}
                                    </p>
                                </div>
                                <div className="data">
                                    <span>data livrare</span>
                                    <p style={{ textAlign: 'center' }}>
                                        {detaliiComanda &&
                                        detaliiComanda.data_livrare
                                            ? moment(
                                                  detaliiComanda.data_livrare
                                              ).format('L')
                                            : '-'}
                                    </p>
                                </div>
                            </div>
                            <div className="listaProduseDePeComanda">
                                {produseComanda &&
                                    produseComanda.map((pc, index) => (
                                        <div
                                            className="produsLista"
                                            key={pc.nume_produs}
                                        >
                                            <div className="numeProdus">
                                                {index + 1}. {pc.nume_produs}
                                            </div>
                                            <div className="numbers">
                                                <div className="quantity">
                                                    {pc.cantitate}x
                                                </div>
                                                <div className="price">
                                                    {(
                                                        Math.round(
                                                            pc.pret * 100
                                                        ) / 100
                                                    ).toFixed(2)}{' '}
                                                    <span>RON</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                <div className="separator"></div>
                                <div className="pretContainer">
                                    <p className="heading">Cost</p>
                                    <p className="price">
                                        {totalPriceTabel} <span>RON</span>
                                    </p>
                                </div>
                                <div className="pretContainer">
                                    <p className="heading">Livrare</p>
                                    <p className="price">
                                        0.00 <span>RON</span>
                                    </p>
                                </div>
                                <div
                                    className="pretContainer"
                                    style={{ background: '#4552613a' }}
                                >
                                    <p className="headingBold">Total</p>
                                    <p className="priceBold">
                                        {totalPriceTabel} <span>RON</span>
                                    </p>
                                </div>
                                <div
                                    className="pretContainer"
                                    style={{
                                        background: '#111',
                                        marginTop: '30px',
                                        padding: '20px 30px',
                                        justifyContent: 'center',
                                        color: '#ccc',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {detaliiComanda &&
                                    detaliiComanda.nr_factura ? (
                                        <Link
                                            to={`/${
                                                currentUser &&
                                                currentUser.administrator ===
                                                    'N'
                                                    ? 'employee'
                                                    : 'admin'
                                            }/dashboard/${
                                                detaliiComanda.nr_factura
                                                    ? 'facturi/' +
                                                      detaliiComanda.nr_factura
                                                    : 'facturi/generare/' +
                                                      orderNumber
                                            }`}
                                        >
                                            <div
                                                className="btn-outlined"
                                                style={{ color: '#e1e1e1' }}
                                            >
                                                Vezi Factura
                                            </div>
                                        </Link>
                                    ) : (
                                        <div
                                            className="btn-outlined"
                                            onClick={() =>
                                                handleGenerateInvoice(
                                                    orderNumber
                                                )
                                            }
                                        >
                                            Genereaza Factura
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
