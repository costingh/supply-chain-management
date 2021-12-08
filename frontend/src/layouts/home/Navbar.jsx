import { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import EventBus from '../../common/EventBus'
import { logout } from '../../actions/auth'
import AuthVerify from '../../common/AuthVerify'

function Navbar() {
    const { isLoggedIn } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

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

    return (
        <div className="navbar">
            <div>
                <Link to="/">Home</Link>
                <Link to="/admin/dashboard">Dashboard</Link>
            </div>
            <div className="actions">
                {isLoggedIn ? (
                    <div className="logout" onClick={logOut}>
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
                ) : (
                    <div>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
