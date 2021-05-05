import React, {useEffect, useState} from "react";
import API from "../../services/API";
import {toast} from "react-toastify";
import FormContentLoader from "../../components/loaders/FormContentLoader";
import {Link} from "react-router-dom";
import moment from "moment";
import ButtonActive from "../../components/ButtonActive";
import axios from "axios";
import {BOOKS} from "../../config";

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
                author: author,
                category: category.name
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

    //Change la disponibilité du livre
    const handleChange = async (book) => {
        try {
            const newBook = {isAvailable: !book.isAvailable};
            await axios.put(BOOKS + "/" + book.id, newBook);
            const response = await API.findAll('BOOKS', "?isAvailable=1");
            document.location.reload();
            setBook(response.data["hydra:member"])
        } catch (error) {
            console.error(error.response)
        }
    }

    console.log(book)

    //Formate la date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    return (
        <div className="container-70">
            {loading && <FormContentLoader/>}
            {!loading && (
                <>
                    <div>
                        <h1>{book.title}</h1>
                        <span>{book.isAvailable}</span>
                        <span>{book.language}</span>
                    </div>
                    <div className="container-detail">
                        <div className="left-container">
                            <img src={book.image} alt={book.title}/>
                            <span>{book.category}</span>
                        </div>

                        <div className="right-container">
                            <div className="section-1">
                                <h4>Auteur</h4>
                                <span>{book.author?.firstName} {book.author?.lastName}</span>
                            </div>
                            <div className="section-2">
                                <h4>Date de publication</h4>
                                <span>{formatDate(book.dateOfPublication)}</span>
                            </div>
                            <div className="section-3">
                                <h4>Synopsis</h4>
                                <span>{book.description}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link to={'/books'}>Retour</Link>
                        <Link to={'/books/' + book.id}>Modifier</Link>
                        <ButtonActive onClick={() => handleChange(book)} active={book.isAvailable}/>
                    </div>
                </>
            )}
        </div>
    )
};

export default BookDetailsPage;