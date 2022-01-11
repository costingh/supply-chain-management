import moment from 'moment'
import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import TableBtnsContainer from '../../components/TableBtnsContainer'
import { getAllInvoices, deleteInvoice } from '../../actions/invoices'
import InvoicesService from '../../services/invoices.service'
const coloaneFacturi = [
    { field: 'id', headerName: 'Numar Factura', width: 200 },
    { field: 'dataFactura', headerName: 'Data Factura', width: 300 },
    { field: 'numeFurnizor', headerName: 'Nume Furnizor', width: 200 },
    { field: 'total', headerName: 'Total (RON)', width: 200 },
]

function Facturi({ setData }) {
    const { invoices } = useSelector((state) => state.invoices)
    const { user: currentUser } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const [selectionModel, setSelectionModel] = useState([])
    const [randFacturi, setRandFacturi] = useState([])
    const [grid, setGrid] = useState('table')
    const [invoicesWithProducts, setInvoicesWithProducts] = useState([])

    // get all invoices when mounting component
    useEffect(() => {
        dispatch(getAllInvoices()).then((data) => {})
    }, [])

    useEffect(() => {
        let invoicesArray = []
        let invWithProd = []

        if (invoices) {
            if (invoices.length > 0) {
                invoices.map((invoice) => {
                    InvoicesService.getAnInvoice(invoice.nr_factura)
                        .then((resp) => {
                            invWithProd.push({
                                ...invoice,
                                listaProduse: resp.products,
                            })
                            setInvoicesWithProducts(invWithProd)
                        })
                        .catch((err) => console.log(err))

                    invoicesArray.push({
                        id: invoice.nr_factura,
                        total: invoice.total,
                        numeFurnizor: invoice.nume_furnizor,
                        dataFactura: moment(invoice.data_factura).format('LLL'), // November 20, 2021 5:23 PM invoice.data_factura,
                    })
                })

                setRandFacturi(invoicesArray)
            }
        } else {
            setRandFacturi([
                {
                    id: '-',
                    total: '-',
                    numeFurnizor: '-',
                    dataFactura: '-',
                },
            ])
        }
    }, [invoices])

    /*  useEffect(() => {
        console.log(invoicesWithProducts)
    }, [invoicesWithProducts]) */

    const deleteRecords = () => {
        if (selectionModel.length === 1) {
            dispatch(deleteInvoice(selectionModel[0])).then((data) => {
                setData(data)
                setRandFacturi(
                    randFacturi.filter((furnizor) => {
                        return furnizor.id !== selectionModel[0]
                    })
                )
            })
        } else if (selectionModel.length > 1) {
            let promiseArray = selectionModel.map((invID) =>
                dispatch(deleteInvoice(invID))
            )

            Promise.all(promiseArray).then((response) => {
                setData(response[0])

                setRandFacturi(
                    randFacturi.filter((e) => !selectionModel.includes(e.id))
                )
            })
        } else {
            // do nothing
            alert('No record selected!')
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <TableBtnsContainer
                setGrid={setGrid}
                grid={grid}
                invoices={invoices}
                deleteRecords={deleteRecords}
                isAdmin={
                    currentUser
                        ? currentUser.administrator === 'D'
                            ? true
                            : false
                        : false
                }
            />
            {grid === 'table' ? (
                <div
                    style={{
                        width: '100%',
                        height: 'calc(100% - 84px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <DataTable
                        rows={randFacturi}
                        columns={coloaneFacturi}
                        selectionModel={selectionModel}
                        setSelectionModel={setSelectionModel}
                    />
                </div>
            ) : (
                <div
                    className="gridLayout"
                    style={{
                        height: 'calc(100% - 84px)',
                    }}
                >
                    {invoicesWithProducts &&
                        invoicesWithProducts.map((i) => (
                            <div className="innerLayout" key={i.nr_factura}>
                                <div className="factura">
                                    <div className="top">
                                        <p>Factura nr. {i.nr_factura}</p>
                                        <p>
                                            Data:{' '}
                                            {moment(i.data_factura).format('l')}
                                        </p>
                                    </div>
                                    <div className="details">
                                        <p>
                                            Departamentul de{' '}
                                            {i.nume_departament}
                                        </p>
                                        <p>
                                            {i.nume_furnizor +
                                                ' ' +
                                                i.oras +
                                                ' ' +
                                                i.strada +
                                                ' ' +
                                                i.numar}
                                        </p>
                                        <p>Telefon: {i.nr_telefon}</p>
                                    </div>
                                    <div className="productsList">
                                        {i.listaProduse.map((p) => (
                                            <div>
                                                {p.nume_produs}, {p.cantitate}
                                                {p.unitate_masura}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="total">
                                        Total: {i.total} LEI
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}

export default Facturi
