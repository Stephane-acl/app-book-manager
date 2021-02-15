import React, {useState, useEffect} from 'react';
import Field from "../../components/forms/Field";
import {Link} from "react-router-dom";
import API from "../../services/API";
import {toast} from "react-toastify";
import FormContentLoader from "../../components/loaders/FormContentLoader";

const LibraryPage = ({history, match}) => {

    const {id} = match.params;
    const [loading, setLoading] = useState(false);
    const [library, setLibrary] = useState({
        label: '',
        address: '',
        cpo: '',
        city: ''
    });

    const [errors, setErrors] = useState({
        label: '',
        address: '',
        cpo: '',
        city: ''
    });


    // Récupération de la librairie en fonction de son ID
    const fetchLibrary = async id => {
        try {
            // Destructure data from api
            const {label, address, cpo, city} = await API.find("LIBRARY", id);
            setLibrary({label, address, cpo, city});
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger la librairie");
            //history.replace('/');
        }
    }

    // Récupération du bon auteur lorsque l'id change dans l'url
    useEffect(() => {
        if (id) {
            fetchLibrary(id);
            setLoading(true);
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setLibrary({...library, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await API.update("LIBRARY", id, library);
            toast.success("La librairie à bien été modifié");
            //history.replace('/');
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire");
            }
        }
    }

    return (
        <>
            {/* eslint-disable-next-line no-mixed-operators */}
            <h1>Modification de la librairie</h1>
            {!loading && (
                <form onSubmit={handleSubmit}>
                    <Field name="label"
                           label="Nom de la librairie"
                           value={library.label}
                           onChange={handleChange}
                           error={errors.label}
                    />
                    <Field name="address"
                           label="Adresse"
                           value={library.address}
                           onChange={handleChange}
                           error={errors.address}
                    />
                    <Field name="cpo"
                           label="Code postale"
                           value={library.cpo}
                           onChange={handleChange}
                           error={errors.cpo}
                           type='date'
                    />

                    <Field name="city"
                           label="Ville"
                           value={library.city}
                           onChange={handleChange}
                           error={errors.city}
                    />
                </form>
            )}
            {loading && <FormContentLoader/>}
            <div className='form-group'>
                <button type='submit' className='btn btn-success' onClick={handleSubmit}>Enregistrer</button>
                <Link to='/' className='btn btn-link'>Retour à l'accueil</Link>
            </div>
        </>
    )
}

export default LibraryPage;