import React, {useEffect, useState} from 'react';
import Pagination from "../../components/Pagination";
import moment from 'moment';
import API from "../../services/API";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../../components/loaders/TableLoader";

const AuthorsPage = (props) => {

    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10;

    // Récupération des auteurs auprès de l'API
    const fetchAuthors = async () => {
        try {
            const data = await API.findAll("AUTHORS")
            setAuthors(data);
            setLoading(false);
        } catch (error) {
            toast.error("Erreur lors du chargement des auteurs");
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
console.log(authors)
    // Gestion de la suppression
    const handleDelete = async (id) => {
        const originalAuthors = [...authors];

        setAuthors(authors.filter(author => author.id !== id));

        try {
            await API.delete(id);
            toast.success("L'auteur à bien été supprimé");
        } catch (error) {
            toast.error("Une erreur est survenue");
            setAuthors(originalAuthors);
        }
    }

    //Gestion du format de date
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // Filtrage des auteurs en fonction de la recherche
    const filteredAuthors = authors.filter(a =>
        a.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        a.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        a.nationality?.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination des données
    const paginatedAuthors = Pagination.getData(filteredAuthors, currentPage, itemsPerPage);
    //TODO AJOUTER LIENS VERS LIVRES
    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des Auteurs</h1>
                <small>Attention si vous supprimez un auteur cela entrainera la suppression de ses livres</small>
                <Link to='/authors/new' className='btn btn-primary'>Créer un auteur</Link>
            </div>

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
                {!loading && (
                    <tbody>
                    {paginatedAuthors.map(author =>
                        <tr key={author.id}>
                            <td>{author.id}</td>
                            <td>{author.lastName}</td>
                            <td>{author.firstName}</td>
                            <td>{formatDate(author.dateOfBirth)}</td>
                            <td>{author.nationality}</td>
                            <td>
                                <Link className="btn btn-primary" to={"/authors/" + author.id}>
                                    Mettre à jour
                                </Link>
                                <button className='btn btn-danger' onClick={() => handleDelete(author.id)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                )}
            </table>
            {loading && <TableLoader/>}
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