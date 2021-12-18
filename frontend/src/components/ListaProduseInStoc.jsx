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
        if (parseInt(cantitate) > 1) {
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
        } else if (parseInt(cantitate) === 1) {
            const list = ordersList.filter(
                (order) => order.cod_produs !== cod_produs
            )
            setOrdersList(list)
            document
                .querySelector(`#cantitate-${cod_produs}`)
                .parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(
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
                                            {product.categorie}
                                        </p>
                                        <p className="descriere">
                                            {product.descriere_categorie}
                                        </p>
                                        <p className="descriereProd">
                                            {product.descriere_produs}
                                        </p>
                                    </div>
                                    <div>
                                        {/* <div className="actions">
                                            <div
                                                className="edit"
                                                onClick={() =>
                                                    handleEditProduct(product)
                                                }
                                            >
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                >
                                                    <path d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126" />
                                                </svg>
                                                <p>Editati</p>
                                            </div>
                                            <div
                                                className="delete"
                                                onClick={() =>
                                                    handleDeleteProduct(product)
                                                }
                                            >
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                >
                                                    <path d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z" />
                                                </svg>
                                                <p>Stergeti</p>
                                            </div>
                                        </div> */}

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
                                        <p className="stoc">In stoc</p>
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
