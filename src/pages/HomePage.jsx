import React, {useState, useEffect} from "react";

import OmniSearch from "../components/effects/Omnisearch";
import PropTypes from "prop-types";
import API from "../services/API";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";
import {Link} from "react-router-dom";
import Glide from '@glidejs/glide';

const HomePage = ({history}) => {

    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [libraries, setLibraries] = useState([]);

    // Permet d'aller récupérer la librairie depuis notre api
    const fetchLibraries = async () => {

        try {
            const data = await API.findAll("LIBRARY")
            setLibraries(data);
        } catch (error) {
            toast.error("Impossible de charger la librairie");
        }
    };

    // Permet d'aller récupérer les derniers livres disponible ajoutés depuis notre api
    const fetchLastBooks = async () => {

        try {
            const data = await API.findAll("BOOKS", "?pagination=true&itemsPerPage=36&isAvailable=1")
            setBooks(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les livres");
        }
    };

    // Permet d'aller récupérer les dernieres catégories de livres disponible ajoutés depuis notre api
    const fetchCategories = async () => {

        try {
            const data = await API.findAll("CATEGORIES", "?pagination=true&itemsPerPage=8")
            setCategories(data);
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger les livres");
        }
    };

    // Au chargement du composant on va chercher les données
    useEffect(() => {
        fetchLibraries();
        fetchLastBooks();
        fetchCategories();
    }, []);

    let sliders = document.querySelectorAll('.glide');

    for (let i = 0; i < sliders.length; i++) {
        let glide = new Glide(sliders[i], {
            type: 'slider',
            perView: 8,
            gap: 10,
            focusedAt: 0,
            breakpoints: {
                1580: {
                    perView: 7
                },
                1400: {
                    perView: 6
                },
                1250: {
                    perView: 5
                },
                1000: {
                    perView: 4
                },
                600: {
                    perView: 3
                }
            }
        });

        glide.mount()
    }

    return (
        <div className="container-homepage">
            <div className="header-homepage">
                <img src="static/img/book.jpeg" alt="Livre ouvert"/>
                <div className="container-title-searchBar">
                    {libraries.map(library =>
                        <h1 key={library.id} className="title text-center">{library.label}</h1>
                    )}
                    <OmniSearch
                        id="bookSearch"
                        titleTextSearch="Mes Livres"
                        arrowNav={true}
                        history={history}
                    />
                </div>
            </div>

            {!loading ? (
                <>
                    <h3 className="last-book">Vos derniers livres ajoutés</h3>
                    <div className="carousel-last-book">
                        <div className="glide">
                            <div className="glide__track" data-glide-el="track">
                                <ul className="glide__slides">
                                    {books.map(book =>
                                        <li className="glide__slide homepage-book zoom effect" key={book.id}>
                                            <Link to={'/booksDetails/' + book.id}>
                                                <span>{book.title}</span>
                                            </Link>
                                            <img src={book.image} alt={book.title} height="300px"/>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className={books.length <= 0 ? "glide-arrows-none" : "glide__arrows"}
                                 data-glide-el="controls">
                                <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                                    <i className="fas fa-chevron-left"/>
                                </button>
                                <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                                    <i className="fas fa-chevron-right"/>
                                </button>
                            </div>
                        </div>
                        {books.length <= 0 &&
                        <h3 className="no-books">
                            Aucun livres disponible pour le moment
                        </h3>
                        }
                    </div>

                    {categories.map(category =>
                        <>
                            <h3 className="categories-title" key={category.id}>{category.name}</h3>
                            <div className="container-categories-homepage">
                                <div className="glide">
                                    <div className="glide__track" data-glide-el="track">
                                        <ul className="glide__slides">
                                            {category.book.map(b =>
                                                <li className="homepage-category zoom effect" key={b.id}>
                                                    <Link to={'/booksDetails/' + b.id}>
                                                        <span>{b.title}</span>
                                                    </Link>
                                                    <img src={b.image} alt={b.title} height="300px"/>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className={category.book.length <= 0 ? "glide-arrows-none" : "glide__arrows"}
                                         data-glide-el="controls">
                                        <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
                                            <i className="fas fa-chevron-left"/>
                                        </button>
                                        <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
                                            <i className="fas fa-chevron-right"/>
                                        </button>
                                    </div>
                                </div>
                                {category.book.length <= 0 &&
                                <h3 className="no-books">
                                    Aucun livres dans cette catégorie pour le moment
                                </h3>
                                }
                            </div>
                        </>
                    )}
                    <div style={{height: '100px'}}/>
                </>
            ) : <TableLoader/>}
        </div>
    );
}

HomePage.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
}


export default HomePage;