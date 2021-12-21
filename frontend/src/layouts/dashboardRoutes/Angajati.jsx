// react
import { useState, useEffect } from 'react'
// redux
import { useDispatch, useSelector } from 'react-redux'
// components
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
// router
import { Link } from 'react-router-dom'
// actions
import { getAllEmployees, updateSalary } from '../../actions/employees'
// date formatting
import moment from 'moment'

function Angajati({ setData }) {
    const { user: currentUser } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const { employees } = useSelector((state) => state.employees)
    const [options, setOptions] = useState([])
    const [filteredListOfEmp, setFilteredListOfEmp] = useState([])
    const [updateSalaryOpened, setUpdateSalaryOpened] = useState(false)
    const [newSalary, setNewSalary] = useState(0)

    useEffect(() => {
        dispatch(getAllEmployees()).then((data) => {})
    }, [])

    useEffect(() => {
        if (employees) {
            let employeesArray = []
            employees.map((emp) =>
                employeesArray.push({
                    label: emp.nume + ' ' + emp.prenume,
                    age: moment(emp.data_nastere, 'YYYYMMDD')
                        .fromNow()
                        .substring(0, 2),
                })
            )
            setOptions(employeesArray)
            setFilteredListOfEmp(employees)
        }
    }, [employees])

    const handleSearchChange = (e) => {
        setFilteredListOfEmp(
            employees.filter(
                (emp) =>
                    emp.nume
                        .toLowerCase()
                        .startsWith(e.target.value.toLowerCase()) ||
                    emp.prenume
                        .toLowerCase()
                        .startsWith(e.target.value.toLowerCase())
            )
        )
    }

    const handleUpdateSalary = () => {
        setUpdateSalaryOpened(true)
    }

    const handleSalaryChange = (e) => {
        setNewSalary(e.target.value)
    }

    const handleSubmit = (email) => {
        const num = parseFloat(newSalary, 10)

        if (!isNaN(num))
            dispatch(updateSalary(email, num)).then((data) => {
                setData(data)
                setUpdateSalaryOpened(false)
            })
        else alert('Salariul trebuie sa fie un numar!')
    }

    return (
        <div className="angajatiContainer">
            <div className="navAngajati">
                <h1>
                    {filteredListOfEmp &&
                        (filteredListOfEmp.length === 1
                            ? '1 Angajat'
                            : filteredListOfEmp.length + ' Angajati')}
                </h1>
            </div>
            <div className="searchAngajatiContainer">
                <div className="searchBox">
                    <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    >
                        <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
                    </svg>
                    <Autocomplete
                        freeSolo
                        disableClearable
                        id="search-employers"
                        options={options}
                        style={{ width: '300px' }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Cautati Angajati"
                                onChange={handleSearchChange}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="gridAngajati">
                {filteredListOfEmp &&
                    filteredListOfEmp.map((emp) => (
                        <div className="innerGridAngajat" key={emp.id_angajat}>
                            <div className="cardAngajat">
                                <div>
                                    <div className="angajatTop">
                                        <div className="angajatImg">
                                            {emp.sex === 'B' ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="54"
                                                    height="55"
                                                    viewBox="0 0 24 25"
                                                >
                                                    <path d="M16.5 13.5c0 .828-.56 1.5-1.25 1.5s-1.25-.672-1.25-1.5.56-1.5 1.25-1.5 1.25.672 1.25 1.5zm-7.75-1.5c-.69 0-1.25.672-1.25 1.5s.56 1.5 1.25 1.5 1.25-.672 1.25-1.5-.56-1.5-1.25-1.5zm15.25 2.313c0 1.765-.985 3.991-3.139 4.906-2.063 3.295-4.987 5.781-8.861 5.781-3.741 0-6.846-2.562-8.861-5.781-2.154-.916-3.139-3.142-3.139-4.906 0-2.053.754-3.026 1.417-3.489-.39-1.524-1.03-5.146.963-7.409.938-1.065 2.464-1.54 4.12-1.274.719-1.532 3.612-2.141 5.5-2.141 3 0 6.609.641 9.141 3.516 1.969 2.236 1.648 5.741 1.388 7.269.676.446 1.471 1.419 1.471 3.528zm-9.6 4.687h-4.8s.678 1.883 2.4 1.883c1.788 0 2.4-1.883 2.4-1.883zm7.063-6.508c-4.11.393-7.778-3.058-9.073-5.274-.081.809.186 2.557.969 3.355-3.175.064-5.835-1.592-7.46-3.868-.837 1.399-1.242 3.088-1.242 4.775 0 .722-.746 1.208-1.406.914-.14-.063-.436-.101-.671.053-1 .648-.895 4.183 1.553 5.012.224.076.413.228.536.43.655 1.086 1.354 1.98 2.086 2.722.922.633 1.056-1.875 1.667-2.72.686-.949 2.455-1.126 3.578-.322 1.124-.804 2.892-.627 3.578.322.611.846.745 3.354 1.667 2.72.731-.741 1.43-1.636 2.086-2.722.123-.202.313-.354.536-.43 2.363-.8 2.596-4.185 1.596-4.967z" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="56"
                                                    height="54"
                                                    viewBox="0 0 26 24"
                                                >
                                                    <path d="M17.5 12.5c0 .828-.56 1.5-1.25 1.5s-1.25-.672-1.25-1.5.56-1.5 1.25-1.5 1.25.672 1.25 1.5zm-7.75-1.5c-.69 0-1.25.672-1.25 1.5s.56 1.5 1.25 1.5 1.25-.672 1.25-1.5-.56-1.5-1.25-1.5zm3.25 8.354c2.235 0 3-2.354 3-2.354h-6s.847 2.354 3 2.354zm13-6.75c0 2.865-.791 5.778-1.933 8.243-.542 1.169-1.163 2.238-1.817 3.153l-3.796-1.917c-1.556 1.187-3.37 1.917-5.454 1.917-1.993 0-3.825-.749-5.408-1.941l-3.842 1.941c-.654-.915-1.275-1.984-1.817-3.153-1.142-2.465-1.933-5.378-1.933-8.243 0-7.59 5.281-12.604 13-12.604s13 5.014 13 12.604zm-5.669 4.285c.123-.202.313-.354.536-.43 2.106-.713 2.57-3.529 1.802-4.746-6.576-.39-10.89-3.363-12.669-6.322-2.257 5.063-5.078 6.628-6.863 6.795-.482 1.714.322 3.706 1.996 4.273.224.076.413.228.536.43 1.708 2.83 4.015 5.111 7.331 5.111 3.318 0 5.624-2.284 7.331-5.111z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            {emp.administrator === 'D' ? (
                                                <div
                                                    className="angajatRol"
                                                    style={{
                                                        background: '#35291f',
                                                        color: '#9a5f1e',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    admin
                                                </div>
                                            ) : (
                                                <div
                                                    className="angajatRol"
                                                    style={{
                                                        background: '#172439',
                                                        color: '#1b55a9',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    angajat
                                                </div>
                                            )}
                                            <p
                                                style={{
                                                    marginTop: '10px',
                                                    color: '#ccc',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {emp.salariu
                                                    ? emp.salariu + ' Lei/Luna'
                                                    : '- Lei/Luna'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text">
                                        <h2>
                                            {emp.nume} {emp.prenume},{' '}
                                            <span>
                                                {moment(
                                                    emp.data_nastere,
                                                    'YYYYMMDD'
                                                )
                                                    .fromNow()
                                                    .substring(0, 2)}{' '}
                                                de ani
                                            </span>
                                        </h2>
                                        <p className="telefon">
                                            {emp.numar_telefon
                                                ? emp.numar_telefon
                                                : '-'}
                                        </p>
                                        <p className="adresa">{`${
                                            emp.oras ? emp.oras : '-'
                                        }, Str. ${
                                            emp.strada ? emp.strada : '-'
                                        }, nr. ${
                                            emp.numar ? emp.numar : '-'
                                        }`}</p>
                                        <p className="cnp">
                                            CNP:{' '}
                                            {emp.CNP ? emp.CNP : 'nespecificat'}
                                        </p>
                                        <div className="email">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z" />
                                            </svg>
                                            <p>{emp.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="angajatiActions">
                                    {/* if this user is the current one, go to dashboard/profile
                                        else if it is not -> 
                                            if its admin -> update salary
                                            else no update access
                                     */}
                                    {currentUser &&
                                    currentUser.nume === emp.nume &&
                                    emp.prenume === currentUser.prenume ? (
                                        <Link
                                            to={`/${
                                                currentUser &&
                                                currentUser.administrator ===
                                                    'N'
                                                    ? 'employee'
                                                    : 'admin'
                                            }/dashboard/profile`}
                                        >
                                            <div className="update">
                                                Actualizati Profilul
                                            </div>
                                        </Link>
                                    ) : currentUser.administrator === 'D' ? (
                                        <div
                                            className="update"
                                            onClick={handleUpdateSalary}
                                        >
                                            Modificare Salariu
                                        </div>
                                    ) : (
                                        <div className="alertUpdate">
                                            <svg
                                                width="24"
                                                height="24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                            >
                                                <path d="M24 23h-24l12-22 12 22zm-22.315-1h20.63l-10.315-18.912-10.315 18.912zm10.315-2c.466 0 .845-.378.845-.845 0-.466-.379-.844-.845-.844-.466 0-.845.378-.845.844 0 .467.379.845.845.845zm.5-11v8h-1v-8h1z" />
                                            </svg>{' '}
                                            <p>Nu aveti drept de actualizare</p>
                                        </div>
                                    )}
                                    {updateSalaryOpened && (
                                        <div className="updateSalary">
                                            <div>
                                                <h1>Modificati Salariul</h1>
                                                <div className="flex">
                                                    <div className="flexInner">
                                                        <p className="bold">
                                                            Nume:{' '}
                                                        </p>
                                                        <p className="muted">
                                                            {emp.nume}
                                                        </p>
                                                    </div>
                                                    <div className="flexInner">
                                                        <p className="bold">
                                                            Preume:{' '}
                                                        </p>
                                                        <p className="muted">
                                                            {emp.prenume}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <div className="flexInner">
                                                        <p className="bold">
                                                            CNP:{' '}
                                                        </p>
                                                        <p className="muted">
                                                            {emp.CNP
                                                                ? emp.CNP
                                                                : '-'}
                                                        </p>
                                                    </div>
                                                    <div className="flexInner">
                                                        <p className="bold">
                                                            Varsta:{' '}
                                                        </p>
                                                        <p className="muted">
                                                            {moment(
                                                                emp.data_nastere,
                                                                'YYYYMMDD'
                                                            )
                                                                .fromNow()
                                                                .substring(
                                                                    0,
                                                                    2
                                                                )}{' '}
                                                            de ani
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <div className="flexInner">
                                                        <p className="bold">
                                                            Telefon:{' '}
                                                        </p>
                                                        <p className="muted">
                                                            {emp.numar_telefon
                                                                ? emp.numar_telefon
                                                                : '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className="line"
                                                    style={{
                                                        marginBottom: '20px',
                                                    }}
                                                >
                                                    <p className="bold">
                                                        Email:{' '}
                                                    </p>
                                                    <p className="muted">
                                                        {emp.email}
                                                    </p>
                                                </div>
                                                <span>Salariu Lunar</span>
                                                <input
                                                    type="text"
                                                    defaultValue={
                                                        emp.salariu
                                                            ? emp.salariu
                                                            : '0.00'
                                                    }
                                                    onChange={
                                                        handleSalaryChange
                                                    }
                                                />

                                                <div className="flex">
                                                    <div
                                                        className="closeBtn"
                                                        onClick={() =>
                                                            setUpdateSalaryOpened(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Anulati
                                                    </div>
                                                    <div
                                                        className="submitBtn"
                                                        onClick={() =>
                                                            handleSubmit(
                                                                emp.email
                                                            )
                                                        }
                                                    >
                                                        Modificati
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Angajati
