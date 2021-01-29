import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import AuthApi from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";
import {toast} from "react-toastify";
import {haveRole} from "../services/functions";

const TopBar = ({history}) => {

    const {user, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const handleLogout = () => {
        AuthApi.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté");
        history.replace('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to='/' className="navbar-brand">BookManager</Link>
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
                <div className="media media-pill align-items-center">
                    {user && isAuthenticated ? (
            <>
                <div className="ml-2">
                    <span className="mb-0 text-sm font-weight-bold">
                        <div
                            style={{
                                position: "relative",
                                marginTop: "-12px",
                                fontWeight: "bold",
                            }}>
                            {user.firstName} {user.lastName}
                        </div>
                        <div
                            style={{
                                fontSize: "12px",
                                textAlign: "left",
                                position: "absolute",
                                bottom: "6px",
                                left: "48px",
                                height: "18px",
                                overflowY: "hidden",
                                textOverflow: "cut",
                            }}>

                        </div>
                    </span>
                </div>
            </>
                    ) : (
                        <></>
                    )}
                </div>
                <ul className="navbar-nav ml-auto">
                    {/* Bouton nouveau membre */}
                    {isAuthenticated && haveRole(user, "MANAGER") && (
                        <li className="nav-item mr-3">
                            <button className="btn btn-light">
                                <Link to='/register'>Ajouter un utilisateur</Link>
                            </button>
                        </li>
                    )}
                    {
                        (!isAuthenticated && (
                            <li className="nav-item mr-3">
                                <Link to='/login' className="btn btn-success">Connexion</Link>
                            </li>
                        )) || (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger">
                                    Deconnexion
                                </button>
                            </li>
                        )}
                </ul>
            </div>
        </nav>
    );
}

export default TopBar;