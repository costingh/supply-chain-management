// react
import { useState, useEffect } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// actions
import { generateInvoice } from '../actions/invoices'
// moment js for date formatting
import moment from 'moment'
import 'moment/locale/ro'
moment.locale('ro')

function GenerareFactura({
    setGenerateInvoiceOpened,
    detaliiComanda,
    produseComanda,
    nrComanda,
}) {
    const [loading, setLoading] = useState(false)
    const [finished, setFinished] = useState(false)
    const [data, setData] = useState(null)
    const [totalPriceTabel, setTotalPriceTabel] = useState(0)

    const dispatch = useDispatch()

    const generareFactura = () => {
        setLoading(true)
        dispatch(generateInvoice(nrComanda)).then((data) => {
            setTimeout(() => {
                setLoading(false)
                setData(data)
                setFinished(true)
            }, 2000)
        })
    }

    useEffect(() => {
        let pret = 0

        if (produseComanda.length > 0) {
            produseComanda.map((pc) => {
                pret += pc.cantitate * pc.pret
            })
        }
        setTotalPriceTabel((Math.round(pret * 100) / 100).toFixed(2))
    }, [produseComanda])

    const handleClose = () => {
        //setGenerateInvoiceOpened(false)
        window.location.reload()
    }

    return (
        <div className="genereazaFacturaContainer">
            {loading ? (
                <div>
                    <h1>Generare Factura ...</h1>
                    <img
                        src="/images/generatingOrderLoader.gif"
                        alt="Loading..."
                        style={{ width: '100%' }}
                    />
                </div>
            ) : finished ? (
                <div className="genereazaFacturaContainerTop">
                    <div
                        className="invoiceContainer respMsg"
                        style={{ padding: '0px' }}
                    >
                        <div className="icon" style={{ width: '100%' }}>
                            {data && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="224"
                                    height="224"
                                    viewBox="0 0 24 24"
                                    fill={
                                        data && data.status === 200
                                            ? '#4bb543'
                                            : '#f2af17'
                                    }
                                >
                                    <path
                                        d={
                                            data && data.status === 200
                                                ? 'M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z'
                                                : 'M16.143 2l5.857 5.858v8.284l-5.857 5.858h-8.286l-5.857-5.858v-8.284l5.857-5.858h8.286zm.828-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-6.471 6h3l-1 8h-1l-1-8zm1.5 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z'
                                        }
                                    />
                                </svg>
                            )}
                            <h1 className="responseMessage">
                                {data && data.status === 200
                                    ? 'Factura generata cu succes!'
                                    : 'Factura nu a putut fi generata'}
                            </h1>
                        </div>

                        <div onClick={handleClose} className="button">
                            Gata
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div
                        className="genereazaFacturaContainerTop"
                        style={{ margin: '0px' }}
                    >
                        <div
                            className="invoiceContainer"
                            style={{ padding: '0px' }}
                        >
                            <div
                                className="title"
                                style={{ lineHeight: '15px' }}
                            >
                                <h1>Generati factura</h1> <br />{' '}
                                {detaliiComanda?.nume_furnizor}
                            </div>
                            <div className="dateFacturare">
                                <div className="data">
                                    <span>data comanda</span>

                                    <p style={{ textAlign: 'center' }}>
                                        {detaliiComanda &&
                                        detaliiComanda?.data_comanda
                                            ? moment(
                                                  detaliiComanda?.data_comanda
                                              ).format('l')
                                            : '-'}
                                    </p>
                                </div>
                                <div className="data">
                                    <span>data livrare</span>
                                    <p style={{ textAlign: 'center' }}>
                                        {detaliiComanda &&
                                        detaliiComanda?.data_livrare
                                            ? moment(
                                                  detaliiComanda?.data_livrare
                                              ).format('l')
                                            : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="genereazaFacturaContainerDetalii">
                        <div
                            className="invoiceContainer"
                            style={{ padding: '0px' }}
                        >
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
                                <div
                                    className="pretContainer"
                                    style={{ background: '#4552613a' }}
                                >
                                    <p className="headingBold">Total</p>
                                    <p className="priceBold">
                                        {totalPriceTabel} <span>RON</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="genereazaFacturaContainerBtns">
                        <div onClick={() => setGenerateInvoiceOpened(false)}>
                            Anulati
                        </div>
                        <div onClick={generareFactura}>Generare</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GenerareFactura
