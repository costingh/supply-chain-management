import React, { useEffect } from 'react'

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    useEffect(() => {
        console.log('Current Page: ' + currentPage)
        console.log('Total Items: ' + totalItems)
        console.log('Items per Page: ' + itemsPerPage)
        console.log('ceil: ' + Math.ceil(totalItems / itemsPerPage))
    }, [currentPage, totalItems, itemsPerPage])

    return (
        <div className="pagination">
            {pageNumbers.map((number) => (
                <div
                    key={number}
                    className={`page-item ${
                        number === currentPage && 'active'
                    }`}
                    onClick={() => paginate(number)}
                >
                    <span>{number}</span>
                </div>
            ))}
        </div>
    )
}

export default Pagination
