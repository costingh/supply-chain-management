import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../actions/categories'

export default function AdaugaCategorie({ setPanel, setData }) {
    const dispatch = useDispatch()

    const [nume, setNume] = useState('')
    const [descriere, setDescriere] = useState('')

    const handleNameChange = (evt) => {
        setNume(evt.target.value)
    }

    const handleDescriptionChange = (evt) => {
        setDescriere(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addCategory(nume, descriere)).then((data) => {
            setData(data)
        })
    }

    return (
        <div className="addNewCategoryPanel">
            <h1>Adaugati o categorie noua</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '70%' },
                }}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    required
                    id="denumireCategorie"
                    label="Denumire"
                    value={nume}
                    onChange={handleNameChange}
                />
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={5}
                    maxRows={10}
                    placeholder="Adaugati o scurta descriere."
                    style={{ width: '70%', marginTop: '50px' }}
                    className="textarea"
                    value={descriere}
                    onChange={handleDescriptionChange}
                />
                <button className="submit" type="submit">
                    Adaugati categoria
                </button>
                <div className="back" onClick={() => setPanel('categories')}>
                    Anulati
                </div>
            </Box>
        </div>
    )
}
