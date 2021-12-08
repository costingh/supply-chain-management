function DashboardPanelButtons({
    handleSubmitAddSupplier,
    setShowFilterPanelName,
    showFilterPanelName,
    handleSubmitUpdateSupplier,
}) {
    return (
        <div className="buttons">
            {showFilterPanelName === 'add' && (
                <div className="submitBtn" onClick={handleSubmitAddSupplier}>
                    Submit
                </div>
            )}
            {showFilterPanelName === 'update' && (
                <div className="submitBtn" onClick={handleSubmitUpdateSupplier}>
                    Submit
                </div>
            )}
            {showFilterPanelName !== 'search' ? (
                <div
                    className="closeBtn"
                    onClick={() => setShowFilterPanelName('search')}
                >
                    Close
                </div>
            ) : (
                <div className="closeBtn">Clear</div>
            )}
        </div>
    )
}

export default DashboardPanelButtons
