import React, {useEffect, useState} from "react";
import API from "../../services/API";
import {toast} from "react-toastify";
import FormContentLoader from "../../components/loaders/FormContentLoader";
import {Link} from "react-router-dom";

const BookDetailsPage = ({history, match}) => {
        const [book, setBook] = useState({
            title: "",
            nbrPages: "",
            language: "",
            description: "",
            dateOfPublication: "",
            image: "",
            isAvailable: ""
        });
        const [loading, setLoading] = useState(true);
        const {id} = match.params;

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
            fetchBook(id);
        }, [id]);


        return (
            <>
                {loading && <FormContentLoader/>}
                {!loading && (
                    <>
                        <h1>Detail du livre</h1>
                        {book.title} <br/>
                        <img src={book.image} alt={book.title} height="250px"/><br />
                        {book.description}<br />
                        <Link to={'/books'}>Retour</Link>
                    </>
                )}
            </>
        )
    }
;

export default BookDetailsPage;