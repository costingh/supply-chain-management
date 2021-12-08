import React from 'react'

function ListaProduseInStoc() {
    return (
        <div className="produse">
            <div className="produs">
                <div className="image">
                    <img src="/images/banane.png" alt="banane" />
                </div>
                <div className="text">
                    <p className="pret">5.49 Lei</p>
                    <p className="numeProdus">Banane</p>
                    <div className="categStoc">
                        <p className="stoc">In stoc</p>
                        <p className="categorie">Fructe si legume</p>
                    </div>
                    <div className="productBtns">
                        <div className="factura">
                            <img src="/images/factura.svg" alt="" />
                        </div>
                        <div className="comanda">
                            <img src="/images/comanda.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="produs">
                <div className="image">
                    <img src="/images/carrots.png" alt="banane" />
                </div>
                <div className="text">
                    <p className="pret">2.09 Lei</p>
                    <p className="numeProdus">Morcovi</p>
                    <div className="categStoc">
                        <p className="stoc">In stoc</p>
                        <p className="categorie">Fructe si legume</p>
                    </div>
                    <div className="productBtns">
                        <div className="factura">
                            <img src="/images/factura.svg" alt="" />
                        </div>
                        <div className="comanda">
                            <img src="/images/comanda.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="produs">
                <div className="image">
                    <img src="/images/ceapa.png" alt="banane" />
                </div>
                <div className="text">
                    <p className="pret">0.99 Lei</p>
                    <p className="numeProdus">Ceapa verde romaneasca</p>
                    <div className="categStoc">
                        <p className="stoc">In stoc</p>
                        <p className="categorie">Fructe si legume</p>
                    </div>
                    <div className="productBtns">
                        <div className="factura">
                            <img src="/images/factura.svg" alt="" />
                        </div>
                        <div className="comanda">
                            <img src="/images/comanda.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListaProduseInStoc
