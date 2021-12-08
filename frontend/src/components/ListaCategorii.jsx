import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory } from '../actions/categories'

function ListaCategorii({
    categories,
    loading,
    deleteCategoryByName,
    setData,
}) {
    const [categoryToUpdate, setCategoryToUpdate] = useState('')
    const [nameInputValue, setNameInputValue] = useState('')
    const [descriptionInputValue, setNameDescriptionValue] = useState('')
    const [nameInputValueCopy, setNameInputValueCopy] = useState('')

    const dispatch = useDispatch()
    useEffect(() => {
        console.log(categories)
    }, [categories])

    if (loading) {
        return <h2>Loading...</h2>
    }

    const startUpdatingCategory = (category) => {
        if (categoryToUpdate) {
            dispatch(
                updateCategory(
                    nameInputValueCopy,
                    nameInputValue,
                    descriptionInputValue
                )
            ).then((data) => {
                setData(data)
                setCategoryToUpdate('')
            })
        } else {
            setCategoryToUpdate(category.nume_categorie)
            setNameInputValue(category.nume_categorie)
            setNameInputValueCopy(category.nume_categorie)
            setNameDescriptionValue(category.descriere_categorie)
        }
    }

    const handleNameChange = (e) => {
        setNameInputValue(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setNameDescriptionValue(e.target.value)
    }

    return (
        <>
            {categories &&
                categories.map((category) => (
                    <div className="row" key={category.nume_categorie}>
                        {categoryToUpdate === category.nume_categorie ? (
                            <>
                                <div className="categoryName">
                                    <input
                                        type="text"
                                        className="updateCategoryInput"
                                        value={nameInputValue}
                                        onChange={handleNameChange}
                                    />
                                </div>
                                <div className="categoryDescription">
                                    <input
                                        type="text"
                                        className="updateCategoryInput"
                                        value={descriptionInputValue}
                                        onChange={handleDescriptionChange}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="categoryName">
                                    <p>{category.nume_categorie}</p>
                                </div>
                                <div className="categoryDescription">
                                    <p>{category.descriere_categorie}</p>
                                </div>
                            </>
                        )}

                        <div className="actionsColumn">
                            <div className="actiuni">
                                <div
                                    className="delete"
                                    onClick={() =>
                                        deleteCategoryByName(
                                            category.nume_categorie
                                        )
                                    }
                                >
                                    Stergeti
                                </div>
                                <div
                                    className={`update ${
                                        categoryToUpdate ===
                                            category.nume_categorie && 'active'
                                    } `}
                                    onClick={() =>
                                        startUpdatingCategory(category)
                                    }
                                >
                                    {categoryToUpdate ===
                                    category.nume_categorie
                                        ? 'Gata'
                                        : 'Actualizati'}
                                </div>
                                <div className="visualise">
                                    <p>Vizualizati Produse</p>
                                    <svg
                                        width="24"
                                        height="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    )
}

export default ListaCategorii
