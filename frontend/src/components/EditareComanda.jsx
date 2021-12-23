// react
import { useState, useEffect } from 'react'

// router
import { useLocation, Link } from 'react-router-dom'

// services
import OrdersService from '../services/orders.service'

function EditareComanda() {
    const location = useLocation()
    const [orderNumber, setOrderNumber] = useState(null)
    const [detaliiComanda, setDetaliiComanda] = useState(null)
    const [produseComanda, setProduseComanda] = useState([])
    const [totalPriceTabel, setTotalPriceTabel] = useState(0)

    useEffect(() => {
        setOrderNumber(location.pathname.split('/')[6])
    }, [])

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

    return (
        <div className="editareComanda">
            <div className="editareComandaFlexInner">
                <div className="navEditareComanda">
                    <h1>Comanda #{orderNumber}</h1>
                    <p>
                        {produseComanda && produseComanda.length === 1
                            ? '1 Produs'
                            : produseComanda.length + ' Produse'}
                    </p>
                </div>
                <div className="innerEditareComanda">
                    <div className="heading">
                        <div className="col">Produs</div>
                        <div className="col">Cantitate</div>
                        <div className="col">Furnizor</div>
                        <div className="col">Pret</div>
                        <div className="col"></div>
                    </div>
                    {produseComanda &&
                        produseComanda.map((pc) => (
                            <div className="row">
                                <div className="col">
                                    <img src="/images/banane.png" alt="" />
                                    <div className="desc">
                                        <p>{pc.nume_produs}</p>
                                        <p>{pc.descriere_produs}</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="quantityContainer">
                                        <div>-</div>
                                        <input
                                            type="text"
                                            defaultValue={pc.cantitate}
                                        />
                                        <div>+</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <p>{detaliiComanda.nume_furnizor}</p>
                                </div>
                                <div className="col">
                                    <p className="pret">
                                        {(
                                            Math.round(
                                                pc.pret * pc.cantitate * 100
                                            ) / 100
                                        ).toFixed(2)}{' '}
                                        LEI
                                    </p>
                                </div>
                                <div className="col">
                                    <p className="remove">X</p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="bottomEditareComanda">
                    <div className="anulareEditareComandaBtn">Anulati</div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '90px',
                        }}
                    >
                        <p>
                            {totalPriceTabel}
                            <span> LEI Total</span>
                        </p>
                        <div className="editareComandaBtn">Salvati</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditareComanda
