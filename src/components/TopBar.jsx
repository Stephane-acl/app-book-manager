import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import AuthApi from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";
import {toast} from "react-toastify";
import {haveRole} from "../services/functions";

const TopBar = ({history}) => {

    const {user, isAuthenticated, setIsAuthenticated, library} = useContext(AuthContext);

    const handleLogout = () => {
        AuthApi.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté");
        history.replace('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to='/' className="navbar-brand">
                <img className="read" src="static/img/read.svg" alt='image livre'/>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                    aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                           aria-haspopup="true" aria-expanded="false">Livres</a>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/availableBooks">Livres disponibles</Link>
                            <Link className="dropdown-item" to="/UnAvailableBooks">Livres indisponibles</Link>
                            <div className="dropdown-divider"/>
                            <Link className="dropdown-item" to='/books'>Tout mes livres</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to='/authors' className="nav-link">Auteurs</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/categories' className="nav-link">Catégories</Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle mr-5" data-toggle="dropdown" href="#!" role="button"
                           aria-haspopup="true" aria-expanded="false">
                            <div className="media media-pill align-items-center">
                                <div className="ml-2">
                                    <span className="mb-0 text-sm font-weight-bold">
                                        <div style={{position: "relative", marginTop: "-12px", fontWeight: "bold", padding: "4px"}}>
                                            {user.firstName} {user.lastName}
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </a>
                        <div className="dropdown-menu">
                            {/* Bouton nouveau membre */}
                            {isAuthenticated && haveRole(user, "MANAGER") && (
                                <>
                                    <Link className="dropdown-item" to="/register">Ajouter un utilisateur</Link>
                                    <Link className="dropdown-item" to={"/library/" + library.id}>Modifier sa librairie</Link>
                                    <div className="dropdown-divider"/>
                                </>
                            )}
                            {
                                (isAuthenticated && (
                                    <button className="dropdown-item" onClick={handleLogout}>Deconnexion</button>
                                ))
                            }
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default TopBar;