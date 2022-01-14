// react
import { useState, useEffect } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// router
import { Link, useHistory } from 'react-router-dom'
// components
import GenerareFactura from '../../components/GenerareFactura'
// actions
import { getAllOrders, deleteOrder, filterOrders } from '../../actions/orders'
// services
import OrdersService from '../../services/orders.service'
// date formatter
import moment from 'moment'
import Checkbox from '@mui/material/Checkbox'

function Comenzi({ setData }) {
    const { user: currentUser } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

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

    // sortare
    const [minDate, setMinDate] = useState('2018-07-22')
    const [maxDate, setMaxDate] = useState('2022-01-22')
    const [minPrice, setMinPrice] = useState('0')
    const [maxPrice, setMaxPrice] = useState('9999')
    const [sortDirection, setSortDirection] = useState('desc')
    const [sortBy, setSortBy] = useState('c.data_comanda')
    const [checked, setChecked] = useState(false)
    const [completeOrdersList, setCompleteOrdersList] = useState([])

    // handle methods for inputs
    const handleMinDateChange = (e) => setMinDate(e.target.value)
    const handleMaxDateChange = (e) => setMaxDate(e.target.value)
    const handleMinPriceChange = (e) => setMinPrice(e.target.value)
    const handleMaxPriceChange = (e) => setMaxPrice(e.target.value)
    const handleSortDirection = (e) => setSortDirection(e.target.value)
    const handleSortBy = (e) => setSortBy(e.target.value)
    const handleCheckbox = (e) => setChecked(e.target.checked)

    useEffect(() => {
        dispatch(getAllOrders()).then((data) => {})
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

    const sort = () => {
        dispatch(
            filterOrders(
                minDate,
                maxDate,
                minPrice,
                maxPrice,
                sortDirection,
                sortBy,
                checked
            )
        ).then((data) => {})
    }

    useEffect(() => {
        const fetch = async () => {
            setLoading(false)
            let arr = []
            await Promise.all(
                orders.map((o) => {
                    return OrdersService.getOrderByNumber(o.nr_comanda)
                        .then((data) => {
                            arr.push({
                                ...o,
                                productsList: data.comanda[1],
                            })
                        })
                        .catch((err) => err)
                })
            )
            setCompleteOrdersList(arr)
            setLoading(true)
        }

        if (orders && orders.length > 0) fetch()
    }, [orders])

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

                <div className="center">
                    <div className="center-box">
                        <span>Incepand de la: </span>
                        <input
                            type="date"
                            defaultValue="2018-07-22"
                            max="2018-12-31"
                            onChange={handleMinDateChange}
                        />
                    </div>
                    <div className="center-box">
                        <span>Pana la: </span>
                        <input
                            type="date"
                            defaultValue="2022-01-22"
                            max="2022-01-22"
                            onChange={handleMaxDateChange}
                        />
                    </div>

                    <div className="center-box">
                        <span>Pret minim: (LEI) </span>
                        <input
                            type="text"
                            defaultValue="0"
                            onChange={handleMinPriceChange}
                        />
                    </div>
                    <div className="center-box">
                        <span>Pret maxim: (LEI) </span>
                        <input
                            type="text"
                            defaultValue="9999"
                            onChange={handleMaxPriceChange}
                        />
                    </div>
                    <div className="center-box">
                        <span>Sortati dupa: </span>
                        <select onChange={handleSortBy}>
                            <option value="c.data_comanda">Data</option>
                            <option value="total">Pret total</option>
                        </select>
                    </div>
                    <div className="center-box">
                        <span>Ordine sortare: </span>
                        <select onChange={handleSortDirection}>
                            <option value="desc">Descrescator</option>
                            <option value="asc">Crescator</option>
                        </select>
                    </div>
                    <div className="center-box">
                        <span style={{ marginBottom: '-10px' }}>
                            Cu Factura{' '}
                        </span>
                        <Checkbox
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                            checked={checked}
                            onChange={handleCheckbox}
                        />
                    </div>
                </div>

                <div
                    className="btns-right"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        columnGap: '20px',
                    }}
                >
                    <div
                        className="addNewOrder"
                        style={{ background: '#5150ff', color: '#e1e1e1' }}
                        onClick={sort}
                    >
                        Sortati
                    </div>
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
            </div>
            <div className="ordersInner" style={{ display: 'block' }}>
                {completeOrdersList &&
                    completeOrdersList.length &&
                    completeOrdersList.map((o, index) => (
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
                                    <div
                                        className="text"
                                        style={{ marginLeft: '40px' }}
                                    >
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
                                    <div
                                        className="text"
                                        style={{
                                            marginLeft: '40px',
                                            width: 'calc(100% - 300px)',
                                        }}
                                    >
                                        <h1>Detalii Produse</h1>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                rowGap: '10px',
                                            }}
                                        >
                                            {o.productsList &&
                                                o.productsList.map(
                                                    (m, index) => (
                                                        <p
                                                            style={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                columnGap:
                                                                    '10px',
                                                                marginRight:
                                                                    '20px',
                                                            }}
                                                        >
                                                            {`${m.cantitate}${m.unitate_masura}`}
                                                            <img
                                                                src={
                                                                    m.imagine_produs
                                                                }
                                                                alt={
                                                                    m.nume_produs
                                                                }
                                                                style={{
                                                                    width: '40px',
                                                                }}
                                                            />
                                                            {index !==
                                                                o.productsList
                                                                    .length -
                                                                    1 && ','}
                                                        </p>
                                                    )
                                                )}
                                        </div>
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
