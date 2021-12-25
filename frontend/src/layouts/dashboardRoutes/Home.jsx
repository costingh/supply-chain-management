import React from 'react'
import { Bar } from 'react-chartjs-2'
import BarChart from '../../components/BarChart'

function Home() {
    return (
        <div className="homeContainer">
            <nav>
                <h1>Bine ai revenit!</h1>
                <p>Wednesday, 18 August 2021</p>
            </nav>
            <div className="inner">
                <div className="innerL">
                    <div className="homeTop">
                        <div className="box">
                            <div className="icon">{/* svg */}</div>
                            <div>
                                <p>Orders</p>
                                <h2>2456</h2>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">{/* svg */}</div>
                            <div>
                                <p>Orders</p>
                                <h2>2456</h2>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">{/* svg */}</div>
                            <div>
                                <p>Orders</p>
                                <h2>2456</h2>
                            </div>
                        </div>
                        <div className="box">
                            <div className="icon">{/* svg */}</div>
                            <div>
                                <p>Orders</p>
                                <h2>2456</h2>
                            </div>
                        </div>
                    </div>
                    <div className="middle">
                        <BarChart />
                    </div>
                    <div className="bottom"></div>
                </div>
                <div className="innerR">
                    <div className="innerRtop"></div>
                    <div className="innerRbottom"></div>
                </div>
            </div>
        </div>
    )
}

export default Home
