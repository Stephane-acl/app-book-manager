import React, {useState, useEffect} from 'react';
import Field from "../../components/forms/Field";
import {Link} from "react-router-dom";
import API from "../../services/API";
import {toast} from "react-toastify";
import FormContentLoader from "../../components/loaders/FormContentLoader";

const AuthorPage = ({history, match}) => {

    const {id = "new"} = match.params;
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [author, setAuthor] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationality: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationality: ''
    });


    // Récupération de l'auteur en fonction de son ID
    const fetchAuthor = async id => {
        try {
            // Destructure data from api
            const {firstName, lastName, nationality, dateOfBirth} = await API.findAuthor(id);
            setAuthor({firstName, lastName, nationality, dateOfBirth});
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger l'auteur demandé");
            history.replace('/authors');
        }
    }

    // Récupération du bon auteur lorsque l'id change dans l'url
    useEffect(() => {
        if (id !== "new") {
            fetchAuthor(id);
            setEditing(true);
            setLoading(true);
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setAuthor({...author, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (editing) {
            await API.updateAuthor(id, author);
            toast.success("L'auteur à bien été modifié");
        } else {
            try {
                await API.createAuthor(author);
                toast.success("L'auteur à bien été enregistré");
                history.replace('/authors');
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
    }

    return (
        <>
            {/* eslint-disable-next-line no-mixed-operators */}
            {!editing && <h1>Création d'un auteur</h1> || <h1>Modification d'un auteur</h1>}
            {!loading && (
                <form onSubmit={handleSubmit}>
                    <Field name="firstName"
                           label="Prénom"
                           value={author.firstName}
                           onChange={handleChange}
                           error={errors.firstName}
                    />
                    <Field name="lastName"
                           label="Nom"
                           value={author.lastName}
                           onChange={handleChange}
                           error={errors.lastName}
                    />
                    <Field name="dateOfBirth"
                           label="Date de naissance"
                           value={author.dateOfBirth}
                           onChange={handleChange}
                           error={errors.dateOfBirth}
                           type='date'
                    />

                    <Field name="nationality"
                           label="Nationalité"
                           value={author.nationality}
                           onChange={handleChange}
                           error={errors.nationality}
                    />
                </form>
            )}
            {loading && <FormContentLoader/>}
            <div className='form-group'>
                <button type='submit' className='btn btn-success' onClick={handleSubmit}>Enregistrer</button>
                <Link to='/authors' className='btn btn-link'>Retour à la liste</Link>
            </div>
        </>
    )
}

export default AuthorPage;