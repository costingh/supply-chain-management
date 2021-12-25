import { listItems } from '../utils/sidebarConfig'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import EventBus from '../common/EventBus'
import { logout } from '../actions/auth'
import AuthVerify from '../common/AuthVerify'
import { Link, useLocation } from 'react-router-dom'

function Sidebar({ activeTabName, setActiveTabName, admin }) {
    const { user: currentUser } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()

    const logOut = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    useEffect(() => {
        EventBus.on('logout', () => {
            logOut()
        })

        return () => {
            EventBus.remove('logout')
        }
    }, [logOut])

    useEffect(() => {
        if (location.pathname.includes('furnizori'))
            setActiveTabName('Furnizori')
        else if (location.pathname.includes('facturi'))
            setActiveTabName('Facturi')
        else if (location.pathname.includes('comenzi'))
            setActiveTabName('Comenzi')
        else if (location.pathname.includes('angajati'))
            setActiveTabName('Angajati')
        else if (location.pathname.includes('produse'))
            setActiveTabName('Produse')
        else if (location.pathname.includes('categorii'))
            setActiveTabName('Categorii')
        else if (location.pathname.includes('profil'))
            setActiveTabName('Profil')
        else setActiveTabName('Dashboard')
    }, [location.pathname])

    return (
        <div className="sidebar">
            <div className="header">Supermarket</div>

            <div className="currentUser">
                <div className="line">{`${currentUser.nume} ${currentUser.prenume}`}</div>
                <div className="line">{currentUser.email}</div>
                <div className="line rol">
                    {currentUser.administrator === 'N'
                        ? 'Angajat'
                        : 'Administrator'}
                </div>
            </div>
            <div className="title">Meniu</div>

            {listItems.map((item) => (
                <Link
                    className={`item ${
                        activeTabName === item.name && 'active'
                    }`}
                    style={{ textDecoration: 'none' }}
                    key={item.name}
                    onClick={() => setActiveTabName(item.name)}
                    to={`${admin ? '/admin/' : '/employee/'}dashboard/${
                        item.name !== 'Dashboard'
                            ? item.name.toLowerCase()
                            : 'home'
                    }`}
                >
                    <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    >
                        <path d={item.path} />
                    </svg>
                    <p>{item.name}</p>
                </Link>
            ))}

            <div className="dashboardLogout" onClick={logOut}>
                <AuthVerify logOut={logOut} />
                <p>Logout</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14z" />
                </svg>
            </div>
        </div>
    )
}

export default Sidebar
