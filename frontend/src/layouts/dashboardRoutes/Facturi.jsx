import moment from 'moment'
import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import TableBtnsContainer from '../../components/TableBtnsContainer'
import { getAllInvoices, deleteInvoice } from '../../actions/invoices'

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

    const [showFilterPanelName, setShowFilterPanelName] = useState('search')
    const [selectionModel, setSelectionModel] = useState([])
    const [randFacturi, setRandFacturi] = useState([])

    // get all invoices when mounting component
    useEffect(() => {
        dispatch(getAllInvoices()).then((data) => {})
    }, [])

    useEffect(() => {
        let invoicesArray = []
        if (invoices) {
            if (invoices.length > 0) {
                invoices.map((invoice) => {
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
        <>
            <div className="tableContainer" style={{ flex: '1' }}>
                <TableBtnsContainer
                    setShowFilterPanelName={setShowFilterPanelName}
                    deleteRecords={deleteRecords}
                    isAdmin={
                        currentUser
                            ? currentUser.administrator === 'D'
                                ? true
                                : false
                            : false
                    }
                />
                <DataTable
                    rows={randFacturi}
                    columns={coloaneFacturi}
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                />
            </div>
        </>
    )
}

export default Facturi
