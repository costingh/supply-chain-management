// React
import { useState, useRef, useEffect } from 'react'

// Material UI
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

// actions
import { getAllCategories } from '../actions/categories'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} from '../actions/products'

// moment.js for date formatting
import moment from 'moment'
import Alert from './Alert'

function ListaProduseInStoc() {
    const { categories } = useSelector((state) => state.categories)
    const { products } = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const [categoriesListSelect, setCategoriesListSelect] = useState([])
    const [productsListSelect, setProductsListSelect] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchCategory, setSearchCategory] = useState('')
    const [searchProduct, setSearchProduct] = useState('')
    const [data, setData] = useState(null)
    const [height, setHeight] = useState('30px')
    const [opened, setOpened] = useState(false)
    const [ordersList, setOrdersList] = useState([])
    const [orderPrice, setOrderPrice] = useState(0)

    const productNameSearchRef = useRef()
    const categoryNameSearchRef = useRef()
    // set Redux state (state.products)
    useEffect(() => {
        dispatch(getAllProducts()).then((data) => {})
    }, [])

    // every time the state.products changes, set current products list and the select options
    useEffect(() => {
        if (products) {
            let list = []
            products.map((prod) => {
                list.push({
                    label: prod.nume_produs,
                    descriere: prod.descriere_produs,
                })
            })
            setProductsListSelect(list)
            setFilteredProducts(products)
        }
    }, [products])

    // if state.categories changes, also change the category select options
    useEffect(() => {
        if (!categories) dispatch(getAllCategories()).then((data) => {})
        else {
            let list = []
            categories.map((cat) => {
                list.push({
                    label: cat.nume_categorie,
                    descriere: cat.descriere_categorie,
                })
            })
            setCategoriesListSelect(list)
        }
    }, [categories])

    // if data is not null, open popup (in data we receive confirmation after successfull/failed request)
    useEffect(() => {
        if (data) {
            document.querySelector('.overlay').classList.add('open')
        }
    }, [data])

    const closeAlert = () => {
        document.querySelector('.overlay').classList.remove('open')
    }

    /* const handleEditProduct = (product) => {}

    const handleDeleteProduct = (product) => {
        dispatch(deleteProduct(product.nume_produs)).then((data) => {
            setData(data)
        })
    } */

    const handleCategoryNameSearch = (e) => setSearchCategory(e.target.value)
    const handleProductNameSearch = (e) => setSearchProduct(e.target.value)

    useEffect(() => {
        search(searchProduct, searchCategory)
    }, [searchProduct, searchCategory, products])

    useEffect(() => {
        caculateTotalPrice()
    }, [ordersList])

    const handleSearch = () => {
        search(
            productNameSearchRef.current.value,
            categoryNameSearchRef.current.value
        )
    }

    const search = (productName, categoryName) => {
        if (productName && categoryName) {
            const productsFilteredByName = []
            products.map((p) => {
                if (
                    productName &&
                    p.nume_produs
                        .toLowerCase()
                        .includes(productName.toLowerCase()) &&
                    categoryName &&
                    p.categorie
                        .toLowerCase()
                        .includes(categoryName.toLowerCase())
                )
                    productsFilteredByName.push(p)
            })

            setFilteredProducts(productsFilteredByName)
        } else if (productName && categoryName === '') {
            const productsFilteredByName = []
            products.map((p) => {
                if (
                    productName &&
                    p.nume_produs
                        .toLowerCase()
                        .includes(productName.toLowerCase())
                )
                    productsFilteredByName.push(p)
            })

            setFilteredProducts(productsFilteredByName)
        } else if (productName === '' && categoryName) {
            const productsFilteredByName = []
            products.map((p) => {
                if (
                    categoryName &&
                    p.categorie
                        .toLowerCase()
                        .includes(categoryName.toLowerCase())
                )
                    productsFilteredByName.push(p)
            })

            setFilteredProducts(productsFilteredByName)
        } else setFilteredProducts(products)
    }

    const handleOpenSlide = () => {
        if (!opened) {
            setOpened(true)
            setHeight('500px')
        } else {
            setHeight('30px')
            setOpened(false)
        }
    }

    const handleAddOnOrderList = (e, product) => {
        const cantitate = document.querySelector(
            `#cantitate-${product.cod_produs}`
        ).value

        if (parseInt(cantitate) >= 1) {
            if (
                !ordersList.filter((e) => e.cod_produs === product.cod_produs)
                    .length > 0
            ) {
                product.cantitate = parseInt(cantitate)
                setOrdersList((ordersList) => [...ordersList, product])
                if (e.target.children.length === 0) {
                    e.target.parentNode.classList.add('disabled')
                } else e.target.classList.add('disabled')
            } else alert('Produsul este deja in lista!')
        } else alert('Cantitatea trebuie sa fie pozitiva!')
    }

    const increaseQuantity = (cod_produs) => {
        const cantitate = document.querySelector(
            `#cantitate-${cod_produs}`
        ).value
        const arr = document.querySelectorAll(`#cantitate-${cod_produs}`)
        arr[0].value = parseInt(cantitate) + 1
        if (arr.length === 2) {
            arr[1].value = parseInt(cantitate) + 1
            let list = []
            ordersList.map((o) => {
                if (o.cod_produs !== cod_produs) list.push(o)
                else
                    list.push({
                        cantitate: o.cantitate + 1,
                        categorie: o.categorie,
                        cod_produs: o.cod_produs,
                        data_creare: o.data_creare,
                        descriere_categorie: o.descriere_categorie,
                        descriere_produs: o.descriere_produs,
                        id_categorie: o.id_categorie,
                        imagine_produs: o.imagine_produs,
                        nume_produs: o.nume_produs,
                        pret: o.pret,
                        stoc_initial: o.stoc_initial,
                        unitate_masura: o.unitate_masura,
                    })
            })
            setOrdersList(list)
        }
    }

    const decreaseQuantity = (cod_produs) => {
        const cantitate = document.querySelector(
            `#cantitate-${cod_produs}`
        ).value
        if (parseInt(cantitate) >= 1) {
            const arr = document.querySelectorAll(`#cantitate-${cod_produs}`)
            arr[0].value = parseInt(cantitate) - 1
            if (arr.length === 2) {
                arr[1].value = parseInt(cantitate) - 1
                let list = []
                ordersList.map((o) => {
                    if (o.cod_produs !== cod_produs) list.push(o)
                    else
                        list.push({
                            cantitate: o.cantitate - 1,
                            categorie: o.categorie,
                            cod_produs: o.cod_produs,
                            data_creare: o.data_creare,
                            descriere_categorie: o.descriere_categorie,
                            descriere_produs: o.descriere_produs,
                            id_categorie: o.id_categorie,
                            imagine_produs: o.imagine_produs,
                            nume_produs: o.nume_produs,
                            pret: o.pret,
                            stoc_initial: o.stoc_initial,
                            unitate_masura: o.unitate_masura,
                        })
                })
                setOrdersList(list)
            }
        } else if (parseInt(cantitate) === 0) {
            const list = ordersList.filter(
                (order) => order.cod_produs !== cod_produs
            )
            setOrdersList(list)
            document
                .querySelector(`.textRight #cantitate-${cod_produs}`)
                .parentElement.parentElement.parentElement.querySelector(
                    '.comanda'
                )
                .classList.remove('disabled')
        }
    }

    const handleChange = (e, product) => {
        if (e.target.value === '') e.target.value = 0
        const arr = document.querySelectorAll(
            `#cantitate-${product.cod_produs}`
        )
        arr[0].value = parseInt(e.target.value)
        if (arr.length === 2) {
            arr[1].value = parseInt(e.target.value)

            let list = []
            ordersList.map((order) => {
                list.push({
                    cantitate: e.target.value,
                    categorie: order.categorie,
                    cod_produs: order.cod_produs,
                    data_creare: order.data_creare,
                    descriere_categorie: order.descriere_categorie,
                    descriere_produs: order.descriere_produs,
                    id_categorie: order.id_categorie,
                    imagine_produs: order.imagine_produs,
                    nume_produs: order.nume_produs,
                    pret: order.pret,
                    stoc_initial: order.stoc_initial,
                    unitate_masura: order.unitate_masura,
                })
            })
            setOrdersList(list)
        }
    }

    const handleClearOrder = () => {
        const btns = document.querySelectorAll('.comanda.disabled')
        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove('disabled')
        }
        let list = []

        ordersList.map((order) => {
            list.push({
                cantitate: 0,
                categorie: order.categorie,
                cod_produs: order.cod_produs,
                data_creare: order.data_creare,
                descriere_categorie: order.descriere_categorie,
                descriere_produs: order.descriere_produs,
                id_categorie: order.id_categorie,
                imagine_produs: order.imagine_produs,
                nume_produs: order.nume_produs,
                pret: order.pret,
                stoc_initial: order.stoc_initial,
                unitate_masura: order.unitate_masura,
            })
        })
        setOrdersList([])

        list.map((item) => {
            const arr = document.querySelectorAll(
                `#cantitate-${item.cod_produs}`
            )
            arr[0].value = 0
            if (arr.length === 2) arr[1].value = 0
        })
    }

    const caculateTotalPrice = () => {
        let price = 0
        ordersList.map((o) => (price += o.cantitate * o.pret))
        setOrderPrice((Math.round(price * 100) / 100).toFixed(2))
    }

    return (
        <div className="produse">
            <Alert data={data} closeAlert={closeAlert} redirect={'no'} />
            <div className="nav">
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Autocomplete
                        freeSolo
                        disableClearable
                        id="categorie-produse"
                        options={categoriesListSelect}
                        style={{ width: '25%' }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Categorie"
                                onChange={handleCategoryNameSearch}
                                inputRef={categoryNameSearchRef}
                            />
                        )}
                    />
                    <div
                        className="divider"
                        style={{
                            height: '100%',
                            width: '1px',
                            background: '#455261',
                        }}
                    ></div>
                    <Autocomplete
                        freeSolo
                        disableClearable
                        id="denumire-produse"
                        options={productsListSelect}
                        style={{ width: '60%' }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Produse"
                                onChange={handleProductNameSearch}
                                inputRef={productNameSearchRef}
                            />
                        )}
                    />
                    <div className="submit" onClick={handleSearch}>
                        <p>Cautati</p>
                    </div>
                </Box>
            </div>
            <div className="inner">
                <div className="comandaSlide" style={{ height: `${height}` }}>
                    <div className="flexCont">
                        <h3>
                            Produse Comandate <span>{ordersList.length}</span>
                        </h3>
                        {opened ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                onClick={handleOpenSlide}
                            >
                                <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                onClick={handleOpenSlide}
                            >
                                <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
                            </svg>
                        )}
                    </div>
                    <div className="innerOrderCont">
                        <div className="orderListItemHeader">
                            <p>Denumire Produs</p>
                            <p style={{ textAlign: 'center' }}>Cantitate</p>
                            <p style={{ textAlign: 'right' }}>Pret/Unitate</p>
                        </div>
                        <div className="orderListContainer">
                            {ordersList.map((item) => (
                                <div
                                    className="orderListItem"
                                    key={item.cod_produs}
                                >
                                    <p>{item.nume_produs}</p>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.cod_produs
                                                )
                                            }
                                            className="addAndRemoveProduct"
                                        >
                                            <path d="M0 10h24v4h-24z" />
                                        </svg>
                                        <input
                                            type="text"
                                            defaultValue={item.cantitate}
                                            id={`cantitate-${item.cod_produs}`}
                                            style={{
                                                width: '30px',
                                                textAlign: 'center',
                                                appearance: 'none',
                                                background: 'transparent',
                                                border: '1px solid #8491a2',
                                                outline: 'none',
                                                borderRadius: '5px',
                                            }}
                                            onChange={(e) =>
                                                handleChange(e, item)
                                            }
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.cod_produs
                                                )
                                            }
                                            className="addAndRemoveProduct"
                                        >
                                            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                                        </svg>
                                    </div>
                                    <p style={{ textAlign: 'right' }}>
                                        {item.pret}/{item.unitate_masura}{' '}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="orderTotalContainer">
                            <p>Total</p>
                            <p>{orderPrice} RON</p>
                        </div>
                        <div
                            className="buttonRemoveOrder"
                            onClick={handleClearOrder}
                        >
                            Goliti
                        </div>
                        <div className="buttonPlaceOrder">Comandati</div>
                    </div>
                </div>
                {filteredProducts &&
                    filteredProducts.map((product) => (
                        <div className="produs" key={product.cod_produs}>
                            <div className="image">
                                {!product.imagine_produs ? (
                                    <svg
                                        width="24"
                                        height="24"
                                        style={{
                                            transform: 'scale(3)',
                                            fill: '#8491a2',
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    >
                                        <path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" />
                                    </svg>
                                ) : (
                                    <img
                                        src={product.imagine_produs}
                                        alt={product.nume_produs}
                                    />
                                )}
                            </div>
                            <div className="text">
                                <div className="textLeft">
                                    <div>
                                        <p className="numeProdus">
                                            {product.nume_produs}
                                        </p>

                                        <p className="categorie">
                                            {product.categorie} -{' '}
                                            <span
                                                style={{
                                                    color: 'rgb(72, 155, 72)',
                                                }}
                                            >
                                                {product.nume_furnizor}
                                            </span>
                                        </p>
                                        <p className="descriere">
                                            {product.descriere_categorie}
                                        </p>
                                        <p className="descriereProd">
                                            {product.descriere_produs}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="dataCreare">
                                            {moment(product.data_creare)
                                                .add(10, 'days')
                                                .calendar()}
                                        </p>
                                    </div>
                                </div>
                                <div className="textRight">
                                    <div>
                                        <p className="pret">
                                            {product.pret} Lei
                                        </p>
                                        <p className="stoc">
                                            Stoc: {product.stoc_initial}{' '}
                                            {product.unitate_masura}
                                        </p>
                                        <div className="orderQuantity">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                onClick={() =>
                                                    decreaseQuantity(
                                                        product.cod_produs
                                                    )
                                                }
                                            >
                                                <path d="M0 10h24v4h-24z" />
                                            </svg>
                                            <input
                                                type="text"
                                                defaultValue="0"
                                                id={`cantitate-${product.cod_produs}`}
                                                onChange={(e) =>
                                                    handleChange(e, product)
                                                }
                                            />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                onClick={() =>
                                                    increaseQuantity(
                                                        product.cod_produs
                                                    )
                                                }
                                            >
                                                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="buttonsContainer">
                                        <div
                                            className="comanda"
                                            onClick={(e) =>
                                                handleAddOnOrderList(e, product)
                                            }
                                        >
                                            <img
                                                src="/images/factura.svg"
                                                alt=""
                                            />
                                            {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M10.975 8l.025-.5c0-.517-.067-1.018-.181-1.5h5.993l-.564 2h-5.273zm-2.475 10c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm11.305-15l-3.432 12h-10.428l-.455-1.083c-.323.049-.653.083-.99.083-.407 0-.805-.042-1.191-.114l1.306 3.114h13.239l3.474-12h1.929l.743-2h-4.195zm-6.305 15c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm-4.5-10.5c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z" />
                                            </svg> */}
                                        </div>
                                        <div className="factura">
                                            <img
                                                src="/images/comanda.svg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                {/*  {filteredProducts.map((product) => (
                    <div className="produs" key={product.cod_produs}>
                        <div className="image">
                            <img src={product.imagine_produs} alt="banane" />
                        </div>
                        <div className="text">
                            <p className="pret">{product.pret} Lei</p>
                            <p className="numeProdus">{product.nume_produs}</p>
                            <div className="categStoc">
                                <p className="stoc">In stoc</p>
                                <p className="categorie">
                                    {product.nume_categorie}
                                </p>
                            </div>
                            <p className="descriere">
                                {product.descriere_categorie}
                            </p>
                            <p>Data Creare: {product.data_creare}</p>
                            <div className="productBtns">
                                <div className="factura">
                                    <img src="/images/factura.svg" alt="" />
                                </div>
                                <div className="comanda">
                                    <img src="/images/comanda.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    )
}

export default ListaProduseInStoc
