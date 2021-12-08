import moment from 'moment'
import { useState, useEffect } from 'react'
import Alert from '../../components/Alert'
import DataTable from '../../components/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmployees } from '../../actions/employees'

const coloaneAngajati = [
    { field: 'id', headerName: 'Email', width: 200 },
    { field: 'nume', headerName: 'Nume', width: 200 },
    { field: 'prenume', headerName: 'Prenume', width: 200 },
    { field: 'cnp', headerName: 'CNP', width: 200 },
    { field: 'oras', headerName: 'Oras', width: 200 },
    { field: 'judet', headerName: 'Judet', width: 200 },
    { field: 'strada', headerName: 'Strada', width: 200 },
    { field: 'numar', headerName: 'Nr.', width: 200 },
    { field: 'salariu', headerName: 'Salariu', width: 200 },
    { field: 'numar_telefon', headerName: 'Telefon', width: 200 },
    { field: 'administrator', headerName: 'Rol', width: 200 },
    { field: 'data_nastere', headerName: 'Data nastere', width: 300 },
    { field: 'sex', headerName: 'Sex', width: 200 },
]

function Angajati() {
    const { employees } = useSelector((state) => state.employees)
    const [selectionModel, setSelectionModel] = useState([])
    const [randAngajati, setRandAngajati] = useState([])
    const [data, setData] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllEmployees()).then((data) => {})
    }, [])

    useEffect(() => {
        let employeesArray = []
        if (employees) {
            if (employees.length > 0) {
                employees.map((emp) => {
                    employeesArray.push({
                        id: emp.email,
                        nume: emp.nume,
                        prenume: emp.prenume,
                        cnp: emp.cnp ? emp.cnp : '-',
                        oras: emp.oras ? emp.oras : '-',
                        judet: emp.judet ? emp.judet : '-',
                        strada: emp.strada ? emp.strada : '-',
                        numar: emp.numar ? emp.numar : '-',
                        salariu: emp.salariu ? emp.salariu : '-',
                        numar_telefon: emp.numar_telefon
                            ? emp.numar_telefon
                            : '-',
                        administrator:
                            emp.administrator === 'D' ? 'ADMIN' : 'Angajat',
                        sex: emp.sex === 'B' ? 'Masculin' : 'Feminin',
                        data_nastere: emp.data_nastere
                            ? moment(emp.data_nastere).format('LLL')
                            : '-', // November 20, 2021 5:23 PM invoice.data_factura,
                    })
                })

                setRandAngajati(employeesArray)
            }
        }
    }, [employees])

    useEffect(() => {
        if (data) document.querySelector('.overlay').classList.add('open')
    }, [data])

    const closeAlert = () => {
        document.querySelector('.overlay').classList.remove('open')
    }

    return (
        <div className="tableContainer" style={{ flex: '1' }}>
            <DataTable
                rows={randAngajati}
                columns={coloaneAngajati}
                selectionModel={selectionModel}
                setSelectionModel={setSelectionModel}
            />
            <Alert data={data} closeAlert={closeAlert} redirect={'no'} />
        </div>
    )
}

export default Angajati
