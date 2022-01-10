// react
import { useState, useEffect } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// router
import { useLocation, Link, useHistory } from 'react-router-dom'
// services
import OrdersService from '../services/orders.service'

function EditareComanda() {
    const location = useLocation()
    const history = useHistory()

    const { user: currentUser } = useSelector((state) => state.auth)

    const [orderNumber, setOrderNumber] = useState(null)
    const [detaliiComanda, setDetaliiComanda] = useState(null)
    const [produseComanda, setProduseComanda] = useState([])
    const [totalPriceTabel, setTotalPriceTabel] = useState(0)
    const [removedProducts, setRemovedProducts] = useState([])
    const [confirm, setConfirm] = useState(false)
    const [messageConfirm, setMessageConfirm] = useState('')

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

    const decreaseQty = (q, cod) => {
        if (produseComanda) {
            let list = []
            produseComanda.map((pc) => {
                if (pc.cod_produs === cod) {
                    if (q >= 2) {
                        document.querySelector(
                            `#update-quantity-${cod}`
                        ).value = q - 1
                        list.push({
                            cantitate: pc.cantitate - 1,
                            cod_produs: pc.cod_produs,
                            descriere_produs: pc.descriere_produs,
                            imagine_produs: pc.imagine_produs,
                            pret: pc.pret,
                            nume_categorie: pc.nume_categorie,
                            nume_produs: pc.nume_produs,
                            stoc_initial: pc.stoc_initial + 1,
                            unitate_masura: pc.unitate_masura,
                        })
                    }
                } else list.push(pc)
            })
            setProduseComanda(list)
        }
    }

    const increaseQty = (q, cod) => {
        if (produseComanda) {
            let list = []
            produseComanda.map((pc) => {
                if (pc.cod_produs === cod) {
                    if (q < pc.stoc_initial) {
                        document.querySelector(
                            `#update-quantity-${cod}`
                        ).value = q + 1
                        list.push({
                            cantitate: pc.cantitate + 1,
                            cod_produs: pc.cod_produs,
                            descriere_produs: pc.descriere_produs,
                            imagine_produs: pc.imagine_produs,
                            pret: pc.pret,
                            nume_categorie: pc.nume_categorie,
                            nume_produs: pc.nume_produs,
                            stoc_initial: pc.stoc_initial - 1,
                            unitate_masura: pc.unitate_masura,
                        })
                    }
                } else list.push(pc)
            })
            setProduseComanda(list)
        }
    }

    const handleInputChange = (e, cod) => {
        if (produseComanda) {
            if (e.target.value !== '') {
                let list = []
                produseComanda.map((pc) => {
                    if (pc.cod_produs === cod) {
                        if (
                            e.target.value < pc.stoc_initial &&
                            e.target.value >= 1
                        ) {
                            list.push({
                                cantitate: parseInt(e.target.value),
                                cod_produs: pc.cod_produs,
                                descriere_produs: pc.descriere_produs,
                                imagine_produs: pc.imagine_produs,
                                pret: pc.pret,
                                nume_categorie: pc.nume_categorie,
                                nume_produs: pc.nume_produs,
                                stoc_initial:
                                    pc.stoc_initial -
                                    parseInt(e.target.value) +
                                    pc.cantitate,
                                unitate_masura: pc.unitate_masura,
                            })
                        } else {
                            e.target.value = 1
                        }
                    } else list.push(pc)
                })
                setProduseComanda(list)
            }
        }
    }

    const removeFromList = (cod) => {
        if (produseComanda) {
            setRemovedProducts((removedProducts) => [...removedProducts, cod])
            setProduseComanda(
                produseComanda.filter((pc) => pc.cod_produs !== cod)
            )
        }
    }

    const confirmed = () => {
        if (messageConfirm === 'Sunteti sigur ca nu salvati?') {
            // go back without saving
            history.push(
                `/${
                    currentUser && currentUser.administrator === 'N'
                        ? 'employee'
                        : 'admin'
                }/dashboard/comenzi/`
            )
        } else if (messageConfirm === 'Modificati comanda?') {
            // UPDATE ORDER

            // iteram peste produseComanda si extragem cod_produs
            // pentru fiecare cod_produs, efectuam:
            // -> UPDATE produsecomenzi SET cantitate = ... WHERE cod_produs = ...
            // -> UPDATE produse SET stoc_initial = ... WHERE cod_produs = ...
            // iteram peste removedProducts
            // -> UPDATE produse SET stoc_initial = ... WHERE cod_produs = ...
            // -> DELETE FROM produsecomenzi WHERE cod_produs = ...
            if (produseComanda) {
                OrdersService.updateOrder(
                    produseComanda,
                    removedProducts,
                    orderNumber
                )
                    .then((data) => {
                        console.log(data)
                        history.push(
                            `/${
                                currentUser && currentUser.administrator === 'N'
                                    ? 'employee'
                                    : 'admin'
                            }/dashboard/comenzi/`
                        )
                    })
                    .catch((err) => console.log(err))
            }
        }
        setConfirm(false)
    }

    const handleCancelUpdating = () => {
        setMessageConfirm('Sunteti sigur ca nu salvati?')
        setConfirm(true)
    }

    const handleSaveUpdatedOrder = () => {
        setMessageConfirm('Modificati comanda?')
        setConfirm(true)
    }

    return (
        <div className="editareComanda">
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
                            <div className="row" key={pc.cod_produs}>
                                <div className="col image">
                                    <img
                                        src={pc.imagine_produs}
                                        alt={pc.nume_produs}
                                    />
                                    <div className="desc">
                                        <p>{pc.nume_produs}</p>
                                        <p>{pc.descriere_produs}</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="quantityContainer">
                                        <div
                                            onClick={() =>
                                                decreaseQty(
                                                    pc.cantitate,
                                                    pc.cod_produs
                                                )
                                            }
                                        >
                                            -
                                        </div>
                                        <input
                                            type="text"
                                            id={`update-quantity-${pc.cod_produs}`}
                                            defaultValue={pc.cantitate}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    pc.cod_produs
                                                )
                                            }
                                        />
                                        <div
                                            onClick={() =>
                                                increaseQty(
                                                    pc.cantitate,
                                                    pc.cod_produs
                                                )
                                            }
                                        >
                                            +
                                        </div>
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
                                    <p
                                        className="remove"
                                        onClick={() =>
                                            removeFromList(pc.cod_produs)
                                        }
                                    >
                                        X
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="bottomEditareComanda">
                    <div
                        className="anulareEditareComandaBtn"
                        onClick={handleCancelUpdating}
                    >
                        Anulati
                    </div>
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
                        <div
                            className="editareComandaBtn"
                            onClick={handleSaveUpdatedOrder}
                        >
                            Salvati
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditareComanda
