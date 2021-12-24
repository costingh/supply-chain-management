// React
import React, { useState, useRef, useEffect } from 'react'

// Material UI
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// actions
import { getAllCategories } from '../actions/categories'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, searchForProduct } from '../actions/products'
import { addOrder } from '../actions/orders'
import { getAllSupplierNames } from '../actions/suppliers'

// moment.js for date formatting
import moment from 'moment'

function ListaProduseInStoc({ setData }) {
    const { categories } = useSelector((state) => state.categories)
    const { products } = useSelector((state) => state.products)

    const productNameSearchRef = useRef()
    const categoryNameSearchRef = useRef()
    const suppNameRef = useRef()
    const dispatch = useDispatch()

    const [categoriesListSelect, setCategoriesListSelect] = useState([])
    const [suppliersListSelect, setSuppliersListSelect] = useState([])
    const [productsListSelect, setProductsListSelect] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filters, setFilters] = useState(false)
    const [searchCategory, setSearchCategory] = useState('')
    const [searchProduct, setSearchProduct] = useState('')
    const [ordersList, setOrdersList] = useState([])
    const [orderPrice, setOrderPrice] = useState(0)
    const [height, setHeight] = useState('30px')
    const [opened, setOpened] = useState(false)
    const [orderBy, setOrderBy] = useState('desc')
    const [minPrice, setMinPrice] = React.useState(0)
    const [maxPrice, setMaxPrice] = React.useState(5000)

    // set Redux state (state.products)
    useEffect(() => {
        dispatch(getAllProducts()).then((data) => {})

        getAllSupplierNames()
            .then((data) => {
                let list = []

                data.supplierNames.map((supp) => {
                    list.push({
                        label: supp.nume_furnizor,
                        descriere: supp.nume_furnizor,
                    })
                })
                setSuppliersListSelect(list)
            })
            .catch((err) => console.log(err))
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

    const handleCategoryNameSearch = (e) => setSearchCategory(e.target.value)
    const handleProductNameSearch = (e) => setSearchProduct(e.target.value)

    useEffect(() => {
        search(searchProduct, searchCategory)
    }, [searchProduct, searchCategory, products])

    useEffect(() => {
        caculateTotalPrice()
    }, [ordersList])

    const handleSearch = () => {
        if (filters) {
            let prodName = productNameSearchRef.current.value
                ? productNameSearchRef.current.value + '%'
                : '%'
            let catName = categoryNameSearchRef.current.value
                ? categoryNameSearchRef.current.value + '%'
                : '%'
            let suppName = suppNameRef.current.value
                ? suppNameRef.current.value + '%'
                : '%'

            searchForProduct(
                catName,
                prodName,
                suppName,
                minPrice,
                maxPrice,
                orderBy
            )
                .then((resp) => setFilteredProducts(resp.products))
                .catch((err) => console.log(err))
        } else {
            search(
                productNameSearchRef.current.value,
                categoryNameSearchRef.current.value
            )
        }
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

        if (cantitate > product.stoc_initial) {
            setData({
                message:
                    'Furnizorul are in stoc doar ' +
                    product.stoc_initial +
                    ' ' +
                    product.unitate_masura,
                status: 400,
            })
        } else {
            if (parseInt(cantitate) >= 1) {
                if (
                    !ordersList.filter(
                        (e) => e.cod_produs === product.cod_produs
                    ).length > 0
                ) {
                    product.cantitate = parseInt(cantitate)
                    setOrdersList((ordersList) => [...ordersList, product])
                    if (e.target.children.length === 0) {
                        e.target.parentNode.classList.add('disabled')
                    } else e.target.classList.add('disabled')
                } else alert('Produsul este deja in lista!')
            } else alert('Cantitatea trebuie sa fie pozitiva!')
        }
    }

    const increaseQuantity = (cod_produs, prod) => {
        const cantitate = document.querySelector(
            `#cantitate-${cod_produs}`
        ).value

        const arr = document.querySelectorAll(`#cantitate-${cod_produs}`)
        if (parseInt(cantitate) < prod.stoc_initial)
            arr[0].value = parseInt(cantitate) + 1
        if (arr.length === 2) {
            if (parseInt(cantitate) < prod.stoc_initial) {
                arr[1].value = parseInt(cantitate) + 1
                let list = []
                ordersList.map((o) => {
                    if (o.cod_produs !== cod_produs) list.push(o)
                    else
                        list.push({
                            cantitate: o.cantitate + 1,
                            categorie: o.categorie,
                            cod_produs: o.cod_produs,
                            cod_furnizor: o.cod_furnizor,
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
                            cod_furnizor: o.cod_furnizor,
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

    const handlePlaceOrder = () => {
        // 01. insert comanda (cod_furnizor, data_livrare) -> return nr_comanda (insertedId)
        // 02. insert produsecomenzi (nr_comanda, cod_produs, cantitate)

        // ordersList contine lista de produse -> PRODUS (cod_produs, cantitate, cod_furnizor...)
        // deci lista trebuie separata in functie de cod_furnizor (cate o lista de produse pt fiecare furnizor)
        // 1. cream lista de furnizori distincti
        // 2. pt fiecare furnizor adaugam si lista de produse
        // 3. efectuam pasul 01
        // 4. iteram peste lista ce contine produsele grupate dupa cod_furnizor, si efectuam pasul 02 pt fiecare produs din lista

        const suppliersList = []
        const ordersBySupplier = []

        for (let i = 0; i < ordersList.length; i++) {
            let cod_furnizor = ordersList[i].cod_furnizor

            if (i === 0) suppliersList.push(cod_furnizor)
            else {
                if (!suppliersList.includes(cod_furnizor))
                    suppliersList.push(cod_furnizor)
            }
        }

        for (let i = 0; i < suppliersList.length; i++) {
            let list = []
            for (let j = 0; j < ordersList.length; j++) {
                if (ordersList[j].cod_furnizor === suppliersList[i])
                    list.push(ordersList[j])
            }

            ordersBySupplier.push({
                cod_furnizor: suppliersList[i],
                productsList: list,
            })
        }

        let now = Date.now()
        let data_livrare = now + 86400000 * 3 // add three days (milliseconds) current date
        Promise.all(
            ordersBySupplier.map((order) =>
                dispatch(
                    addOrder(
                        order.cod_furnizor,
                        data_livrare,
                        order.productsList
                    )
                ).then((data) => {
                    setData(data)
                })
            )
        )
    }

    const handleFilters = () => {
        if (filters) setFilters(false)
        else setFilters(true)
    }

    const handleMinPriceChange = (e) => setMinPrice(e.target.value)
    const handleMaxPriceChange = (e) => setMaxPrice(e.target.value)

    return (
        <div className="produse">
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
                    <div
                        style={{
                            width: '60%',
                            display: 'flex',
                            position: 'relative',
                        }}
                    >
                        <Autocomplete
                            freeSolo
                            disableClearable
                            id="denumire-produse"
                            options={productsListSelect}
                            style={{ width: '90%', position: 'relative' }}
                            renderInput={(params) => (
                                <div>
                                    <TextField
                                        {...params}
                                        label="Produse"
                                        onChange={handleProductNameSearch}
                                        inputRef={productNameSearchRef}
                                    />
                                </div>
                            )}
                        />
                        <div className="filter" onClick={handleFilters}>
                            <div className="filterInner">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 8c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm-10 6c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm10-8c.343 0 .677.035 1 .101v-2.101c0-.552-.447-1-1-1s-1 .448-1 1v2.101c.323-.066.657-.101 1-.101zm-10 6c.343 0 .677.035 1 .101v-8.101c0-.552-.447-1-1-1s-1 .448-1 1v8.101c.323-.066.657-.101 1-.101zm10 4c-.343 0-.677-.035-1-.101v8.101c0 .552.447 1 1 1s1-.448 1-1v-8.101c-.323.066-.657.101-1 .101zm-10 6c-.343 0-.677-.035-1-.101v2.101c0 .552.447 1 1 1s1-.448 1-1v-2.101c-.323.066-.657.101-1 .101z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="submit" onClick={handleSearch}>
                        <p>Cautati</p>
                    </div>
                </Box>
            </div>
            <div
                className="filterNav"
                style={{ height: `${filters ? '80px' : '0px'}` }}
            >
                <Autocomplete
                    freeSolo
                    disableClearable
                    id="furnizori-produse"
                    options={suppliersListSelect}
                    style={{ width: '25%' }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Furnizor"
                            inputRef={suppNameRef}
                        />
                    )}
                />
                <FormControl style={{ width: '200px' }}>
                    <InputLabel id="min-price">Pret de la:</InputLabel>
                    <Select
                        labelId="min-price"
                        value={minPrice}
                        label="0"
                        onChange={handleMinPriceChange}
                    >
                        <MenuItem value={0}>0 LEI</MenuItem>
                        <MenuItem value={10}>10 LEI</MenuItem>
                        <MenuItem value={100}>100 LEI</MenuItem>
                        <MenuItem value={200}>200 LEI</MenuItem>
                        <MenuItem value={300}>300 LEI</MenuItem>
                        <MenuItem value={400}>400 LEI</MenuItem>
                        <MenuItem value={500}>500 LEI</MenuItem>
                        <MenuItem value={1000}>1000 LEI</MenuItem>
                        <MenuItem value={5000}>5000 LEI</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{ width: '200px' }}>
                    <InputLabel id="max-price">Pana la:</InputLabel>
                    <Select
                        labelId="max-price"
                        value={maxPrice}
                        label="Age"
                        onChange={handleMaxPriceChange}
                    >
                        <MenuItem value={0}>0 LEI</MenuItem>
                        <MenuItem value={10}>10 LEI</MenuItem>
                        <MenuItem value={100}>100 LEI</MenuItem>
                        <MenuItem value={200}>200 LEI</MenuItem>
                        <MenuItem value={300}>300 LEI</MenuItem>
                        <MenuItem value={400}>400 LEI</MenuItem>
                        <MenuItem value={500}>500 LEI</MenuItem>
                        <MenuItem value={1000}>1000 LEI</MenuItem>
                        <MenuItem value={5000}>5000 LEI</MenuItem>
                    </Select>
                </FormControl>
                {/* <label htmlFor="pret-minim">Pret de la:</label>
                <select name="pret-minim" id="pret-minim" className="minPrice">
                    <option value="0">0 Lei</option>
                    <option value="10">10 Lei</option>
                    <option value="50">50 Lei</option>
                    <option value="100">100 Lei</option>
                </select> 
                <label htmlFor="pret-maxim">Pana la:</label>
                <select name="pret-maxim" id="pret-maxim" className="maxPrice">
                    <option value="100000">100000 Lei</option>
                    <option value="10000">10000 Lei</option>
                    <option value="1000">1000 Lei</option>
                    <option value="500">500 Lei</option>
                </select>
                */}
                <div
                    style={{
                        display: 'flex',
                        columnGap: '10px',
                        marginLeft: 'auto',
                    }}
                >
                    <div
                        className={`${
                            orderBy === 'desc' ? 'desc active' : 'desc'
                        }`}
                        onClick={() => setOrderBy('desc')}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 21l6-8h-4v-10h-4v10h-4l6 8zm16-12h-8v-2h8v2zm2-6h-10v2h10v-2zm-4 8h-6v2h6v-2zm-2 4h-4v2h4v-2zm-2 4h-2v2h2v-2z" />
                        </svg>
                    </div>
                    <div
                        className={`${
                            orderBy === 'asc' ? 'asc active' : 'asc'
                        }`}
                        onClick={() => setOrderBy('asc')}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 3l-6 8h4v10h4v-10h4l-6-8zm16 14h-8v-2h8v2zm2 2h-10v2h10v-2zm-4-8h-6v2h6v-2zm-2-4h-4v2h4v-2zm-2-4h-2v2h2v-2z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div
                className="inner"
                style={{
                    height: `${
                        filters
                            ? 'calc(100vh - 90px - 80px)'
                            : 'calc(100vh - 90px)'
                    }`,
                }}
            >
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
                                                    item.cod_produs,
                                                    item
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
                        <div
                            className="buttonPlaceOrder"
                            onClick={handlePlaceOrder}
                        >
                            Comandati
                        </div>
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
                                            {moment(product.data_creare).format(
                                                'l'
                                            )}
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
                                                        product.cod_produs,
                                                        product
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
                                                src="/images/shopping-cart.svg"
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
            </div>
        </div>
    )
}

export default ListaProduseInStoc
