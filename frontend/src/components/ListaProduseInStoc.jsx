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

const listOfProducts = [{ label: 'Banane', pret: 5 }]

function ListaProduseInStoc() {
    const { categories } = useSelector((state) => state.categories)

    const dispatch = useDispatch()
    const [categoriesListSelect, setCategoriesListSelect] = useState([])

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
                        disablePortal
                        id="categorie-produse"
                        options={categoriesListSelect}
                        style={{ width: '25%' }}
                        renderInput={(params) => (
                            <TextField {...params} label="Categorie" />
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
                        disablePortal
                        id="denumire-produse"
                        options={listOfProducts}
                        style={{ width: '60%' }}
                        renderInput={(params) => (
                            <TextField {...params} label="Produse" />
                        )}
                    />
                    <div className="submit">
                        <p>Cautati</p>
                    </div>
                </Box>
            </div>
            <div className="inner">
                {/* <div className="produs">
                    <div className="image">
                        <img src="/images/banane.png" alt="banane" />
                    </div>
                    <div className="text">
                        <p className="pret">5.49 Lei</p>
                        <p className="numeProdus">Banane</p>
                        <div className="categStoc">
                            <p className="stoc">In stoc</p>
                            <p className="categorie">Fructe si legume</p>
                        </div>
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
                <div className="produs">
                    <div className="image">
                        <img src="/images/carrots.png" alt="banane" />
                    </div>
                    <div className="text">
                        <p className="pret">2.09 Lei</p>
                        <p className="numeProdus">Morcovi</p>
                        <div className="categStoc">
                            <p className="stoc">In stoc</p>
                            <p className="categorie">Fructe si legume</p>
                        </div>
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
                <div className="produs">
                    <div className="image">
                        <img src="/images/ceapa.png" alt="banane" />
                    </div>
                    <div className="text">
                        <p className="pret">0.99 Lei</p>
                        <p className="numeProdus">Ceapa verde romaneasca</p>
                        <div className="categStoc">
                            <p className="stoc">In stoc</p>
                            <p className="categorie">Fructe si legume</p>
                        </div>
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
                <div className="produs">
                    <div className="image">
                        <img src="/images/ceapa.png" alt="banane" />
                    </div>
                    <div className="text">
                        <p className="pret">0.99 Lei</p>
                        <p className="numeProdus">Ceapa verde romaneasca</p>
                        <div className="categStoc">
                            <p className="stoc">In stoc</p>
                            <p className="categorie">Fructe si legume</p>
                        </div>
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
                <div className="produs">
                    <div className="image">
                        <img src="/images/ceapa.png" alt="banane" />
                    </div>
                    <div className="text">
                        <p className="pret">0.99 Lei</p>
                        <p className="numeProdus">Ceapa verde romaneasca</p>
                        <div className="categStoc">
                            <p className="stoc">In stoc</p>
                            <p className="categorie">Fructe si legume</p>
                        </div>
                        <div className="productBtns">
                            <div className="factura">
                                <img src="/images/factura.svg" alt="" />
                            </div>
                            <div className="comanda">
                                <img src="/images/comanda.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ListaProduseInStoc
