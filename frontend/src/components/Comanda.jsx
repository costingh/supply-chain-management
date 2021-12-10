import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Comanda() {
    const location = useLocation()
    const [orderNumber, setOrderNumber] = useState(null)

    useEffect(() => {
        setOrderNumber(location.pathname.split('/')[5])
    }, [])

    const ellipsis = (text) => {
        return text.length > 17 ? text.substring(0, 17 - 3) + '...' : text
    }

    return (
        <div className="ordersContainer">
            <div className="nav">
                <h1>Comanda #{orderNumber}</h1>
                <div className="addNewOrder">Editati</div>
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
                                <p className="date">13.08.2021, 11:57</p>
                                <p className="desc">Comanda plasata</p>
                                <p className="suppName">Doraly</p>
                            </div>
                            <div className="historyTableRow">
                                <p className="date">13.08.2021, 11:57</p>
                                <p className="desc">Preluata de curier</p>
                                <p className="suppName">Doraly</p>
                            </div>
                            <div
                                className="historyTableRow"
                                style={{ background: '#4552613a' }}
                            >
                                <p className="date">13.08.2021, 11:57</p>
                                <p className="desc">Comanda livrata</p>
                                <p className="suppName">Doraly</p>
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
                                <div>
                                    <div className="trProductName">
                                        <img
                                            src="/images/banane.png"
                                            alt=""
                                            style={{ width: '50px' }}
                                        />
                                        <p>Banane</p>
                                    </div>
                                    <div>2.12 kg</div>
                                    <div>{ellipsis('Banane din Ecuador')}</div>
                                    <div>{ellipsis('Fructe si Legume')}</div>
                                    <div style={{ width: '15%' }}>
                                        15.07{' '}
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
                            </div>
                            <div className="tf">
                                <div>Produs</div>

                                <div>
                                    Total{' '}
                                    <span>
                                        1,800.00{' '}
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
                                    <p>12/12/2020</p>
                                </div>
                                <div className="data">
                                    <span>data livrare</span>
                                    <p>12/12/2020</p>
                                </div>
                            </div>
                            <div className="listaProduseDePeComanda">
                                <div className="produsLista">
                                    <div className="numeProdus">
                                        1. Buty Nike
                                    </div>
                                    <div className="numbers">
                                        <div className="quantity">1x</div>
                                        <div className="price">
                                            99.00 <span>RON</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="produsLista">
                                    <div className="numeProdus">
                                        1. Buty Nike
                                    </div>
                                    <div className="numbers">
                                        <div className="quantity">1x</div>
                                        <div className="price">
                                            99.00 <span>RON</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="produsLista">
                                    <div className="numeProdus">
                                        1. Buty Nike
                                    </div>
                                    <div className="numbers">
                                        <div className="quantity">1x</div>
                                        <div className="price">
                                            99.00 <span>RON</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="produsLista">
                                    <div className="numeProdus">
                                        1. Buty Nike
                                    </div>
                                    <div className="numbers">
                                        <div className="quantity">1x</div>
                                        <div className="price">
                                            99.00 <span>RON</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="produsLista">
                                    <div className="numeProdus">
                                        1. Buty Nike
                                    </div>
                                    <div className="numbers">
                                        <div className="quantity">1x</div>
                                        <div className="price">
                                            99.00 <span>RON</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="produsLista">
                                    <div className="numeProdus">
                                        1. Buty Nike
                                    </div>
                                    <div className="numbers">
                                        <div className="quantity">1x</div>
                                        <div className="price">
                                            99.00 <span>RON</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="separator"></div>
                                <div className="pretContainer">
                                    <p className="heading">Pret</p>
                                    <p className="price">
                                        298.00 <span>RON</span>
                                    </p>
                                </div>
                                <div className="pretContainer">
                                    <p className="heading">Pret</p>
                                    <p className="price">
                                        298.00 <span>RON</span>
                                    </p>
                                </div>
                                <div
                                    className="pretContainer"
                                    style={{ background: '#4552613a' }}
                                >
                                    <p className="headingBold">Total</p>
                                    <p className="priceBold">
                                        298.00 <span>RON</span>
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
                                    <p>Vezi Factura</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
