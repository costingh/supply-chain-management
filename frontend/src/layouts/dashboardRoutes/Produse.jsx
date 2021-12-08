import React from 'react'
import AdaugaProduse from '../../components/AdaugaProduse'
import ListaProduseInStoc from '../../components/ListaProduseInStoc'

function Produse() {
    return (
        <div className="tableContainer" style={{ flex: '1' }}>
            {/* <AdaugaProduse /> */}
            <ListaProduseInStoc />
        </div>
    )
}

export default Produse
