import React, {useEffect, useState} from 'react';
import ButtonActive from "../../components/ButtonActive";
import Pagination from "../../components/Pagination";
import API from "../../services/API";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../../components/loaders/TableLoader";
import axios from 'axios';
import {BOOKS} from "../../config";

const AvailableBooksPage = () => {

    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // Permet d'aller récupérer les livres depuis notre api
    const fetchBooks = async () => {

        try {
            const data = await API.findAll('BOOKS', "?isAvailable=1")
            setBooks(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les livres");
        }
    };

    // Au chargement du composant on va chercher les livres
    useEffect(() => {
        fetchBooks();
    }, []);

    //Change la disponibilité du livre
    const handleChange = async (book) => {
        try {
            const newBook = {isAvailable: !book.isAvailable};
            await axios.put(BOOKS + "/" + book.id, newBook);
            const response = await API.findAll('BOOKS', "?isAvailable=1");
            document.location.reload();
            setBooks(response.data["hydra:member"])
        } catch (error) {
            console.error(error.response)
        }
    }

    // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    // Gestion de la recherche
    const handleSearch = (event) => {
        setSearch(event.currentTarget.value);
        setCurrentPage(1);
    }

    // Filtrage des livres en fonction de la recherche
    const filteredBooks = books.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author?.firstName.toLowerCase().includes(search.toLowerCase()) ||
        b.author?.lastName.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination des données
    const itemsPerPage = 10;
    const paginatedBooks = Pagination.getData(filteredBooks, currentPage, itemsPerPage);

    return (
        <>
            <div className="header-available">
                <img src="/static/img/etageres.jpg" alt="Pile de livres"/>
                <div className="section-header">
                    <h1>Liste des livres disponibles</h1>
                    <Link to='/books/new' className='btn-header'>Créer un livre</Link>
                </div>
            </div>
            <div className="container-85">
                <div className="form-group">
                    <input type='text' onChange={handleSearch} value={search} className="form-control input-search-book"
                           placeholder="Rechercher ..."/>
                </div>

                {!loading && books.length > 0 ? (
                    <div className="container-cards">
                        {paginatedBooks.map(book =>
                            <div className="container-card" key={book.id}>
                                <div className="left-image zoom effect">
                                    <Link to={'/booksDetails/' + book.id}>
                                        <span>Voir</span>
                                        <img src={book.image} alt={book.title}/>
                                    </Link>
                                </div>
                                <div className="container-right">
                                    <div className="right-first">
                                        <div className="section">
                                            <h6 className="title-card">{book.title}</h6>
                                            <span className="status">
                                            {
                                                book.isAvailable ? (
                                                    <> <span className="status__icon_green"/>Disponible</>
                                                ) : (
                                                    <> <span className="status__icon_red"/>Indisponible</>
                                                )
                                            }
                                        </span>
                                        </div>
                                        <div className="section">
                                            <span className="text-card">Langue</span>
                                            <h6>{book.language}</h6>
                                        </div>
                                        <div className="section">
                                            <span className="text-card">Auteur</span>
                                            <h6>{book.author?.firstName} {book.author?.lastName}</h6>
                                        </div>
                                    </div>
                                    <div className="right-second">
                                        <div className="section">
                                            <span className="text-card">Nombres de pages</span>
                                            <h6 className="badge badge-primary p-2">{book.nbrPages}</h6>
                                        </div>
                                        <div className="section">
                                            <Link to={'/books/' + book.id}>Modifier</Link>
                                            <ButtonActive onClick={() => handleChange(book)} active={book.isAvailable}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <h2>Aucun livres disponible</h2>
                )}

                {loading && <TableLoader/>}
                {
                    itemsPerPage < filteredBooks.length &&
                    <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredBooks.length}
                                onPageChanged={handlePageChange}
                    />
                }
            </div>
        </>
    );
}

export default AvailableBooksPage;