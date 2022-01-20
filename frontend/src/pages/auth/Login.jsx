import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Alert from '../../components/Alert'
import { login } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../../layouts/home/Navbar'
function Login() {
    const [data, setData] = useState(null)
    const [showForm, setShowForm] = useState('registration')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disabled, setDisabled] = useState(false)
    const history = useHistory()

    const { isLoggedIn } = useSelector((state) => state.auth)
    /* const { message } = useSelector((state) => state.message) */

    const dispatch = useDispatch()

    useEffect(() => {
        let timeout = setTimeout(() => {
            setShowForm('login')
        }, 200)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {
        if (!email || !password) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [email, password])

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch(login(email, password)).then((data) => {
            if (data.status === 200) {
                history.push('/admin/dashboard')
            } else {
                setData(data)
            }
        })
    }

    const closeAlert = () => {
        document.querySelector('.overlay').classList.remove('open')
    }

    const goToRegisterPage = () => {
        closeAlert()
        setShowForm('registration')

        setTimeout(() => {
            history.push('/register')
        }, 400)
    }

    useEffect(() => {
        if (data) {
            document.querySelector('.overlay').classList.add('open')
        }
    }, [data])

    if (isLoggedIn) {
        return <Redirect to="/admin/dashboard/home" />
    }

    return (
        <div
            className="login-container"
        >
            <Navbar />
            <div
                className={
                    showForm === 'login'
                        ? 'login-inner login-form'
                        : 'login-inner login-form hide'
                }
            >
                <h1>Login</h1>
                <p>Sign in to your account to continue.</p>

                <form className="middle" onSubmit={handleSubmit}>
                    <div className="input">
                        <div className="topContainer">
                            <p>Email</p>
                        </div>
                        <div className="inputInner">
                            <div className="icon">
                                <svg
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="#e0e6f0"
                                >
                                    <path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email-login"
                                placeholder="john.doe@gmail.com"
                                onChange={onEmailChange}
                            />
                        </div>
                    </div>

                    <div className="input">
                        <div className="topContainer">
                            <p>Password</p>
                        </div>
                        <div className="inputInner">
                            <div className="icon">
                                <svg
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="#e0e6f0"
                                >
                                    <path d="M16 1c-4.418 0-8 3.582-8 8 0 .585.063 1.155.182 1.704l-8.182 7.296v5h6v-2h2v-2h2l3.066-2.556c.909.359 1.898.556 2.934.556 4.418 0 8-3.582 8-8s-3.582-8-8-8zm-6.362 17l3.244-2.703c.417.164 1.513.703 3.118.703 3.859 0 7-3.14 7-7s-3.141-7-7-7c-3.86 0-7 3.14-7 7 0 .853.139 1.398.283 2.062l-8.283 7.386v3.552h4v-2h2v-2h2.638zm.168-4l-.667-.745-7.139 6.402v1.343l7.806-7zm10.194-7c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2zm-1 0c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password-login"
                                placeholder="password"
                                onChange={onPasswordChange}
                            />
                        </div>
                    </div>

                    <button
                        className="signin-btn"
                        className={
                            disabled ? 'signin-btn disabled' : 'signin-btn'
                        }
                        disabled={disabled}
                    >
                        <p style={{ fontSize: '17px' }}>Sign In</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            fill="#e0e6f0"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 12l-9-8v6h-15v4h15v6z" />
                        </svg>
                    </button>
                </form>

                <p>
                    Not registered?{' '}
                    <span className="link" onClick={goToRegisterPage}>
                        Create account
                    </span>{' '}
                </p>
            </div>

            <Alert
                data={data}
                closeAlert={closeAlert}
                goToLoginPage={goToRegisterPage}
            />
        </div>
    )
}

export default Login
