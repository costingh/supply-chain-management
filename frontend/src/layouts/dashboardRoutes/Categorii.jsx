import Pagination from '../../components/Pagination'
import { useState, useRef, useEffect } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'

// API routes
import { getAllCategories, deleteCategory } from '../../actions/categories'
import AdaugaCategorie from '../../components/AdaugaCategorie'

// Components
import Alert from '../../components/Alert'
import ListaCategorii from '../../components/ListaCategorii'

function Categorii() {
    const { categories } = useSelector((state) => state.categories)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [categoriesPerPage, setCategoriesPerPage] = useState(6)

    const dispatch = useDispatch()

    const [panel, setPanel] = useState('categories') // addCategory, categories, updateCategory
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        dispatch(getAllCategories()).then((data) => {
            // set redux categories store data
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (data) {
            document.querySelector('.overlay').classList.add('open')
        }
    }, [data])

    const closeAlert = () => {
        document.querySelector('.overlay').classList.remove('open')
    }

    const deleteCategoryByName = (name) => {
        dispatch(deleteCategory(name)).then((data) => {
            setData(data)
        })
    }

    const [currentCategories, setCurrentCategories] = useState([])

    useEffect(() => {
        if (categories) {
            // Get current categories
            const indexOfLastCategory = currentPage * categoriesPerPage
            const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage
            setCurrentCategories(
                categories.slice(indexOfFirstCategory, indexOfLastCategory)
            )
        }
    }, [categories, currentPage])

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="categories">
            <div className="inner">
                {panel === 'categories' && (
                    <>
                        <div className="categoriesHeading">
                            <div className="categoryName">
                                <span>Nume Categorie</span>
                            </div>
                            <div className="categoryDescription">
                                <span>Descriere Categorie</span>
                            </div>
                            <div className="actionsColumn">
                                <span>Actiuni</span>
                            </div>
                        </div>
                        <ListaCategorii
                            categories={currentCategories}
                            loading={loading}
                            deleteCategoryByName={deleteCategoryByName}
                            setData={setData}
                        />
                        <Pagination
                            itemsPerPage={categoriesPerPage}
                            totalItems={categories ? categories.length : 0}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </>
                )}
                {panel === 'addCategory' && (
                    <AdaugaCategorie setPanel={setPanel} setData={setData} />
                )}
                <div
                    className="addCategory"
                    onClick={() => setPanel('addCategory')}
                >
                    <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                    >
                        <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
                    </svg>
                </div>
            </div>
            <Alert data={data} closeAlert={closeAlert} redirect={'no'} />
        </div>
    )
}

export default Categorii
