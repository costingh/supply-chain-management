import React from 'react'

function TableBtnsContainer({
    grid,
    setGrid,
    deleteRecords,
    isAdmin,
    invoices,
}) {
    return (
        <div
            className="actions"
            style={{ width: '100%', padding: '15px 40px' }}
        >
            {isAdmin ? (
                <div className="btn delete" onClick={deleteRecords}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M21 6l-3 18h-12l-3-18h2.028l2.666 16h8.611l2.666-16h2.029zm-4.711-4c-.9 0-1.631-1.099-1.631-2h-5.316c0 .901-.73 2-1.631 2h-5.711v2h20v-2h-5.711z" />
                    </svg>
                    <p>Stergeti</p>
                </div>
            ) : (
                <div
                    style={{
                        color: '#e1e1e1',
                        fontSize: '23px',
                        fontWeight: '500',
                    }}
                >
                    {invoices && `${invoices.length} Facturi`}
                </div>
            )}
            <div style={{ display: 'flex', columnGap: '20px' }}>
                <div
                    className={
                        grid === 'grid' ? 'tableGrid active' : 'tableGrid'
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setGrid('grid')}
                    >
                        <path d="M11 11h-11v-11h11v11zm13 0h-11v-11h11v11zm-13 13h-11v-11h11v11zm13 0h-11v-11h11v11z" />
                    </svg>
                </div>
                <div
                    className={
                        grid === 'table' ? 'tableGrid active' : 'tableGrid'
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{
                            transform: 'rotate(90deg)',
                            cursor: 'pointer',
                        }}
                        onClick={() => setGrid('table')}
                    >
                        <path d="M6 24h-6v-24h6v24zm9-24h-6v24h6v-24zm9 0h-6v24h6v-24z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default TableBtnsContainer
