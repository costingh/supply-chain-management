import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import {
    getAllSuppliers,
    deleteSupplier,
    updateSupplier,
} from '../../actions/suppliers'
import SuppliersService from '../../services/suppliers.service'
import { useDispatch, useSelector } from 'react-redux'

const coloaneFurnizori = [
    { field: 'id', headerName: 'Nume Furnizor', width: 300 },
    { field: 'oras', headerName: 'Oras', width: 140 },
    { field: 'judet', headerName: 'Judet/Munincipiu', width: 200 },
    { field: 'strada', headerName: 'Strada', width: 200 },
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

function Furnizori() {
    const { suppliers } = useSelector((state) => state.suppliers)
    const dispatch = useDispatch()

    const [data, setData] = useState(null)
    const [selectionModel, setSelectionModel] = useState([])
    const [randFurnizori, setRandFurnizori] = useState([])
    const [supplierToUpdate, setSupplierToUpdate] = useState(null)
    const [update, setUpdate] = useState(false)

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

    const handleUpdateSupplier = () => {
        if (selectionModel.length === 1) {
            SuppliersService.getSupplierByName(selectionModel[0])
                .then((resp) => {
                    setSupplierToUpdate(resp.data.supplier)
                    setUpdate(true)
                })
                .catch((err) => console.log(err))
        } else if (selectionModel.length > 1)
            alert('Selectati doar un furnizor')
        else alert('Nu ati selectat un furnizor')
    }

    const performUpdate = () => {
        let inputs = document.querySelectorAll('.updateSupplier input')
        let nume = inputs[0].value
        let oras = inputs[1].value
        let judet = inputs[2].value
        let strada = inputs[3].value
        let numar = inputs[4].value
        let nr_telefon = inputs[5].value

        dispatch(
            updateSupplier(
                supplierToUpdate.cod_furnizor,
                nume,
                strada,
                numar,
                oras,
                judet,
                nr_telefon
            )
        ).then((data) => {
            setUpdate(false)
            alert(data.message)
        })
    }

    return (
        <>
            <div className="innerContent">
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: '0px 40px',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h1 style={{ color: '#e1e1e1' }}>
                            {suppliers && suppliers.length} Furnizori
                        </h1>
                        <p
                            onClick={handleUpdateSupplier}
                            style={{
                                padding: '10px 30px',
                                background: '#111',
                                color: '#ccc',
                                cursor: 'pointer',
                            }}
                        >
                            Editati
                        </p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: 'calc(100% - 80px)',
                        }}
                    >
                        <DataTable
                            rows={randFurnizori}
                            columns={coloaneFurnizori}
                            selectionModel={selectionModel}
                            setSelectionModel={setSelectionModel}
                        />
                    </div>
                </div>
                {update && (
                    <div className="updateSupplier">
                        <div>
                            <h1>Modificati Datele Furnizorului</h1>
                            <div className="flex">
                                <p className="bold">Nume: </p>
                                <input
                                    type="text"
                                    name="nume"
                                    defaultValue={
                                        supplierToUpdate &&
                                        supplierToUpdate.nume_furnizor
                                    }
                                    readOnly="readonly"
                                />
                            </div>
                            <div className="flex">
                                <p className="bold">Oras: </p>
                                <input
                                    type="text"
                                    name="oras"
                                    defaultValue={
                                        supplierToUpdate &&
                                        supplierToUpdate.oras
                                    }
                                />
                            </div>
                            <div className="flex">
                                <p className="bold">Judet: </p>
                                <input
                                    type="text"
                                    name="judet"
                                    defaultValue={
                                        supplierToUpdate &&
                                        supplierToUpdate.judet
                                    }
                                />
                            </div>
                            <div className="flex">
                                <p className="bold">Strada: </p>
                                <input
                                    type="text"
                                    name="strada"
                                    defaultValue={
                                        supplierToUpdate &&
                                        supplierToUpdate.strada
                                    }
                                />
                            </div>
                            <div className="flex">
                                <p className="bold">Nr. Strada: </p>
                                <input
                                    type="text"
                                    name="numarStrada"
                                    defaultValue={
                                        supplierToUpdate &&
                                        supplierToUpdate.numar
                                    }
                                />
                            </div>
                            <div className="flex">
                                <p className="bold">Telefon: </p>
                                <input
                                    type="text"
                                    name="telefon"
                                    defaultValue={
                                        supplierToUpdate &&
                                        supplierToUpdate.nr_telefon
                                    }
                                />
                            </div>
                            <div className="flex">
                                <div
                                    className="closeBtn"
                                    onClick={() => setUpdate(false)}
                                >
                                    Anulati
                                </div>
                                <div
                                    className="submitBtn"
                                    onClick={performUpdate}
                                >
                                    Modificati
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Furnizori
