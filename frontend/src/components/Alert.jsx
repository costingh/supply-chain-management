import React from 'react'
import { Link } from 'react-router-dom'

function Alert({ data, closeAlert, goToLoginPage, redirect, redirectTo }) {
    return (
        <div className="overlay">
            <div className="alert">
                <div className="icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="124"
                        height="124"
                        viewBox="0 0 24 24"
                        fill={
                            data && data.status === 200 ? '#4bb543' : '#f2af17'
                        }
                    >
                        <path
                            d={
                                data && data.status === 200
                                    ? 'M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z'
                                    : 'M16.143 2l5.857 5.858v8.284l-5.857 5.858h-8.286l-5.857-5.858v-8.284l5.857-5.858h8.286zm.828-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-6.471 6h3l-1 8h-1l-1-8zm1.5 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z'
                            }
                        />
                    </svg>
                </div>
                <h1>
                    {data && data.status === 200 ? 'Felicitari' : 'Ooops...'}
                </h1>
                <p className="social-text">{data && data.message}</p>
                {redirect === 'no' ? (
                    data && data.status === 200 ? (
                        redirectTo !== '' ? (
                            <Link to={redirectTo}>
                                <div className="button">
                                    <p onClick={closeAlert}>Done</p>
                                </div>
                            </Link>
                        ) : (
                            <div className="button">
                                <p onClick={closeAlert}>Done</p>
                            </div>
                        )
                    ) : (
                        <div className="button">
                            <p onClick={closeAlert}>Try Again</p>
                        </div>
                    )
                ) : data && data.status === 200 ? (
                    <div className="button">
                        <p onClick={goToLoginPage}>Login</p>
                    </div>
                ) : (
                    <div className="button">
                        <p onClick={closeAlert}>Try Again</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Alert
