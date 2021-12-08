import moment from 'moment'
import Alert from '../../components/Alert'
import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import TableBtnsContainer from '../../components/TableBtnsContainer'
import { getAllInvoices, deleteInvoice } from '../../actions/invoices'

const coloaneFacturi = [
    { field: 'id', headerName: 'Numar Factura', width: 200 },
    { field: 'total', headerName: 'Total (RON)', width: 200 },
    { field: 'codFurnizor', headerName: 'Cod Furnizor', width: 200 },
    { field: 'dataFactura', headerName: 'Data Factura', width: 300 },
]

function Facturi() {
    const { invoices } = useSelector((state) => state.invoices)
    const [selectionModel, setSelectionModel] = useState([])

    const dispatch = useDispatch()

    const [showFilterPanelName, setShowFilterPanelName] = useState('search')
    const [randFacturi, setRandFacturi] = useState([])
    const [data, setData] = useState(null)

    // get all invoices when mounting component
    useEffect(() => {
        dispatch(getAllInvoices()).then((data) => {
            // set redux invoices store data
        })
    }, [])

    useEffect(() => {
        let invoicesArray = []
        if (invoices) {
            if (invoices.length > 0) {
                invoices.map((invoice) => {
                    invoicesArray.push({
                        id: invoice.nr_factura,
                        total: invoice.total,
                        codFurnizor: invoice.cod_furnizor,
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
                    codFurnizor: '-',
                    dataFactura: '-',
                },
            ])
        }
    }, [invoices])

    useEffect(() => {
        if (data) {
            document.querySelector('.overlay').classList.add('open')
            // reset form if user registered successfully
            /* if (data.status === 200) {
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
            } */
        }
    }, [data])

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

    const closeAlert = () => {
        document.querySelector('.overlay').classList.remove('open')
    }

    return (
        <>
            <div className="tableContainer" style={{ flex: '1' }}>
                <TableBtnsContainer
                    setShowFilterPanelName={setShowFilterPanelName}
                    deleteRecords={deleteRecords}
                />
                <DataTable
                    rows={randFacturi}
                    columns={coloaneFacturi}
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                />
            </div>
            <Alert data={data} closeAlert={closeAlert} redirect={'no'} />
        </>
    )
}

export default Facturi
