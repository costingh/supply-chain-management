import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, updateProfile } from '../actions/employees'

function Profile() {
    const [validPhoneNumber, setValidPhoneNumber] = useState(true)
    const [validSsn, setValidSsn] = useState(true)
    const { user } = useSelector((state) => state.auth)
    const { profile } = useSelector((state) => state.employees)
    const [currentUserProfile, setCurrentUserProfile] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile(user.email)).then((data) => {})
    }, [])

    const [formState, setFormState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        ssn: '',
        street: '',
        houseNumber: '',
        county: '',
        city: '',
        sex: '',
        birthDate: '',
    })

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const ssnRef = useRef()
    const streetRef = useRef()
    const houseNumberRef = useRef()
    const countyRef = useRef()
    const cityRef = useRef()
    const sexRef = useRef()
    const birthDateRef = useRef()

    const inputs = [
        {
            label: 'Nume *',
            svg: 'M12 0c-5.083 0-8.465 4.949-3.733 13.678 1.596 2.945-1.725 3.641-5.09 4.418-3.073.709-3.187 2.235-3.177 4.904l.004 1h23.99l.004-.969c.012-2.688-.093-4.223-3.177-4.935-3.438-.794-6.639-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.731-13.678m0 1c1.89 0 3.39.764 4.225 2.15 1.354 2.251.866 5.824-1.377 10.06-.577 1.092-.673 2.078-.283 2.932.937 2.049 4.758 2.632 6.032 2.928 2.303.534 2.412 1.313 2.401 3.93h-21.998c-.01-2.615.09-3.396 2.401-3.93 1.157-.266 5.138-.919 6.049-2.94.387-.858.284-1.843-.304-2.929-2.231-4.115-2.744-7.764-1.405-10.012.84-1.412 2.353-2.189 4.259-2.189',
            ref: lastNameRef,
            name: 'lastname',
            placeholder: 'Popescu',
            type: 'text',
            required: true,
        },
        {
            label: 'Prenume *',
            svg: 'M12 0c-5.083 0-8.465 4.949-3.733 13.678 1.596 2.945-1.725 3.641-5.09 4.418-3.073.709-3.187 2.235-3.177 4.904l.004 1h23.99l.004-.969c.012-2.688-.093-4.223-3.177-4.935-3.438-.794-6.639-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.731-13.678m0 1c1.89 0 3.39.764 4.225 2.15 1.354 2.251.866 5.824-1.377 10.06-.577 1.092-.673 2.078-.283 2.932.937 2.049 4.758 2.632 6.032 2.928 2.303.534 2.412 1.313 2.401 3.93h-21.998c-.01-2.615.09-3.396 2.401-3.93 1.157-.266 5.138-.919 6.049-2.94.387-.858.284-1.843-.304-2.929-2.231-4.115-2.744-7.764-1.405-10.012.84-1.412 2.353-2.189 4.259-2.189',
            ref: firstNameRef,
            name: 'firstname',
            placeholder: 'Ion',
            type: 'text',
            required: true,
        },
        {
            label: 'Email *',
            svg: 'M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z',
            ref: emailRef,
            name: 'email',
            placeholder: 'john.doe@gmail.com',
            type: 'email',
            required: true,
        },
        {
            label: 'Telefon',
            svg: 'M8.26 1.289l-1.564.772c-5.793 3.02 2.798 20.944 9.31 20.944.46 0 .904-.094 1.317-.284l1.542-.755-2.898-5.594-1.54.754c-.181.087-.384.134-.597.134-2.561 0-6.841-8.204-4.241-9.596l1.546-.763-2.875-5.612zm7.746 22.711c-5.68 0-12.221-11.114-12.221-17.832 0-2.419.833-4.146 2.457-4.992l2.382-1.176 3.857 7.347-2.437 1.201c-1.439.772 2.409 8.424 3.956 7.68l2.399-1.179 3.816 7.36s-2.36 1.162-2.476 1.215c-.547.251-1.129.376-1.733.376',
            ref: phoneRef,
            name: 'phoneNumber',
            placeholder: '0123456789',
            type: 'text',
        },
        {
            label: 'CNP',
            svg: 'M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-4 13v1h-4v-1h4zm-6.002 1h-10.997l-.001-.914c-.004-1.05-.007-2.136 1.711-2.533.789-.182 1.753-.404 1.892-.709.048-.108-.04-.301-.098-.407-1.103-2.036-1.305-3.838-.567-5.078.514-.863 1.448-1.359 2.562-1.359 1.105 0 2.033.488 2.545 1.339.737 1.224.542 3.033-.548 5.095-.057.106-.144.301-.095.41.14.305 1.118.531 1.83.696 1.779.41 1.773 1.503 1.767 2.56l-.001.9zm-9.998-1h8.999c.003-1.014-.055-1.27-.936-1.473-1.171-.27-2.226-.514-2.57-1.267-.174-.381-.134-.816.119-1.294.921-1.739 1.125-3.199.576-4.111-.332-.551-.931-.855-1.688-.855-.764 0-1.369.31-1.703.871-.542.91-.328 2.401.587 4.09.259.476.303.912.13 1.295-.342.757-1.387.997-2.493 1.252-.966.222-1.022.478-1.021 1.492zm18-3v1h-6v-1h6zm0-3v1h-6v-1h6zm0-3v1h-6v-1h6z',
            ref: ssnRef,
            name: 'ssn',
            placeholder: '1234567891234',
            type: 'text',
        },
        {
            label: 'Strada',
            svg: 'M12 2h2v2h2v3.702l7 2.618v12.68h1v1h-24v-1h1v-11h6v-8h2v-2h2v-2h1v2zm3 3h-7v18h1v-2h5v2h1v-18zm-2 17h-3v1h3v-1zm8 1h1v-11.987l-6-2.243v14.23h1v-2h4v2zm-14-10h-5v10h1v-2h3v2h1v-10zm-2 9h-1v1h1v-1zm15 0h-2v1h2v-1zm-16-5v2h-1v-2h1zm2 0v2h-1v-2h1zm5-10v12h-1v-12h1zm10 11v1h-4v-1h4zm-8-11v12h-1v-12h1zm8 9v1h-4v-1h4zm-17-2v2h-1v-2h1zm2 0v2h-1v-2h1zm15 0v1h-4v-1h4zm0-2v1h-4v-1h4zm-8-9h-3v1h3v-1z',
            ref: streetRef,
            name: 'street',
            placeholder: 'Strada Gloriei',
            type: 'text',
        },
        {
            label: 'Numar',
            svg: 'M12 2h2v2h2v3.702l7 2.618v12.68h1v1h-24v-1h1v-11h6v-8h2v-2h2v-2h1v2zm3 3h-7v18h1v-2h5v2h1v-18zm-2 17h-3v1h3v-1zm8 1h1v-11.987l-6-2.243v14.23h1v-2h4v2zm-14-10h-5v10h1v-2h3v2h1v-10zm-2 9h-1v1h1v-1zm15 0h-2v1h2v-1zm-16-5v2h-1v-2h1zm2 0v2h-1v-2h1zm5-10v12h-1v-12h1zm10 11v1h-4v-1h4zm-8-11v12h-1v-12h1zm8 9v1h-4v-1h4zm-17-2v2h-1v-2h1zm2 0v2h-1v-2h1zm15 0v1h-4v-1h4zm0-2v1h-4v-1h4zm-8-9h-3v1h3v-1z',
            ref: houseNumberRef,
            name: 'houseNumber',
            placeholder: '23',
            type: 'text',
        },
        {
            label: 'Judet',
            svg: 'M12 2h2v2h2v3.702l7 2.618v12.68h1v1h-24v-1h1v-11h6v-8h2v-2h2v-2h1v2zm3 3h-7v18h1v-2h5v2h1v-18zm-2 17h-3v1h3v-1zm8 1h1v-11.987l-6-2.243v14.23h1v-2h4v2zm-14-10h-5v10h1v-2h3v2h1v-10zm-2 9h-1v1h1v-1zm15 0h-2v1h2v-1zm-16-5v2h-1v-2h1zm2 0v2h-1v-2h1zm5-10v12h-1v-12h1zm10 11v1h-4v-1h4zm-8-11v12h-1v-12h1zm8 9v1h-4v-1h4zm-17-2v2h-1v-2h1zm2 0v2h-1v-2h1zm15 0v1h-4v-1h4zm0-2v1h-4v-1h4zm-8-9h-3v1h3v-1z',
            ref: countyRef,
            name: 'county',
            placeholder: 'Dambovita',
            type: 'text',
        },
        {
            label: 'Oras',
            svg: 'M12 2h2v2h2v3.702l7 2.618v12.68h1v1h-24v-1h1v-11h6v-8h2v-2h2v-2h1v2zm3 3h-7v18h1v-2h5v2h1v-18zm-2 17h-3v1h3v-1zm8 1h1v-11.987l-6-2.243v14.23h1v-2h4v2zm-14-10h-5v10h1v-2h3v2h1v-10zm-2 9h-1v1h1v-1zm15 0h-2v1h2v-1zm-16-5v2h-1v-2h1zm2 0v2h-1v-2h1zm5-10v12h-1v-12h1zm10 11v1h-4v-1h4zm-8-11v12h-1v-12h1zm8 9v1h-4v-1h4zm-17-2v2h-1v-2h1zm2 0v2h-1v-2h1zm15 0v1h-4v-1h4zm0-2v1h-4v-1h4zm-8-9h-3v1h3v-1z',
            ref: cityRef,
            name: 'city',
            placeholder: 'Brasov',
            type: 'text',
        },
        {
            label: 'Femeie/Barbat ',
            svg: 'M16.5 14.492c0 .828-.56 1.5-1.25 1.5s-1.25-.671-1.25-1.5.56-1.5 1.25-1.5 1.25.672 1.25 1.5zm-7.75-1.5c-.69 0-1.25.672-1.25 1.5s.56 1.5 1.25 1.5 1.25-.672 1.25-1.5-.56-1.5-1.25-1.5zm3.25 8.354c2.235 0 3-2.354 3-2.354h-6s.847 2.354 3 2.354zm12-6.041c0 1.765-.985 3.991-3.139 4.906-2.348 3.731-5.484 5.781-8.861 5.781-3.377 0-6.513-2.05-8.862-5.781-2.153-.915-3.138-3.141-3.138-4.906 0-1.472.387-2.937 1.682-3.636-.377-2.311-.117-6.176 4.193-7.593 1.031-1.99 3.125-4.084 6.125-4.084s5.094 2.094 6.125 4.083c4.31 1.418 4.57 5.282 4.193 7.594 1.295.699 1.682 2.164 1.682 3.636zm-2.176-1.252c-4.687-.258-6.833-4.66-7.241-7.394-1.167 6.333-9 1.792-9.896 9.052-.886-.467-1.715-1.308-2.215-2.159-.996.997-.54 4.154 1.661 4.899.224.076.413.228.535.43 1.991 3.296 4.595 5.111 7.332 5.111s5.34-1.815 7.331-5.111c.122-.202.312-.354.535-.43 1.771-.599 2.517-2.769 1.958-4.398z',
            ref: sexRef,
            name: 'sex',
            placeholder: 'F sau B',
            type: 'text',
        },
        {
            label: 'Data Nastere',
            svg: 'M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z',
            ref: birthDateRef,
            name: 'birthDate',
            placeholder: 'Data Nastere',
            type: 'date',
        },
    ]

    const handleChange = (evt) => {
        let value = evt.target.value

        if (evt.target.name === 'phoneNumber') {
            if (value.length < 10 && value.length > 0)
                setValidPhoneNumber(false)
            else setValidPhoneNumber(true)
        }

        if (evt.target.name === 'ssn') {
            if (value.length < 13 && value.length > 0) setValidSsn(false)
            else setValidSsn(true)
        }

        setFormState({
            ...formState,
            [evt.target.name]: value,
        })
    }

    useEffect(() => {
        if (profile) {
            const prenume = profile[0].prenume
            const nume = profile[0].nume
            const email = profile[0].email
            const CNP = profile[0].CNP ? profile[0].CNP : '-'
            const numar_telefon = profile[0].numar_telefon
                ? profile[0].numar_telefon
                : '-'
            const strada = profile[0].strada ? profile[0].strada : '-'
            const numar = profile[0].numar ? profile[0].numar : '-'
            const judet = profile[0].judet ? profile[0].judet : '-'
            const oras = profile[0].oras ? profile[0].oras : '-'
            const sex = profile[0].sex
            const data_nastere = profile[0].data_nastere
                ? profile[0].data_nastere.substring(0, 10)
                : '-'

            setCurrentUserProfile({
                firstname: prenume,
                lastname: nume,
                email: email,
                phoneNumber: numar_telefon,
                ssn: CNP,
                street: strada,
                houseNumber: numar,
                county: judet,
                city: oras,
                sex: sex,
                birthDate: data_nastere,
            })

            firstNameRef.current.value = prenume
            lastNameRef.current.value = nume
            emailRef.current.value = email
            phoneRef.current.value = numar_telefon
            ssnRef.current.value = CNP
            streetRef.current.value = strada
            houseNumberRef.current.value = numar
            countyRef.current.value = judet
            cityRef.current.value = oras
            sexRef.current.value = sex
            birthDateRef.current.value = data_nastere

            setFormState({
                firstname: prenume,
                lastname: nume,
                email: email,
                phoneNumber: numar_telefon,
                ssn: CNP,
                street: strada,
                houseNumber: numar,
                county: judet,
                city: oras,
                sex: sex,
                birthDate: data_nastere,
            })
            //salariu
        }
    }, [profile])

    const update = () => {
        if (
            formState.firstname == currentUserProfile.firstname &&
            formState.lastname == currentUserProfile.lastname &&
            formState.email == currentUserProfile.email &&
            formState.phoneNumber == currentUserProfile.phoneNumber &&
            formState.ssn == currentUserProfile.ssn &&
            formState.street == currentUserProfile.street &&
            formState.houseNumber == currentUserProfile.houseNumber &&
            formState.county == currentUserProfile.county &&
            formState.city == currentUserProfile.city &&
            formState.sex == currentUserProfile.sex &&
            formState.birthDate == currentUserProfile.birthDate.substring(0, 10)
        )
            alert('No changes were made!')
        else {
            // refresh page after profile was updated
            dispatch(
                updateProfile(
                    profile[0].email,
                    formState.firstname,
                    formState.lastname,
                    formState.email,
                    formState.phoneNumber,
                    formState.ssn,
                    formState.street,
                    formState.houseNumber,
                    formState.county,
                    formState.city,
                    formState.sex,
                    formState.birthDate
                )
            ).then((data) => {
                console.log(data)
            })
            const updatedProfile = {
                firstname: formState.firstname,
                lastname: formState.lastname,
                email: formState.email,
                phoneNumber: formState.phoneNumber,
                ssn: formState.ssn,
                street: formState.street,
                houseNumber: formState.houseNumber,
                county: formState.county,
                city: formState.city,
                sex: formState.sex,
                birthDate: formState.birthDate,
            }
            setCurrentUserProfile(updatedProfile)
            setFormState(updatedProfile)
            alert('Profile updated')
        }
    }

    const reset = () => {
        console.log(profile[0])
        const prenume = profile[0].prenume
        const nume = profile[0].nume
        const email = profile[0].email
        const CNP = profile[0].CNP ? profile[0].CNP : '-'
        const numar_telefon = profile[0].numar_telefon
            ? profile[0].numar_telefon
            : '-'
        const strada = profile[0].strada ? profile[0].strada : '-'
        const numar = profile[0].numar ? profile[0].numar : '-'
        const judet = profile[0].judet ? profile[0].judet : '-'
        const oras = profile[0].oras ? profile[0].oras : '-'
        const sex = profile[0].sex
        const data_nastere = profile[0].data_nastere
            ? profile[0].data_nastere.substring(0, 10)
            : '-'

        firstNameRef.current.value = prenume
        lastNameRef.current.value = nume
        emailRef.current.value = email
        phoneRef.current.value = numar_telefon
        ssnRef.current.value = CNP
        streetRef.current.value = strada
        houseNumberRef.current.value = numar
        countyRef.current.value = judet
        cityRef.current.value = oras
        sexRef.current.value = sex
        birthDateRef.current.value = data_nastere.substring(0, 10)

        setFormState({
            firstname: prenume,
            lastname: nume,
            email: email,
            phoneNumber: numar_telefon,
            ssn: CNP,
            street: strada,
            houseNumber: numar,
            county: judet,
            city: oras,
            sex: sex,
            birthDate: data_nastere.substring(0, 10),
        })
    }

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
                    <p>Date Personale</p>
                    <div className="column">
                        <span>Nume:</span>
                        <input
                            type={inputs[0].type}
                            name={inputs[0].name}
                            id={inputs[0].name}
                            placeholder={inputs[0].placeholder}
                            onChange={handleChange}
                            ref={inputs[0].ref}
                        />
                    </div>
                    <div className="column">
                        <span>Prenume:</span>
                        <input
                            type={inputs[1].type}
                            name={inputs[1].name}
                            id={inputs[1].name}
                            placeholder={inputs[1].placeholder}
                            onChange={handleChange}
                            ref={inputs[1].ref}
                        />
                    </div>
                    <div className="column">
                        <span>Gen:</span>
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
                        </select>
                    </div>
                </div>
                <div className="row">
                    <p>Date Contact</p>
                    <div className="column">
                        <span>Telefon:</span>
                        <input
                            type={inputs[3].type}
                            name={inputs[3].name}
                            id={inputs[3].name}
                            placeholder={inputs[3].placeholder}
                            onChange={handleChange}
                            ref={inputs[3].ref}
                        />
                    </div>
                    <div className="column">
                        <span>CNP:</span>
                        <input
                            type={inputs[4].type}
                            name={inputs[4].name}
                            id={inputs[4].name}
                            placeholder={inputs[4].placeholder}
                            onChange={handleChange}
                            ref={inputs[4].ref}
                        />
                    </div>
                    <div className="column">
                        <span>Data nasterii:</span>
                        <input
                            type={inputs[10].type}
                            name={inputs[10].name}
                            id={inputs[10].name}
                            placeholder={inputs[10].placeholder}
                            onChange={handleChange}
                            ref={inputs[10].ref}
                        />
                    </div>
                </div>
                <div
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
                </div>
                <div className="row">
                    <p>Adresa</p>
                    <div className="column">
                        <span>Numar:</span>
                        <input
                            type={inputs[6].type}
                            name={inputs[6].name}
                            id={inputs[6].name}
                            placeholder={inputs[6].placeholder}
                            onChange={handleChange}
                            ref={inputs[6].ref}
                        />
                    </div>
                    <div className="column">
                        <span>Judet:</span>
                        <input
                            type={inputs[7].type}
                            name={inputs[7].name}
                            id={inputs[7].name}
                            placeholder={inputs[7].placeholder}
                            onChange={handleChange}
                            ref={inputs[7].ref}
                        />
                    </div>
                    <div className="column">
                        <span>Oras:</span>
                        <input
                            type={inputs[8].type}
                            name={inputs[8].name}
                            id={inputs[8].name}
                            placeholder={inputs[8].placeholder}
                            onChange={handleChange}
                            ref={inputs[8].ref}
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
                        <span>Strada:</span>
                        <input
                            type={inputs[5].type}
                            name={inputs[5].name}
                            id={inputs[5].name}
                            placeholder={inputs[5].placeholder}
                            onChange={handleChange}
                            ref={inputs[5].ref}
                        />
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                </div>
                <div className="absolute">
                    <div className="updateBtn" onClick={update}>
                        Update
                    </div>
                    <div className="resetBtn" onClick={reset}>
                        Reset
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
