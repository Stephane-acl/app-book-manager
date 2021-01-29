import React, {useState, useEffect} from "react";

import OmniSearch from "../components/effects/Omnisearch";
import PropTypes from "prop-types";
import API from "../services/API";
import {toast} from "react-toastify";

const HomePage = ({history}) => {


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

    // Au chargement du composant on va chercher les livres
    useEffect(() => {
        fetchLibraries();
    }, []);


    return (
        <>
            {libraries.map(library =>
                <h1 className="text-center">{library.label}</h1>
            )}

            <div className="jumbotron">
                <OmniSearch
                    id="bookSearch"
                    titleTextSearch="Mes Livres"
                    arrowNav={true}
                    history={history}
                />
            </div>
        </>
    );
}

HomePage.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
}


export default HomePage;