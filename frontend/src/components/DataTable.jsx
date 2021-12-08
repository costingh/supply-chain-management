import { DataGrid } from '@mui/x-data-grid'

export default function DataTable({
    columns,
    rows,
    selectionModel,
    setSelectionModel,
}) {
    return (
        <div
            style={{
                height: '80%',
                width: '90%',
                background: '#1e2835',
                borderRadius: '20px',
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel)
                }}
                selectionModel={selectionModel}
                checkboxSelection
            />
        </div>
    )
}
