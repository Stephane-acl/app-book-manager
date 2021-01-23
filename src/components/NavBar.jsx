import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import AuthApi from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";
import {toast} from "react-toastify";

const NavBar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

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
                    <li className="nav-item">
                        <Link to='/books' className="nav-link">Livres</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/authors' className="nav-link">Auteurs</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/categories' className="nav-link">Catégories</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                           aria-haspopup="true" aria-expanded="false">Dropdown</a>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="">Action</Link>
                            <Link className="dropdown-item" to="">Another action</Link>
                            <Link className="dropdown-item" to="">Something else here</Link>
                            <div className="dropdown-divider"/>
                            <Link className="dropdown-item" to="">Separated link</Link>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {
                        (!isAuthenticated && (
                            <>
                                <li className="nav-item mr-3">
                                    <Link to='/register' className="btn btn-light">Inscription</Link>
                                </li>
                                <li className="nav-item mr-3">
                                    <Link to='/login' className="btn btn-success">Connexion</Link>
                                </li>
                            </>

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

export default NavBar;