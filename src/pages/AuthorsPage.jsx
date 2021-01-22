import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import moment from 'moment';
import API from "../services/API";

const AuthorsPage = (props) => {

    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 10;

    // Récupération des auteurs auprès de l'API
    const fetchAuthors = async () => {
        try {
            const data = await API.findAllAuthors();
            setAuthors(data);
        } catch (error) {
            console.log(error);
        }
    }

    //Charger les auteurs au chargement du composant
    useEffect(() => {
        fetchAuthors();
    }, []);


    // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    // Gestion de la recherche
    const handleSearch = (event) => {
        setSearch(event.currentTarget.value);
        setCurrentPage(1);
    }

    // Gestion de la suppression
    const handleDelete = async (id) => {
        const originalAuthors = [...authors];

        setAuthors(authors.filter(author => author.id !== id));

        try {
            await API.delete(id);
        } catch (error) {
            console.log(error.response);
            setAuthors(originalAuthors);
        }
    }

    //Gestion du format de date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // Filtrage des livres en fonction de la recherche
    const filteredAuthors = authors.filter(a =>
        a.firstName.toLowerCase().includes(search.toLowerCase()) ||
        a.lastName.toLowerCase().includes(search.toLowerCase()) ||
        a.nationality.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination des données
    const paginatedAuthors = Pagination.getData(filteredAuthors, currentPage, itemsPerPage);

    return (
        <>
            <h1>Liste des Auteurs</h1>

            <div className="form-group">
                <input type='text' onChange={handleSearch} value={search} className="form-control"
                       placeholder="Rechercher ..."/>
            </div>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date de naissance</th>
                    <th>Nationnalité</th>
                    <th>action</th>
                </tr>
                </thead>
                <tbody>
                {paginatedAuthors.map(author =>
                    <tr key={author.id}>
                        <td>{author.id}</td>
                        <td>
                            <a href="#">{author.lastName}</a>
                        </td>
                        <td>{author.firstName}</td>
                        <td>{formatDate(author.dateOfBirth)}</td>
                        <td>{author.nationality}</td>
                        <td>
                            <button>Mettre à jour</button>
                            <button onClick={() => handleDelete(author.id)}>Supprimer</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {
                itemsPerPage < filteredAuthors.length &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredAuthors.length}
                            onPageChanged={handlePageChange}
                />
            }
        </>
    );
}

export default AuthorsPage;