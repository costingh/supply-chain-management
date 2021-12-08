function AddSupplierPanel({ addNewSupplierInputs, handleChangeAddSupplier }) {
    return (
        <div className="inputs">
            {addNewSupplierInputs.map((item) => {
                return (
                    <div key={item.inputName} className="input">
                        <div className="topContainer">
                            <p>{item.label}</p>
                        </div>
                        <div className="inputContainer">
                            <svg
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="#e0e6f0"
                            >
                                <path d={item.path} />
                            </svg>
                            <input
                                type="text"
                                name={item.inputName}
                                id={item.inputName}
                                placeholder={item.placeholder}
                                ref={item.ref}
                                onChange={handleChangeAddSupplier}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AddSupplierPanel
