import { useState, useRef, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import {
    addSupplier,
    getAllSuppliers,
    deleteSupplier,
} from '../../actions/suppliers'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../components/Alert'
import TableBtnsContainer from '../../components/TableBtnsContainer'
import AddSupplierPanel from '../../components/AddSupplierPanel'
import SearchSupplierPanel from '../../components/SearchSupplierPanel'
import DashboardPanelButtons from '../../components/DashboardPanelButtons'
import UpdateSupplierPanel from '../../components/UpdateSupplierPanel'

const coloaneFurnizori = [
    { field: 'id', headerName: 'Nume Furnizor', width: 200 },
    { field: 'oras', headerName: 'Oras', width: 140 },
    { field: 'judet', headerName: 'Judet/Munincipiu', width: 200 },
    { field: 'strada', headerName: 'Strada', width: 140 },
    {
        field: 'numar',
        headerName: 'Numar',
        width: 140,
    },
    {
        field: 'numarTelefon',
        headerName: 'Numar Telefon',
        width: 230,
    },
]

const searchSuppliers = [
    {
        inputName: 'cautare_nume_furnizor',
        label: 'Cautati dupa nume',
        placeholder: 'Doraly S.R.L.',
        path: 'M24 20v1h-4v-1h.835c.258 0 .405-.178.321-.422l-.473-1.371h-2.231l-.575-1.59h2.295l-1.362-4.077-1.154 3.451-.879-2.498.921-2.493h2.222l3.033 8.516c.111.315.244.484.578.484h.469zm-6-1h1v2h-7v-2h.532c.459 0 .782-.453.633-.887l-.816-2.113h-6.232l-.815 2.113c-.149.434.174.887.633.887h1.065v2h-7v-2h.43c.593 0 1.123-.375 1.32-.935l5.507-15.065h3.952l5.507 15.065c.197.56.69.935 1.284.935zm-10.886-6h4.238l-2.259-6.199-1.979 6.199z',
    },
]

function Furnizori() {
    const { suppliers } = useSelector((state) => state.suppliers)
    const dispatch = useDispatch()

    const numeFurnizorRef = useRef()
    const stradaFurnizorRef = useRef()
    const numarFurnizorRef = useRef()
    const orasFurnizorRef = useRef()
    const judetFurnizorRef = useRef()
    const nrTelefonFurnizorRef = useRef()

    const [showFilterPanelName, setShowFilterPanelName] = useState('search')
    const [data, setData] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [updateDisabled, setUpdateDisabled] = useState(true)
    const [selectionModel, setSelectionModel] = useState([])
    const [randFurnizori, setRandFurnizori] = useState([])
    const [newSupplierformState, setNewSupplierFormState] = useState({
        nume_furnizor: '',
        strada: '',
        numar: '',
        oras: '',
        judet: '',
        nr_telefon: '',
    })
    const [updateSupplierformState, setupdateSupplierFormState] = useState({
        nume_furnizor: '',
        strada: '',
        numar: '',
        oras: '',
        judet: '',
        nr_telefon: '',
    })

    const addNewSupplierInputs = [
        {
            inputName: 'nume_furnizor',
            label: 'Nume Furnizor *',
            placeholder: 'Doraly S.R.L.',
            ref: numeFurnizorRef,
            path: 'M24 20v1h-4v-1h.835c.258 0 .405-.178.321-.422l-.473-1.371h-2.231l-.575-1.59h2.295l-1.362-4.077-1.154 3.451-.879-2.498.921-2.493h2.222l3.033 8.516c.111.315.244.484.578.484h.469zm-6-1h1v2h-7v-2h.532c.459 0 .782-.453.633-.887l-.816-2.113h-6.232l-.815 2.113c-.149.434.174.887.633.887h1.065v2h-7v-2h.43c.593 0 1.123-.375 1.32-.935l5.507-15.065h3.952l5.507 15.065c.197.56.69.935 1.284.935zm-10.886-6h4.238l-2.259-6.199-1.979 6.199z',
        },
        {
            inputName: 'judet',
            label: 'Judet/Munincipiu',
            placeholder: 'Bucuresti',
            ref: judetFurnizorRef,
            path: 'M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 6h-3.135c-.385.641-.798 1.309-1.232 2h3.131l.5 1h-4.264l-.344.544-.289.456h.558l.858 2h-7.488l.858-2h.479l-.289-.456-.343-.544h-2.042l-1.011-1h2.42c-.435-.691-.848-1.359-1.232-2h-3.135l-4 8h24l-4-8zm-12.794 6h-3.97l1.764-3.528 1.516 1.528h1.549l-.859 2zm8.808-2h3.75l1 2h-3.892l-.858-2z',
        },
        {
            inputName: 'oras',
            label: 'Oras Furnizor',
            placeholder: 'Bucuresti',
            ref: orasFurnizorRef,
            path: 'M13 2h2v2h1v19h1v-15l6 3v12h1v1h-24v-1h1v-11h7v11h1v-19h1v-2h2v-2h1v2zm8 21v-2h-2v2h2zm-15 0v-2h-3v2h3zm8 0v-2h-3v2h3zm-2-4v-13h-1v13h1zm9 0v-1h-2v1h2zm-18 0v-2h-1v2h1zm4 0v-2h-1v2h1zm-2 0v-2h-1v2h1zm9 0v-13h-1v13h1zm7-2v-1h-2v1h2zm-18-1v-2h-1v2h1zm2 0v-2h-1v2h1zm2 0v-2h-1v2h1zm14-1v-1h-2v1h2zm0-2.139v-1h-2v1h2z',
        },
        {
            inputName: 'strada',
            label: 'Strada Furnizor',
            placeholder: 'Iancului',
            ref: stradaFurnizorRef,
            path: 'M7 21h-4v-11h4v11zm7-11h-4v11h4v-11zm7 0h-4v11h4v-11zm2 12h-22v2h22v-2zm-23-13h24l-12-9-12 9z',
        },
        {
            inputName: 'numar',
            label: 'Nr. Strada Furnizor',
            placeholder: '41',
            ref: numarFurnizorRef,
            path: 'M22.548 9l.452-2h-5.364l1.364-6h-2l-1.364 6h-5l1.364-6h-2l-1.364 6h-6.184l-.452 2h6.182l-1.364 6h-5.36l-.458 2h5.364l-1.364 6h2l1.364-6h5l-1.364 6h2l1.364-6h6.185l.451-2h-6.182l1.364-6h5.366zm-8.73 6h-5l1.364-6h5l-1.364 6z',
        },
        {
            inputName: 'nr_telefon',
            label: 'Nr. Telefon Furnizor',
            placeholder: '0987654321',
            ref: nrTelefonFurnizorRef,
            path: 'M8.26 1.289l-1.564.772c-5.793 3.02 2.798 20.944 9.31 20.944.46 0 .904-.094 1.317-.284l1.542-.755-2.898-5.594-1.54.754c-.181.087-.384.134-.597.134-2.561 0-6.841-8.204-4.241-9.596l1.546-.763-2.875-5.612zm7.746 22.711c-5.68 0-12.221-11.114-12.221-17.832 0-2.419.833-4.146 2.457-4.992l2.382-1.176 3.857 7.347-2.437 1.201c-1.439.772 2.409 8.424 3.956 7.68l2.399-1.179 3.816 7.36s-2.36 1.162-2.476 1.215c-.547.251-1.129.376-1.733.376',
        },
    ]

    const handleChangeAddSupplier = (evt) => {
        let value = evt.target.value

        setNewSupplierFormState({
            ...newSupplierformState,
            [evt.target.name]: value,
        })
    }

    const handleChangeUpdateSupplier = (evt) => {
        let value = evt.target.value

        setupdateSupplierFormState({
            ...updateSupplierformState,
            [evt.target.name]: value,
        })
    }

    const handleSubmitAddSupplier = async (e) => {
        if (disabled) alert('Please enter supplier name!')
        else {
            e.preventDefault()

            const { nume_furnizor, strada, numar, oras, judet, nr_telefon } =
                newSupplierformState

            dispatch(
                addSupplier(
                    nume_furnizor,
                    strada,
                    numar,
                    oras,
                    judet,
                    nr_telefon
                )
            ).then((data) => {
                setData(data)

                setRandFurnizori((randFurnizori) => [
                    ...randFurnizori,
                    {
                        id: data.supplier.nume_furnizor,
                        oras: data.supplier.oras ? data.supplier.oras : '-',
                        judet: data.supplier.judet ? data.supplier.judet : '-',
                        strada: data.supplier.strada
                            ? data.supplier.strada
                            : '-',
                        numar: data.supplier.numar ? data.supplier.numar : '-',
                        numarTelefon: data.supplier.nr_telefon
                            ? data.supplier.nr_telefon
                            : '-',
                    },
                ])
            })
        }
    }

    const handleSubmitUpdateSupplier = async (e) => {
        if (updateDisabled) alert('All fields are empty!')
        else {
            e.preventDefault()

            const { nume_furnizor, strada, numar, oras, judet, nr_telefon } =
                updateSupplierformState

            /* dispatch(
                addSupplier(
                    nume_furnizor,
                    strada,
                    numar,
                    oras,
                    judet,
                    nr_telefon
                )
            ).then((data) => {
                setData(data)

                setRandFurnizori((randFurnizori) => [
                    ...randFurnizori,
                    {
                        id: data.supplier.nume_furnizor,
                        oras: data.supplier.oras ? data.supplier.oras : '-',
                        judet: data.supplier.judet ? data.supplier.judet : '-',
                        strada: data.supplier.strada
                            ? data.supplier.strada
                            : '-',
                        numar: data.supplier.numar ? data.supplier.numar : '-',
                        numarTelefon: data.supplier.nr_telefon
                            ? data.supplier.nr_telefon
                            : '-',
                    },
                ])
            }) */
        }
    }

    const resetState = () => {
        setNewSupplierFormState({
            nume_furnizor: '',
            strada: '',
            numar: '',
            oras: '',
            judet: '',
            nr_telefon: '',
        })
    }

    useEffect(() => {
        dispatch(getAllSuppliers()).then((data) => {
            // set redux suppliers store data
        })
    }, [])

    useEffect(() => {
        let suppliersArray = []
        if (suppliers) {
            if (suppliers.length > 0) {
                suppliers.map((supplier) => {
                    suppliersArray.push({
                        id: supplier.nume_furnizor,
                        oras: supplier.oras ? supplier.oras : '-',
                        judet: supplier.judet ? supplier.judet : '-',
                        strada: supplier.strada ? supplier.strada : '-',
                        numar: supplier.numar ? supplier.numar : '-',
                        numarTelefon: supplier.nr_telefon
                            ? supplier.nr_telefon
                            : '-',
                    })
                })

                setRandFurnizori(suppliersArray)
            }
        }
    }, [suppliers])

    // clear inputs after changing form (add new supplier, update, search)
    useEffect(() => {
        resetState()
    }, [showFilterPanelName])

    // prevent form submission if nume_furnizor is empty
    useEffect(() => {
        if (!newSupplierformState.nume_furnizor) setDisabled(true)
        else setDisabled(false)
    }, [newSupplierformState])

    // prevent form submission if all update panel fields are empty
    useEffect(() => {
        if (
            !updateSupplierformState.nume_furnizor &&
            !updateSupplierformState.strada &&
            !updateSupplierformState.numar &&
            !updateSupplierformState.oras &&
            !updateSupplierformState.judet &&
            !updateSupplierformState.nr_telefon
        )
            setUpdateDisabled(true)
        else setUpdateDisabled(false)
    }, [updateSupplierformState])

    useEffect(() => {
        if (data) {
            document.querySelector('.overlay').classList.add('open')
            if (data.status === 200) {
                if (numeFurnizorRef.current) numeFurnizorRef.current.value = ''
                if (stradaFurnizorRef.current)
                    stradaFurnizorRef.current.value = ''
                if (numarFurnizorRef.current)
                    numarFurnizorRef.current.value = ''
                if (orasFurnizorRef.current) orasFurnizorRef.current.value = ''
                if (judetFurnizorRef.current)
                    judetFurnizorRef.current.value = ''
                if (nrTelefonFurnizorRef.current)
                    nrTelefonFurnizorRef.current.value = ''

                resetState()
            }
        }
    }, [data])

    const closeAlert = () => {
        document.querySelector('.overlay').classList.remove('open')
    }

    const deleteRecords = () => {
        if (selectionModel.length === 1) {
            dispatch(deleteSupplier(selectionModel[0])).then((data) => {
                setData(data)
                setRandFurnizori(
                    randFurnizori.filter((furnizor) => {
                        return furnizor.id !== selectionModel[0]
                    })
                )
            })
        } else if (selectionModel.length > 1) {
            let promiseArray = selectionModel.map((suppName) =>
                dispatch(deleteSupplier(suppName))
            )

            Promise.all(promiseArray).then((response) => {
                setData(response[0])

                setRandFurnizori(
                    randFurnizori.filter((e) => !selectionModel.includes(e.id))
                )
            })
        } else {
            // do nothing
            alert('No record selected!')
        }
    }

    return (
        <>
            <div className="innerContent">
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TableBtnsContainer
                        setShowFilterPanelName={setShowFilterPanelName}
                        deleteRecords={deleteRecords}
                    />
                    <DataTable
                        rows={randFurnizori}
                        columns={coloaneFurnizori}
                        selectionModel={selectionModel}
                        setSelectionModel={setSelectionModel}
                    />
                </div>
                {/* <div className="filtersContainer">
                    <div className="filtersInner">
                        <div className="headerInputs">
                            {showFilterPanelName === 'add' &&
                                'Adaugati un nou furnizor'}
                            {showFilterPanelName === 'update' &&
                                'Editati datele furnizorului'}
                            {showFilterPanelName === 'search' &&
                                'Cautati furnizori'}
                        </div>

                        {showFilterPanelName === 'add' && (
                            <AddSupplierPanel
                                addNewSupplierInputs={addNewSupplierInputs}
                                handleChangeAddSupplier={
                                    handleChangeAddSupplier
                                }
                            />
                        )}

                        {showFilterPanelName === 'update' && (
                            <UpdateSupplierPanel
                                updateSupplierInputs={addNewSupplierInputs}
                                handleChangeUpdateSupplier={
                                    handleChangeUpdateSupplier
                                }
                            />
                        )}

                        {showFilterPanelName === 'search' && (
                            <SearchSupplierPanel
                                searchSuppliers={searchSuppliers}
                            />
                        )}

                        <DashboardPanelButtons
                            handleSubmitAddSupplier={handleSubmitAddSupplier}
                            handleSubmitUpdateSupplier={
                                handleSubmitUpdateSupplier
                            }
                            setShowFilterPanelName={setShowFilterPanelName}
                            showFilterPanelName={showFilterPanelName}
                        />
                    </div>
                </div> */}
            </div>
            <Alert data={data} closeAlert={closeAlert} redirect={'no'} />
        </>
    )
}

export default Furnizori
