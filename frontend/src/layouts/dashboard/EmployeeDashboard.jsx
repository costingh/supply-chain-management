import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Alert from '../../components/Alert'
import EventBus from '../../common/EventBus'
import Sidebar from '../../components/Sidebar'
import Profile from '../../components/Profile'
import Comanda from '../../components/Comanda'
import Produse from '../dashboardRoutes/Produse'
import Comenzi from '../dashboardRoutes/Comenzi'
import Facturi from '../dashboardRoutes/Facturi'
import Angajati from '../dashboardRoutes/Angajati'
import Furnizori from '../dashboardRoutes/Furnizori'
import Categorii from '../dashboardRoutes/Categorii'
import UserService from '../../services/user.service'
import { listItems } from '../../utils/sidebarConfig'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreareComanda from '../../components/CreareComanda'
import EditareComanda from '../../components/EditareComanda'
import Home from '../dashboardRoutes/Home'

function EmployeeDashboard() {
    const { user: currentUser } = useSelector((state) => state.auth)
    const [redirect, setRedirect] = useState(false)
    const [redirectTo, setRedirectTo] = useState('')
    const [activeTabName, setActiveTabName] = useState(listItems[0].name)
    const [data, setData] = useState(null)

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                // the user has access to this page so load it
                if (response.data !== 'User Content.') setRedirect(true)
            },
            (error) => {
                // user doesn't has access to this page
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch('logout')
                }

                if (error.response && error.response.status === 403) {
                    setRedirect(true)
                }
            }
        )
    }, [])

    useEffect(() => {
        if (data) document.querySelector('.overlay').classList.add('open')
    }, [data])

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    if (redirect) {
        return <Redirect to="/admin/dashboard" />
    }

    const closeAlert = () => {
        document.querySelector('.overlay').classList.remove('open')
    }

    return (
        <Router>
            <div className="dashboard">
                <Sidebar
                    activeTabName={activeTabName}
                    setActiveTabName={setActiveTabName}
                    admin={false}
                />
                <div className="content">
                    <div className="innerContent">
                        <Alert
                            data={data}
                            closeAlert={closeAlert}
                            redirect={'no'}
                            redirectTo={redirectTo}
                        />
                        <Switch>
                            <Route path="/employee/dashboard/furnizori">
                                <Furnizori />
                            </Route>
                            <Route path="/employee/dashboard/facturi">
                                <Facturi setData={setData} />
                            </Route>
                            <Route path="/employee/dashboard/comenzi/creare">
                                <CreareComanda />
                            </Route>
                            <Route path="/employee/dashboard/comenzi/comanda/editati/">
                                <EditareComanda />
                            </Route>
                            <Route path="/employee/dashboard/comenzi/comanda/">
                                <Comanda />
                            </Route>
                            <Route path="/employee/dashboard/comenzi">
                                <Comenzi setData={setData} />
                            </Route>
                            <Route path="/employee/dashboard/angajati">
                                <Angajati setData={setData} />
                            </Route>
                            <Route path="/employee/dashboard/produse">
                                <Produse
                                    setData={setData}
                                    setRedirectTo={setRedirectTo}
                                />
                            </Route>
                            <Route path="/employee/dashboard/home">
                                <Home />
                            </Route>
                            {/* <Route path="/admin/dashboard/categorii">
                                <Categorii />
                            </Route> */}
                            <Route path="/employee/dashboard/profil">
                                <Profile />
                            </Route>
                            <Route path="/employee/dashboard">
                                return{' '}
                                <Redirect to="/employee/dashboard/home" />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default EmployeeDashboard
