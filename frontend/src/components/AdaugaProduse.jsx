import React from 'react'

function AdaugaProduse() {
    return (
        <div className="profile">
            <div className="inner">
                <div
                    className="row"
                    style={{
                        borderBottom: '1px solid #455261',
                        marginBottom: '40px',
                    }}
                >
                    <p>Alegeti furnizorul</p>
                    <div className="column">
                        <span>Nume:</span>
                        <input
                            type="text"
                            name="numeFurnizor"
                            id="numeFurnizor"
                            placeholder="Furnizor"
                        />
                    </div>
                    <div className="column">
                        {/* <span>Prenume:</span>
                        <input
                            type={inputs[1].type}
                            name={inputs[1].name}
                            id={inputs[1].name}
                            placeholder={inputs[1].placeholder}
                            onChange={handleChange}
                            ref={inputs[1].ref}
                        /> */}
                    </div>
                    <div className="column">
                        {/* <span>Gen:</span>
                        <select
                            type={inputs[9].type}
                            name={inputs[9].name}
                            id={inputs[9].name}
                            ref={inputs[9].ref}
                            onChange={handleChange}
                        >
                            <option value="B" selected="selected">
                                Barbat
                            </option>
                            <option value="F">Femeie</option>
                        </select> */}
                    </div>
                </div>
                <div
                    className="row"
                    style={{
                        borderBottom: '1px solid #455261',
                        marginBottom: '40px',
                    }}
                >
                    <p>Alegeti o categorie</p>
                    <div className="column">
                        <span>Categorie:</span>
                        <input
                            type="text"
                            name="categorieProdus"
                            id="categorieProdus"
                            placeholder="Alimente"
                        />
                    </div>
                    <div className="column">
                        {/* <span>CNP:</span>
                        <input
                            type={inputs[4].type}
                            name={inputs[4].name}
                            id={inputs[4].name}
                            placeholder={inputs[4].placeholder}
                            onChange={handleChange}
                            ref={inputs[4].ref}
                        /> */}
                    </div>
                    <div className="column">
                        {/*  <span>Data nasterii:</span>
                        <input
                            type={inputs[10].type}
                            name={inputs[10].name}
                            id={inputs[10].name}
                            placeholder={inputs[10].placeholder}
                            onChange={handleChange}
                            ref={inputs[10].ref}
                        /> */}
                    </div>
                </div>
                {/* <div
                    className="row"
                    style={{
                        paddingTop: '0px',
                        borderBottom: '1px solid #455261',
                        marginBottom: '40px',
                    }}
                >
                    <div className="column">
                        <span>Email:</span>
                        <input
                            type={inputs[2].type}
                            name={inputs[2].name}
                            id={inputs[2].name}
                            placeholder={inputs[2].placeholder}
                            onChange={handleChange}
                            ref={inputs[2].ref}
                        />
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                </div> */}
                <div className="row">
                    <p>Nume si cantitate</p>
                    <div className="column">
                        <span>Denumire:</span>
                        <input
                            type="text"
                            name="denumireProdus"
                            id="denumireProdus"
                            placeholder="Denumire"
                        />
                    </div>
                    <div className="column">
                        <span>Cantitate:</span>
                        <input
                            type="text"
                            name="cantitateProdus"
                            id="cantitateProdus"
                            placeholder="Cantitate"
                        />
                    </div>
                    <div className="column">
                        <span>Total:</span>
                        <input
                            type="text"
                            name="total"
                            id="total"
                            placeholder="12378.99 RON"
                        />
                    </div>
                </div>
                <div
                    className="row"
                    style={{
                        paddingTop: '0px',
                    }}
                >
                    <div className="column">
                        <span>Setati Pret:</span>
                        <input
                            type="text"
                            name="pret"
                            id="pret"
                            placeholder="50 RON/buc"
                        />
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                </div>
                <div className="absolute">
                    <div className="updateBtn">Update</div>
                    <div className="resetBtn">Reset</div>
                </div>
            </div>
        </div>
    )
}

export default AdaugaProduse
