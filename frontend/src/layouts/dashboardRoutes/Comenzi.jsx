// react
import { useState, useEffect } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// router
import { Link, useHistory } from 'react-router-dom'
// components
import GenerareFactura from '../../components/GenerareFactura'
// actions
import { getAllOrders, deleteOrder } from '../../actions/orders'
// services
import OrdersService from '../../services/orders.service'
// date formatter
import moment from 'moment'

function Comenzi({ setData }) {
    const { user: currentUser } = useSelector((state) => state.auth)

    const history = useHistory()

    const { orders } = useSelector((state) => state.orders)
    const [loading, setLoading] = useState(false)
    const [generateInvoiceOpened, setGenerateInvoiceOpened] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [messageConfirm, setMessageConfirm] = useState('')
    const [nrComanda, setNrComanda] = useState(null)
    const [invoiceForOrder, setInvoiceForOrder] = useState(null)
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
        setInvoiceForOrder(nr_comanda)
        if (nr_comanda > 0)
            OrdersService.getOrderByNumber(nr_comanda)
                .then((resp) => {
                    setDetaliiComanda(resp.comanda[0][0])
                    setProduseComanda(resp.comanda[1])
                })
                .catch((err) => console.log(err))
    }

    const handleOrderDelete = (nr) => {
        setMessageConfirm('Sunteti sigur ca doriti sa anulati comanda?')
        setConfirm(true)
        setNrComanda(nr)
    }

    const confirmed = () => {
        if (messageConfirm === 'Sunteti sigur ca doriti sa anulati comanda?') {
            // delete
            if (nrComanda)
                dispatch(deleteOrder(nrComanda)).then((data) => {
                    setData(data)
                })
        } else if (
            messageConfirm === 'Sunteti sigur ca doriti sa modificati comanda?'
        ) {
            // update
            history.push(
                `/${
                    currentUser && currentUser.administrator === 'N'
                        ? 'employee'
                        : 'admin'
                }/dashboard/comenzi/comanda/editati/${nrComanda}`
            )
        }

        setConfirm(false)
    }

    const handleOrderUpdate = (nr) => {
        setMessageConfirm('Sunteti sigur ca doriti sa modificati comanda?')
        setConfirm(true)
        setNrComanda(nr)
    }

    return (
        <div className="ordersContainer">
            {confirm && (
                <div className="confirmPanel">
                    <div>
                        <p>{messageConfirm}</p>
                        <div>
                            <div onClick={() => setConfirm(false)}>Nu</div>
                            <div onClick={confirmed}>Da</div>
                        </div>
                    </div>
                </div>
            )}
            <div className="nav">
                <h1>
                    {orders && orders.length === 1
                        ? '1 Comanda'
                        : orders && orders.length + ' Comenzi'}
                </h1>
                <Link
                    to={`/${
                        currentUser && currentUser.administrator === 'N'
                            ? 'employee'
                            : 'admin'
                    }/dashboard/produse`}
                >
                    <div className="addNewOrder">Plasati Comanda</div>
                </Link>
            </div>
            <div className="ordersInner" style={{ display: 'block' }}>
                {orders &&
                    orders.length &&
                    orders.map((o, index) => (
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
                                            width="24"
                                            height="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                        >
                                            <path d="M13.403 24h-13.403v-22h3c1.231 0 2.181-1.084 3-2h8c.821.916 1.772 2 3 2h3v9.15c-.485-.098-.987-.15-1.5-.15l-.5.016v-7.016h-4l-2 2h-3.897l-2.103-2h-4v18h9.866c.397.751.919 1.427 1.537 2zm5.097-11c3.035 0 5.5 2.464 5.5 5.5s-2.465 5.5-5.5 5.5c-3.036 0-5.5-2.464-5.5-5.5s2.464-5.5 5.5-5.5zm0 2c1.931 0 3.5 1.568 3.5 3.5s-1.569 3.5-3.5 3.5c-1.932 0-3.5-1.568-3.5-3.5s1.568-3.5 3.5-3.5zm2.5 4h-3v-3h1v2h2v1zm-15.151-4.052l-1.049-.984-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.385zm6.151 1.052h-2v-1h2v1zm2-2h-4v-1h4v1zm-8.151-4.025l-1.049-.983-.8.823 1.864 1.776 3.136-3.192-.815-.808-2.336 2.384zm8.151 1.025h-4v-1h4v1zm0-2h-4v-1h4v1zm-5-6c0 .552.449 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.551 0-1 .448-1 1z" />
                                        </svg>
                                        {/* <svg
                                            width="24"
                                            height="24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                        >
                                            <path d="M3 18h-2c-.552 0-1-.448-1-1v-2h15v-9h4.667c1.117 0 1.6.576 1.936 1.107.594.94 1.536 2.432 2.109 3.378.188.312.288.67.288 1.035v4.48c0 1.121-.728 2-2 2h-1c0 1.656-1.344 3-3 3s-3-1.344-3-3h-6c0 1.656-1.344 3-3 3s-3-1.344-3-3zm3-1.2c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm12 0c.662 0 1.2.538 1.2 1.2 0 .662-.538 1.2-1.2 1.2-.662 0-1.2-.538-1.2-1.2 0-.662.538-1.2 1.2-1.2zm-4-2.8h-14v-10c0-.552.448-1 1-1h12c.552 0 1 .448 1 1v10zm3-6v3h4.715l-1.427-2.496c-.178-.312-.509-.504-.868-.504h-2.42z" />
                                        </svg> */}
                                        {/* <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm-19 5.78c0-.431.349-.78.78-.78h.428v1.125h-1.208v-.345zm0 .764h1.208v.968h-1.208v-.968zm0 1.388h1.208v1.068h-.428c-.431 0-.78-.349-.78-.78v-.288zm3 5.068h-3v-1h3v1zm1-4.78c0 .431-.349.78-.78.78h-.429v-1.068h1.209v.288zm0-.708h-1.209v-.968h1.209v.968zm0-1.387h-1.629v2.875h-.743v-4h1.592c.431 0 .78.349.78.78v.345zm4 6.875h-3v-1h3v1zm1-6.5c0-1.381 1.119-2.5 2.5-2.5.484 0 .937.138 1.32.377-.531.552-.857 1.3-.857 2.123 0 .824.327 1.571.857 2.123-.383.239-.836.377-1.32.377-1.381 0-2.5-1.119-2.5-2.5zm4 6.5h-3v-1h3v1zm5 0h-3v-1h3v1zm-2.5-4c-1.38 0-2.5-1.119-2.5-2.5s1.12-2.5 2.5-2.5c1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5z" />
                                        </svg> */}
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
                                            - {o.oras}, {o.judet}
                                        </p>
                                        <p>
                                            - Strada {o.strada}, nr.{o.numar}
                                        </p>
                                        <p>- Nr. Telefon: {o.nr_telefon}</p>
                                    </div>
                                </div>
                                <div className="middleRight">
                                    <Link
                                        to={`/${
                                            currentUser &&
                                            currentUser.administrator === 'N'
                                                ? 'employee'
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
                                                    ? 'employee'
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
                                        {o.data_livrare
                                            ? moment(o.data_livrare).format(
                                                  'll'
                                              )
                                            : '-'}
                                    </span>
                                </p>

                                {!o.nr_factura ? (
                                    <div style={{ display: 'flex' }}>
                                        <div
                                            className="btn-primary upd"
                                            style={{ marginRight: '15px' }}
                                            onClick={() =>
                                                handleOrderUpdate(o.nr_comanda)
                                            }
                                        >
                                            Modificati
                                        </div>
                                        <div
                                            className="btn-primary del"
                                            onClick={() =>
                                                handleOrderDelete(o.nr_comanda)
                                            }
                                        >
                                            Stergeti
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex' }}>
                                        <div
                                            className="btn-primary upd disabled"
                                            style={{ marginRight: '15px' }}
                                        >
                                            Modificati
                                        </div>
                                        <div className="btn-primary del disabled">
                                            Stergeti
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                {generateInvoiceOpened && (
                    <GenerareFactura
                        setGenerateInvoiceOpened={setGenerateInvoiceOpened}
                        detaliiComanda={detaliiComanda}
                        produseComanda={produseComanda}
                        nrComanda={invoiceForOrder}
                    />
                )}
            </div>
        </div>
    )
}

export default Comenzi
