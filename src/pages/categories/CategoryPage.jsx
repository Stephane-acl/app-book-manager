import React, {useEffect, useState} from "react";
import Field from "../../components/forms/Field";
import FormContentLoader from "../../components/loaders/FormContentLoader";
import {Link} from "react-router-dom";
import API from "../../services/API";
import {toast} from "react-toastify";

const CategoryPage = ({match, history}) => {

    const {id} = match.params;
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: ""
    });

    const [errors, setErrors] = useState({
        name: ""
    });

    // Récupération de la catégorie en fonction de son ID
    const fetchCategory = async id => {
        try {
            // Destructure data from api
            const {name} = await API.findCategory(id);
            setCategory({name});
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger la catégorie demandée");
            history.replace('/categories');
        }
    };

    // Récupération de la bonne catégorie lorsque l'id change dans l'url
    useEffect(() => {
        if (id !== "new") {
            fetchCategory(id);
            setEditing(true);
            setLoading(true)
        }
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setCategory({...category, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (editing) {
            await API.updateAuthor(id, category);
            toast.success("La catégorie à bien été modifiée");
        } else {
            try {
                await API.createCategory(category);
                toast.success("La catégorie à bien été crée");
                history.replace('/categories');
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
            {!editing && <h1>Création d'une catégorie</h1> || <h1>Modification d'une catégorie</h1>}
            {!loading && (
                <form onSubmit={handleSubmit}>
                    <Field name="name"
                           placeholder="Nom de la catégorie"
                           value={category.name}
                           onChange={handleChange}
                           error={errors.name}
                    />
                </form>
            )}
            {loading && <FormContentLoader/>}
            <div className='form-group'>
                <button type='submit' className='btn btn-success' onClick={handleSubmit}>Enregistrer</button>
                <Link to='/categories' className='btn btn-link'>Retour à la liste</Link>
            </div>
        </>
    )
};

export default CategoryPage;