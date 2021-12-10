import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import UserService from '../../services/user.service'
import EventBus from '../../common/EventBus'
import Sidebar from '../../components/Sidebar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Furnizori from '../dashboardRoutes/Furnizori'
import Facturi from '../dashboardRoutes/Facturi'
import { listItems } from '../../utils/sidebarConfig'
import Angajati from '../dashboardRoutes/Angajati'
import { Link } from 'react-router-dom'
import Profile from '../../components/Profile'
import Produse from '../dashboardRoutes/Produse'
import Categorii from '../dashboardRoutes/Categorii'
import Comenzi from '../dashboardRoutes/Comenzi'

function AdminDashobard() {
    const { user: currentUser } = useSelector((state) => state.auth)
    const [redirect, setRedirect] = useState(false)
    const [activeTabName, setActiveTabName] = useState(listItems[0].name)

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                // the user has access to this page so load it
                if (response.data !== 'Admin Content.') setRedirect(true)
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

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    if (redirect) {
        return <Redirect to="/employee/dashboard" />
    }

    /* 
    user = {
        CNP: null
        administrator: "D"
        data_nastere: null      ​
        email: "popescu.ion@admin.com"      ​
        id_angajat: 4      ​
        id_departament: null    ​
        judet: null       ​
        numar: null   ​
        numar_telefon: null    ​
        nume: "Popescu"  ​
        oras: null    ​
        parola: "$2a$10$d7NWdX0W9S5XabGxkFOdauYvws61jnfwVpzz2YIDj00VlzD1DF.p6"    ​
        prenume: "Ion"  ​
        salariu: null  ​
        sex: "M"   ​
        strada: null
    } */

    /* 
    
    furnizor = {
        nume_furnizor: 'asdasd',
        strada: 'Fermei',
        numar: '33',
        oras: 'Bucuresti',
        judet: 'Bucuresti',
        nr_telefon: '0987654321',
    }
    */

    return (
        <Router>
            <div className="dashboard">
                <Sidebar
                    activeTabName={activeTabName}
                    setActiveTabName={setActiveTabName}
                    admin={true}
                />
                <div className="content">
                    {activeTabName === 'Profil' && (
                        <div className="nav">
                            <div className="departament">
                                Departamentul de Achizitii
                            </div>
                            <Link
                                to="/admin/dashboard/profil"
                                style={{
                                    textDecoration: 'none',
                                    color: '#e1e1e1',
                                }}
                            >
                                <div className="right">
                                    <p>{`${currentUser.nume} ${currentUser.prenume}`}</p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    )}

                    <div className="innerContent">
                        <Switch>
                            <Route path="/admin/dashboard/furnizori">
                                <Furnizori />
                            </Route>
                            <Route path="/admin/dashboard/facturi">
                                <Facturi />
                            </Route>
                            <Route path="/admin/dashboard/comenzi">
                                <Comenzi />
                            </Route>
                            <Route path="/admin/dashboard/angajati">
                                <Angajati />
                            </Route>
                            <Route path="/admin/dashboard/produse">
                                <Produse />
                            </Route>
                            <Route path="/admin/dashboard/categorii">
                                <Categorii />
                            </Route>
                            <Route path="/admin/dashboard/profil">
                                <Profile />
                            </Route>
                            <Route path="/admin/dashboard">
                                return <Redirect to="/admin/dashboard/profil" />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default AdminDashobard
