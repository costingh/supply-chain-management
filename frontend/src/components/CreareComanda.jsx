import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
]

function CreareComanda() {
    const { user: currentUser } = useSelector((state) => state.auth)

    return (
        <div className="ordersContainer">
            <div className="nav">
                <h1>Plasare Comanda</h1>
                <Link
                    to={`/${
                        currentUser && currentUser.administrator === 'N'
                            ? 'angajat'
                            : 'admin'
                    }/dashboard/comenzi`}
                >
                    <div className="addNewOrder">Vizualizare Comenzi</div>
                </Link>
            </div>
            <div className="createOrder">
                <div className="createOrderLeft">
                    <div className="createOrderRow">
                        <div className="label">FURNIZOR</div>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Movie" />
                            )}
                        />
                    </div>
                    <div className="createOrderRow">
                        <div className="label">FURNIZOR</div>
                        <div className="flex">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Movie" />
                                )}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Movie" />
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="createOrderRight">right</div>
            </div>
        </div>
    )
}

export default CreareComanda
