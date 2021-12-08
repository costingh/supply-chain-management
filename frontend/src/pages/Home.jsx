import React from 'react'
import Navbar from '../layouts/home/Navbar'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div
            style={{
                background: '#e3cfac',
                minHeight: '100vh',
            }}
        >
            {/* <img
                src="./images/home-banner-image.jpg"
                alt=""
                style={{
                    opacity: '0.5',
                    position: 'absolute',
                    right: '0',
                    top: '100px',
                    zIndex: '0',
                    height: 'calc(100% - 100px)',
                }}
            /> */}
            <Navbar />
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100vh',
                }}
            >
                <img
                    src="./images/home-banner-image.jpg"
                    alt=""
                    style={{
                        flex: '.6',
                        height: '100%',
                    }}
                />

                <div className="homeRightContainer">
                    <h1>Bine ati venit!</h1>
                    <div className="divider"></div>
                    <Link to="/login" className="homeBtn">
                        Autentificati-va!
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
