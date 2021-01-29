import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Pagination from "../../components/Pagination";
import TableLoader from "../../components/loaders/TableLoader";
import API from "../../services/API";
import ModalCreateCategory from "../../components/effects/ModalCreateCategory";
import ModalEditCategory from "../../components/effects/ModalEditCategory";
import {Link} from "react-router-dom";

const CategoriesPage = ({match, history}) => {

        const [categories, setCategories] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 10;
        const [search, setSearch] = useState("");
        const [loading, setLoading] = useState(true);
        const [showModal, setShowModal] = useState(false);
        const [showEditModal, setShowEditModal] = useState(false);

        const openModal = () => {
            setShowModal(prev => !prev);
        };

        const openEditModal = () => {
            setShowEditModal(prev => !prev);
        };

        // Récupération des categories auprès de l'API
        const fetchCategories = async () => {
            try {
                const data = await API.findAll('CATEGORIES');
                setCategories(data);
                setLoading(false);
            } catch (error) {
                toast.error("Erreur lors du chargement des categories");
            }
        }

        //Charger les categories au chargement du composant
        useEffect(() => {
            fetchCategories();
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
            const originalCategories = [...categories];

            setCategories(categories.filter(category => category.id !== id));

            try {
                await API.deleteCategory(id);
                toast.success("La catégorie à bien été supprimée");
            } catch (error) {
                toast.error("Vous ne pouvez pas supprimer une catégorie associée à un livre");
                setCategories(originalCategories);
            }
        };

        // Filtrage des auteurs en fonction de la recherche
        const filteredCategories = categories.filter(c =>
            c.name?.toLowerCase().includes(search.toLowerCase())
        );

        // Pagination des données
        const paginatedCategories = Pagination.getData(filteredCategories, currentPage, itemsPerPage);

        return (
            <>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <h1>Liste des catégories</h1>
                    <button className='btn btn-primary' onClick={openModal}>Créer une catégorie</button>
                    <ModalCreateCategory showModal={showModal} setShowModal={setShowModal} history={history} match={match}/>
                </div>
                <div className="form-group">
                    <input type='text' onChange={handleSearch} value={search} className="form-control"
                           placeholder="Rechercher une catégorie ..."/>
                </div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>action</th>
                    </tr>
                    </thead>
                    {!loading && (
                        <tbody>
                        {paginatedCategories.map(category =>
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <Link className="btn btn-primary" to={"/categories/" + category.id}>
                                        Mettre à jour
                                    </Link>
                                    {/*<ModalEditCategory showEditModal={showEditModal} setShowEditModal={setShowEditModal}
                                                       history={history} match={match} id={id}/>*/}
                                    <button onClick={() => handleDelete(category.id)} className='btn btn-danger'>
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
                    itemsPerPage < filteredCategories.length &&
                    <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCategories.length}
                                onPageChanged={handlePageChange}
                    />
                }

            </>
        )
    }
;

export default CategoriesPage;