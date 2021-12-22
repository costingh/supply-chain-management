import React from 'react'
import AdaugaProduse from '../../components/AdaugaProduse'
import ListaProduseInStoc from '../../components/ListaProduseInStoc'

function Produse({ setData }) {
    return (
        <div className="tableContainer" style={{ flex: '1' }}>
            <ListaProduseInStoc setData={setData} />
        </div>
    )
}

export default Produse
