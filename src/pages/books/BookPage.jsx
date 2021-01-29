import React, {useState, useEffect} from 'react';
import Field from "../../components/forms/Field";
import {Link} from "react-router-dom";
import API from "../../services/API";
import {toast} from "react-toastify";
import FormContentLoader from "../../components/loaders/FormContentLoader";
import Select from "../../components/forms/Select";

const BookPage = ({match, history}) => {
// TODO FIX AUTHOR AND BOOK UNDEFINED !!!
    const {id} = match.params;
    const [editing, setEditing] = useState(false);
    const [book, setBook] = useState({
        title: "",
        nbrPages: "",
        language: "",
        description: "",
        dateOfPublication: "",
        image: "",
        isAvailable: ""
    });

    const [errors, setErrors] = useState({
        title: "",
        nbrPages: "",
        language: "",
        description: "",
        dateOfPublication: "",
        image: "",
        isAvailable: ""
    });

    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Récupération du livre en fonction de son ID
    const fetchBook = async id => {
        try {
            // Destructure data from api
            const {
                title,
                nbrPages,
                language,
                description,
                dateOfPublication,
                image,
                isAvailable,
                author,
                category
            } = await API.find("BOOKS", id);

            setBook({
                title,
                nbrPages,
                language,
                description,
                dateOfPublication,
                image,
                isAvailable,
                author: author?.id,
                category: category.id
            });
            setLoading(false);
        } catch (error) {
            toast.error("Le livre n'a pas pu être chargé");
            history.replace('/books');
        }
    }
    // Chargement du livre si besoin au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchBook(id);
        }
    }, [id]);

    // Récupère les auteurs
    const fetchAuthors = async () => {
        try {
            const data = await API.findAll('AUTHORS')
            setAuthors(data);
            setLoading(false);
            if (!book?.author) {
                setBook({...book, author: data[0].id});
            }
        } catch (error) {
            toast.error("Impossible de charger les auteurs");
            //history.replace('/books');
        }
    };

    // Récupère les catégories
    const fetchCategories = async () => {
        try {
            const data = await API.findAll('CATEGORIES');
            setCategories(data);
            setLoading(false);
            if (!book?.category) {
                setBook({...book, category: data[0].id});
            }
        } catch (error) {

            toast.error("Impossible de charger les catégories");
            //history.replace('/books');
        }
    };

    // Cette effet dit que la fonction doit être faite dès le départ
    useEffect(() => {
        fetchAuthors();
        fetchCategories();
    }, []);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setBook({...book, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setErrors({});

            if (editing) {
                await API.updateBook(id, book);
                toast.success("Le livre à bien été modifié");
            } else {
                await API.createBook(book);
                toast.success("Le livre à bien été créé");
                history.replace("/books");
            }
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
            {!editing && <h1>Création d'un livre</h1> || <h1>Modification d'un livre</h1>}
            {loading && <FormContentLoader/>}
            {!loading && (
                <form>
                    <Field name="title"
                           label="Titre"
                           placeholder="Titre du livre"
                           value={book.title}
                           onChange={handleChange}
                           error={errors.title}
                    />
                    <Field name="nbrPages"
                           label="Nombre de Pages"
                           placeholder="Nombre de Pages du livre"
                           type='number'
                           value={book.nbrPages}
                           onChange={handleChange}
                           error={errors.nbrPages}
                    />
                    <Field name="language"
                           label="Langue"
                           placeholder="Langue du livre"
                           value={book.language}
                           onChange={handleChange}
                           error={errors.language}
                    />
                    <textarea
                        className='form-control'
                        rows="4"
                        name="description"
                        placeholder="Description du livre"
                        value={book.description}
                        onChange={handleChange}
                        error={errors.description}
                    />
                    <Field name="dateOfPublication"
                           label="Date de publication"
                           placeholder="Date de publication du livre"
                           value={book.dateOfPublication}
                           onChange={handleChange}
                           type='date'
                           error={errors.dateOfPublication}
                    />
                    <Field name="image"
                           label="Image"
                           placeholder="image du livre"
                           value={book.image}
                           onChange={handleChange}
                           error={errors.image}
                    />
                    <Field name="isAvailable"
                           label="Disponibilité"
                           placeholder="Disponibilité du livre"
                           value={book.isAvailable}
                           onChange={handleChange}
                           error={errors.isAvailable}
                    />
                    {authors?.length ? <Select name='author' label='Auteurs' value={book.author} error={errors.author}
                            onChange={handleChange}>
                        {authors.map(author =>
                            <option key={author.id} value={author.id}>
                                {author.firstName} {author.lastName}
                            </option>
                        )};
                    </Select> : <div>vide</div>}
                    {!editing &&
                    <Link to='/authors/new' type='submit' className="btn btn-info">Création d'un auteur</Link>
                    }

                    {categories?.length ? <Select name='category' label='Catégories' value={book.category} error={errors.category}
                            onChange={handleChange}>
                        {categories.map(category =>
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        )};
                    </Select>: <div>vide</div>}

                    {!editing &&
                    <Link to='/categories/new' type='submit' className="btn btn-info">Création d'une catégorie</Link>
                    }
                </form>
            )}
            <div className='form-group'>
                <button type='submit' className='btn btn-success' onClick={handleSubmit}>Enregistrer</button>
                <Link to='/books' className='btn btn-link'>Retour à la liste</Link>
            </div>
        </>
    )
}

export default BookPage;