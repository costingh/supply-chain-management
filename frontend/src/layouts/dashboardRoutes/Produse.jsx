import React from 'react'
import AdaugaProduse from '../../components/AdaugaProduse'
import ListaProduseInStoc from '../../components/ListaProduseInStoc'

function Produse({ setData, setRedirectTo }) {
    return (
        <div className="tableContainer" style={{ flex: '1' }}>
            <ListaProduseInStoc
                setData={setData}
                setRedirectTo={setRedirectTo}
            />
        </div>
    )
}

export default Produse
