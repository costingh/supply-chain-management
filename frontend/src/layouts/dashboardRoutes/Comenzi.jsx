// react
import { useState, useEffect } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// router
import { Link } from 'react-router-dom'
// components
import GenerareFactura from '../../components/GenerareFactura'
// actions
import { getAllOrders } from '../../actions/orders'
// services
import OrdersService from '../../services/orders.service'
// date formatter
import moment from 'moment'

function Comenzi() {
    const { user: currentUser } = useSelector((state) => state.auth)
    const { orders } = useSelector((state) => state.orders)
    const [loading, setLoading] = useState(false)
    const [generateInvoiceOpened, setGenerateInvoiceOpened] = useState(false)

    // generare factura
    const [detaliiComanda, setDetaliiComanda] = useState(null)
    const [produseComanda, setProduseComanda] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        dispatch(getAllOrders()).then((data) => {
            setLoading(false)
        })
    }, [])

    const handleGenerateInvoice = (nr_comanda) => {
        setGenerateInvoiceOpened(true)
        if (nr_comanda > 0)
            OrdersService.getOrderByNumber(nr_comanda)
                .then((resp) => {
                    setDetaliiComanda(resp.comanda[0][0])
                    setProduseComanda(resp.comanda[1])
                })
                .catch((err) => console.log(err))
    }

    return (
        <div className="ordersContainer">
            <div className="nav">
                <h1>
                    {orders && orders.length === 1
                        ? '1 Comanda'
                        : orders && orders.length + ' Comenzi'}
                </h1>
                <Link
                    to={`/${
                        currentUser && currentUser.administrator === 'N'
                            ? 'angajat'
                            : 'admin'
                    }/dashboard/produse`}
                >
                    <div className="addNewOrder">Plasati Comanda</div>
                </Link>
            </div>
            <div className="ordersInner" style={{ display: 'block' }}>
                {orders &&
                    orders.map((o) => (
                        <div className="order" key={o.nr_comanda}>
                            <div className="topOrderContainer">
                                <div className="topOrderLeft">
                                    <div className="box">
                                        <p className="heading">
                                            Comanda Plasata
                                        </p>
                                        <p className="subheading">
                                            {moment(o.data_comanda).format(
                                                'll'
                                            )}
                                        </p>
                                    </div>
                                    <div className="box">
                                        <p className="heading">Total</p>
                                        <p className="subheading">
                                            {(
                                                Math.round(o.total * 100) / 100
                                            ).toFixed(2)}{' '}
                                            RON
                                        </p>
                                    </div>
                                </div>
                                <div className="topOrderRight">
                                    <div className="box">
                                        <p className="heading">
                                            Comanda #{o.nr_comanda}
                                        </p>
                                        <p className="subheading">
                                            Detalii Comanda
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="middleOrderContainer">
                                <div className="middleLeft">
                                    <div className="image">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm-19 5.78c0-.431.349-.78.78-.78h.428v1.125h-1.208v-.345zm0 .764h1.208v.968h-1.208v-.968zm0 1.388h1.208v1.068h-.428c-.431 0-.78-.349-.78-.78v-.288zm3 5.068h-3v-1h3v1zm1-4.78c0 .431-.349.78-.78.78h-.429v-1.068h1.209v.288zm0-.708h-1.209v-.968h1.209v.968zm0-1.387h-1.629v2.875h-.743v-4h1.592c.431 0 .78.349.78.78v.345zm4 6.875h-3v-1h3v1zm1-6.5c0-1.381 1.119-2.5 2.5-2.5.484 0 .937.138 1.32.377-.531.552-.857 1.3-.857 2.123 0 .824.327 1.571.857 2.123-.383.239-.836.377-1.32.377-1.381 0-2.5-1.119-2.5-2.5zm4 6.5h-3v-1h3v1zm5 0h-3v-1h3v1zm-2.5-4c-1.38 0-2.5-1.119-2.5-2.5s1.12-2.5 2.5-2.5c1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5z" />
                                        </svg>
                                    </div>
                                    <div className="text">
                                        <h1>Detalii Furnizor</h1>

                                        <p
                                            style={{
                                                color: '#bbb',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {o.nume_furnizor}
                                        </p>
                                        <p>
                                            - {o.oras}, {o.judet}, Strada{' '}
                                            {o.strada}, nr.{o.numar}
                                        </p>
                                        <p>- Nr. Telefon: {o.nr_telefon}</p>
                                    </div>
                                </div>
                                <div className="middleRight">
                                    <Link
                                        to={`/${
                                            currentUser &&
                                            currentUser.administrator === 'N'
                                                ? 'angajat'
                                                : 'admin'
                                        }/dashboard/comenzi/comanda/${
                                            o.nr_comanda
                                        }`}
                                    >
                                        <div className="btn-solid">
                                            Vezi Comanda
                                        </div>
                                    </Link>
                                    {o.nr_factura ? (
                                        <Link
                                            to={`/${
                                                currentUser &&
                                                currentUser.administrator ===
                                                    'N'
                                                    ? 'angajat'
                                                    : 'admin'
                                            }/dashboard/${
                                                o.nr_factura
                                                    ? 'facturi/' + o.nr_factura
                                                    : 'facturi/generare/' +
                                                      o.nr_comanda
                                            }`}
                                        >
                                            <div
                                                className="btn-outlined"
                                                style={{ marginTop: '20px' }}
                                            >
                                                Vezi Factura
                                            </div>
                                        </Link>
                                    ) : (
                                        <div
                                            className="btn-outlined"
                                            style={{ marginTop: '20px' }}
                                            onClick={() =>
                                                handleGenerateInvoice(
                                                    o.nr_comanda
                                                )
                                            }
                                        >
                                            Genereaza Factura
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bottomOrderContainer">
                                <p>
                                    Livrare estimata:{' '}
                                    <span>
                                        {o.data_livrare ? o.data_livrare : '-'}
                                    </span>
                                </p>
                            </div>
                            {generateInvoiceOpened && (
                                <GenerareFactura
                                    setGenerateInvoiceOpened={
                                        setGenerateInvoiceOpened
                                    }
                                    detaliiComanda={detaliiComanda}
                                    produseComanda={produseComanda}
                                    nrComanda={o.nr_comanda}
                                />
                            )}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Comenzi
