import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdminDashobard from './layouts/dashboard/AdminDashboard'
import EmployeeDashobard from './layouts/dashboard/EmployeeDashboard'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import './App.css'
import Navbar from './layouts/home/Navbar'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { history } from './helpers/history'
import { clearMessage } from './actions/message'

export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()) // clear message when changing location
        })
    }, [dispatch])

    return (
        <Router>
            <div>
                {/* <Navbar /> */}
                <Switch>
                    <Route path="/admin/dashboard">
                        <AdminDashobard />
                    </Route>
                    <Route path="/employee/dashboard">
                        <EmployeeDashobard />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
