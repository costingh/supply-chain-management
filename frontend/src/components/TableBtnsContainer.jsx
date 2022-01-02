import React from 'react'

function TableBtnsContainer({
    setShowFilterPanelName,
    deleteRecords,
    isAdmin,
}) {
    return (
        <div className="actions">
            <div
                className="btn add"
                onClick={() => setShowFilterPanelName('add')}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
                </svg>
                <p>Adaugati</p>
            </div>
            <div
                className="btn update"
                onClick={() => setShowFilterPanelName('update')}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                </svg>
                <p>Editati</p>
            </div>
            {isAdmin && (
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
            )}
        </div>
    )
}

export default TableBtnsContainer
