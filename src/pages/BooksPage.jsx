import React, {useEffect, useState} from 'react';
import ButtonActive from "../components/ButtonActive";
import Pagination from "../components/Pagination";
import API from "../services/API";
import moment from 'moment';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const BooksPage = () => {

    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // Permet d'aller récupérer les livres depuis notre api
    const fetchBooks = async () => {

        try {
            const data = await API.findAllBooks()
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

    //  useEffect(() => {
    //      console.log(books);
    //  }, [books]);

    //  const handleChange = (book) => {

    //      const newList = books.map((item) => {
    //          if (item.id === book.id) {
    //              let updatedItem = {
    //                  ...item,
    //                  isAvailable: !item.isAvailable,
    //              }

    //              axios.put(BOOKS + "/" + book.id, updatedItem).then(response => response.data['hydra:member'])
    //                  .then(data => setBooks(data['hydra:member']))
    //                  .catch(error => console.log(error.response));

    //              return updatedItem;
    //          }
    //          return item;
    //      });

    //      setBooks(newList);


    // setBooks({
    //     books: {
    //         isAvailable: !books.isAvailable
    //     }
    // });
    // }

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

    // Formate la date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des livres</h1>
                <Link to='/books/new' className='btn btn-primary'>Créer un livre</Link>
            </div>

            <div className="form-group">
                <input type='text' onChange={handleSearch} value={search} className="form-control"
                       placeholder="Rechercher ..."/>
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Titre</th>
                    <th>Langue</th>
                    <th>Description</th>
                    <th className="text-center">Nombre de Pages</th>
                    <th>Auteur</th>
                    <th className="text-center">Date de Publication</th>
                    <th className="text-center">Disponible</th>
                    <th></th>
                </tr>
                </thead>
                {!loading && (
                    <tbody>
                    {paginatedBooks.map(book =>
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td><img src={book.image} alt={book.title} height="120px"/></td>
                            <td>
                                <Link to={'/books/' + book.id}>{book.title}</Link>
                            </td>
                            <td>{book.language}</td>
                            <td>{book.description}</td>
                            <td className="text-center">
                                <span className="badge badge-primary p-2">{book.nbrPages}</span>
                            </td>
                            <td className="text-center">{book.author?.firstName} {book.author?.lastName}</td>
                            <td className="text-center">{formatDate(book.dateOfPublication)}</td>
                            <td className="text-center">
                                {
                                    book.isAvailable ? (
                                        <img src="static/img/icons/check.svg" alt="check" height="35px"/>
                                    ) : (
                                        <img src="static/img/icons/uncheck.svg" alt="uncheck" height="35px"/>
                                    )
                                }
                            </td>
                            <td>
                                <ButtonActive active={book.isAvailable}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                )}
            </table>
            {loading && <TableLoader/>}
            {
                itemsPerPage < filteredBooks.length &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredBooks.length}
                            onPageChanged={handlePageChange}
                />
            }
        </>
    );
}

export default BooksPage;