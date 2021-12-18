import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Comenzi() {
    const { user: currentUser } = useSelector((state) => state.auth)

    return (
        <div className="ordersContainer">
            <div className="nav">
                <h1>6 Comenzi</h1>
                <Link
                    to={`/${
                        currentUser && currentUser.administrator === 'N'
                            ? 'angajat'
                            : 'admin'
                    }/dashboard/comenzi/creare`}
                >
                    <div className="addNewOrder">Plasati Comanda</div>
                </Link>
            </div>
            <div className="ordersInner" style={{ display: 'block' }}>
                <div className="order">
                    <div className="topOrderContainer">
                        <div className="topOrderLeft">
                            <div className="box">
                                <p className="heading">Comanda Plasata</p>
                                <p className="subheading">Oct 27, 2019</p>
                            </div>
                            <div className="box">
                                <p className="heading">Total</p>
                                <p className="subheading">120.00</p>
                            </div>
                        </div>
                        <div className="topOrderRight">
                            <div className="box">
                                <p className="heading">Comanda #123767</p>
                                <p className="subheading">Detalii Comanda</p>
                            </div>
                        </div>
                    </div>
                    <div className="middleOrderContainer">
                        <div className="middleLeft">
                            <div className="image">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm-19 5.78c0-.431.349-.78.78-.78h.428v1.125h-1.208v-.345zm0 .764h1.208v.968h-1.208v-.968zm0 1.388h1.208v1.068h-.428c-.431 0-.78-.349-.78-.78v-.288zm3 5.068h-3v-1h3v1zm1-4.78c0 .431-.349.78-.78.78h-.429v-1.068h1.209v.288zm0-.708h-1.209v-.968h1.209v.968zm0-1.387h-1.629v2.875h-.743v-4h1.592c.431 0 .78.349.78.78v.345zm4 6.875h-3v-1h3v1zm1-6.5c0-1.381 1.119-2.5 2.5-2.5.484 0 .937.138 1.32.377-.531.552-.857 1.3-.857 2.123 0 .824.327 1.571.857 2.123-.383.239-.836.377-1.32.377-1.381 0-2.5-1.119-2.5-2.5zm4 6.5h-3v-1h3v1zm5 0h-3v-1h3v1zm-2.5-4c-1.38 0-2.5-1.119-2.5-2.5s1.12-2.5 2.5-2.5c1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5z" />
                                </svg>
                            </div>
                            <div className="text">
                                <h1>Detalii Furnizor</h1>

                                <p>Doraly S.R.L.</p>
                                <p>
                                    - Bucuresti, Bucuresti, Strada Gloriei, 23
                                </p>
                                <p>- Nr. Telefon: 0987654321</p>
                            </div>
                        </div>
                        <div className="middleRight">
                            <Link
                                to={`/${
                                    currentUser &&
                                    currentUser.administrator === 'N'
                                        ? 'angajat'
                                        : 'admin'
                                }/dashboard/comenzi/comanda/1`}
                            >
                                <div className="btn-solid">Vezi Comanda</div>
                            </Link>
                            <div
                                className="btn-outlined"
                                style={{ marginTop: '20px' }}
                            >
                                Vezi Factura
                            </div>
                        </div>
                    </div>
                    <div className="bottomOrderContainer">
                        <p>
                            Livrare estimata: <span>Nov 15, 2019</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comenzi
