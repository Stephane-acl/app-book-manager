import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import AuthApi from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";
import {toast} from "react-toastify";
import {haveRole} from "../services/functions";

const SideBar = ({history}) => {

    const {user, isAuthenticated, setIsAuthenticated, library} = useContext(AuthContext);

    const handleLogout = () => {
        AuthApi.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté");
        history.replace('/login');
    }

    return (
        <>
            <div className="top-bar-mobile">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#"
                   role="button"
                   aria-haspopup="true" aria-expanded="false">
                    Livres
                </a>
                <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/availableBooks">Livres disponibles</Link>
                    <Link className="dropdown-item" to="/UnAvailableBooks">Livres
                        indisponibles</Link>
                    <div className="dropdown-divider"/>
                    <Link className="dropdown-item" to='/books'>Tout mes livres</Link>
                </div>

                <Link to='/categories'>Catégories</Link>
                <Link to='/authors'>Auteurs</Link>
            </div>

            <div className="sidebar-container">
                <nav className="sidebar">
                    <ul className="sidebar-nav">
                        <li className="logo-mobile sidebar-nav-item">
                            <Link className='sidebar-nav-link' to='/'>B</Link>
                        </li>
                        <li className="logo display-none-mobile">
                            <a href="#" className="sidebar-nav-link">
                                <Link to='/' className="link-text-sidebar logo-text">Book Manager</Link>
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fad"
                                    data-icon="angle-double-right"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="svg-inline--fa fa-angle-double-right fa-w-6 fa-5x"
                                >
                                    <g className="fa-group">
                                        <path
                                            fill="currentColor"
                                            d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                                            className="fa-secondary"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                                            className="fa-primary"
                                        />
                                    </g>
                                </svg>
                            </a>
                        </li>


                        <li className="sidebar-nav-item display-none-mobile dropdown">
                            <a className="sidebar-nav-link nav-link" href="#!">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="svg31"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fad"
                                    data-icon="book"
                                    role="img"
                                    version="1.1"
                                    height="512"
                                    width="512"
                                    viewBox="0 0 64 64"
                                    fill="#F8F8FB"
                                    className="svg-inline--fa fa-w-6 fa-9x">

                                    <path
                                        id="path2"
                                        d="M61,16a1,1,0,0,0-1,1V53H54.57a85.082,85.082,0,0,0-19.12,2.178,1.992,1.992,0,0,1-2.1-.834A22.732,22.732,0,0,1,45.211,51H57a1,1,0,0,0,1-1V43a1,1,0,0,0-2,0v6H45.211A24.728,24.728,0,0,0,33,52.212V25a1,1,0,0,0-2,0V52.211A24.724,24.724,0,0,0,18.789,49H8V13H23.4A7.605,7.605,0,0,1,31,20.605a1,1,0,1,0,2,0A7.605,7.605,0,0,1,40.6,13H56V39a1,1,0,0,0,2,0V12a1,1,0,0,0-1-1H40.6A9.613,9.613,0,0,0,32,16.332,9.613,9.613,0,0,0,23.4,11H7a1,1,0,0,0-1,1V50a1,1,0,0,0,1,1H18.789a22.732,22.732,0,0,1,11.863,3.344,2,2,0,0,1-2.1.834A85.069,85.069,0,0,0,9.43,53H4V17a1,1,0,0,0-2,0V54a1,1,0,0,0,1,1H9.43A83.117,83.117,0,0,1,28.1,57.127,3.98,3.98,0,0,0,32,55.859a3.978,3.978,0,0,0,3.9,1.268A83.145,83.145,0,0,1,54.57,55H61a1,1,0,0,0,1-1V17A1,1,0,0,0,61,16Z"
                                        className="fa-primary"
                                    />
                                    <path
                                        id="path4"
                                        d="M28.723,19.613A9.579,9.579,0,0,0,23.4,18H12a1,1,0,0,0,0,2H23.4a7.576,7.576,0,0,1,4.218,1.277,1,1,0,1,0,1.11-1.664Z"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path6"
                                        d="M52,18H40.6a9.581,9.581,0,0,0-5.328,1.613,1,1,0,0,0,1.11,1.664A7.581,7.581,0,0,1,40.6,20H52a1,1,0,0,0,0-2Z"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path8"
                                        d="M28.723,24.613A9.579,9.579,0,0,0,23.4,23H12a1,1,0,0,0,0,2H23.4a7.576,7.576,0,0,1,4.218,1.277,1,1,0,1,0,1.11-1.664Z"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path10"
                                        d="M52,23H40.6a9.581,9.581,0,0,0-5.328,1.613,1,1,0,0,0,1.11,1.664A7.581,7.581,0,0,1,40.6,25H52a1,1,0,0,0,0-2Z"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path12"
                                        d="M28.723,29.613A9.579,9.579,0,0,0,23.4,28H12a1,1,0,0,0,0,2H23.4a7.576,7.576,0,0,1,4.218,1.277,1,1,0,1,0,1.11-1.664Z"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path14"
                                        d="M52,28H40.6a9.581,9.581,0,0,0-5.328,1.613,1,1,0,0,0,1.11,1.664A7.581,7.581,0,0,1,40.6,30H52a1,1,0,0,0,0-2Z"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path16"
                                        d="M28.723,34.613A9.579,9.579,0,0,0,23.4,33H12a1,1,0,0,0,0,2H23.4a7.576,7.576,0,0,1,4.218,1.277,1,1,0,1,0,1.11-1.664Z"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path18"
                                        d="M52,33H40.6a9.581,9.581,0,0,0-5.328,1.613,1,1,0,0,0,1.11,1.664A7.581,7.581,0,0,1,40.6,35H52a1,1,0,0,0,0-2Z"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path20"
                                        d="M28.723,39.613A9.579,9.579,0,0,0,23.4,38H12a1,1,0,0,0,0,2H23.4a7.576,7.576,0,0,1,4.218,1.277,1,1,0,1,0,1.11-1.664Z"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path22"
                                        d="M52,38H40.6a9.581,9.581,0,0,0-5.328,1.613,1,1,0,0,0,1.11,1.664A7.581,7.581,0,0,1,40.6,40H52a1,1,0,0,0,0-2Z"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path24"
                                        d="M23.4,43H12a1,1,0,0,0,0,2H23.4a7.576,7.576,0,0,1,4.218,1.277,1,1,0,1,0,1.11-1.664A9.579,9.579,0,0,0,23.4,43Z"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path26"
                                        d="M52,43H40.6a9.581,9.581,0,0,0-5.328,1.613,1,1,0,0,0,1.11,1.664A7.581,7.581,0,0,1,40.6,45H52a1,1,0,0,0,0-2Z"
                                        className="fa-secondary"
                                    />
                                </svg>
                                <div className="nav-item dropdown link-text-sidebar">
                                    <a className="dropdown-toggle" data-toggle="dropdown"
                                       href="#"
                                       role="button"
                                       aria-haspopup="true"
                                       aria-expanded="false">
                                        <span>Livres</span>
                                    </a>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="/availableBooks">Livres disponibles</Link>
                                        <Link className="dropdown-item" to="/UnAvailableBooks">
                                            Livres indisponibles
                                        </Link>
                                        <div className="dropdown-divider"/>
                                        <Link className="dropdown-item" to='/books'>Tout mes livres</Link>
                                    </div>
                                </div>
                            </a>
                        </li>

                        <li className="sidebar-nav-item display-none-mobile">
                            <Link to='/authors' className="sidebar-nav-link">
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fad"
                                    data-icon="pen"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{background: "new 0 0 334.876 334.876;"}}
                                    viewBox="0 0 334.876 334.876"
                                    y="0px"
                                    x="0px"
                                    id="Capa_1"
                                    version="1.1"
                                    className="svg-inline--fa fa-w-6 fa-9x"
                                >
                                    <g id="g8">
                                        <path
                                            id="path2"
                                            d="M35.243,94.888c12.885,19.483,24.198,42.637,25.982,46.618c0.511,1.148,1.316,3.856,2.219,7.169   c6.282-8.877,13.946-16.214,23.105-21.599c13.07-7.68,28.093-10.845,44.312-10.084c-3.916-6.217-7.479-12.619-9.192-17.601   c-4.4-12.776-20.348-65.53-29.676-88.053c-9.323-22.523-44.834-6.494-65.47,5.238S4.73,42.765,6.829,46.747   C8.923,50.728,22.358,75.405,35.243,94.888z"
                                            fill="#F8F8FB"
                                            className="fa-primary"
                                        />
                                        <path
                                            id="path4"
                                            d="M114.37,167.478c27.446-11.313,33.314,2.41,33.314,2.41c8.697-8.066,2.622-17.601,2.622-17.601   s2.197-4.085-1.36-8.278c-2.176-2.556-9.187-11.835-15.322-21.582c-16.219-0.761-31.242,2.404-44.312,10.084   c-9.159,5.385-16.823,12.717-23.105,21.599c2.235,8.186,5.102,20.179,5.847,22.268c1.05,2.932,3.769,6.913,6.288,7.435   c2.513,0.522,3.981,2.932,3.981,2.932c3.247,6.598,13.407,7.016,13.407,7.016S86.919,178.791,114.37,167.478z"
                                            fill="#F8F8FB"
                                            className="fa-primary"
                                        />
                                        <path
                                            id="path6"
                                            d="M319.156,225.659c-8.409-6.576-19.662-9.736-28.631-15.556   c-23.187-15.044,6.848-28.903,16.79-37.867c16.883-15.219,21.316-32.754,14.326-54.048c-2.186-6.663-6.924-13.69-4.737-7.033   c11.95,36.42-26.026,53.825-45.313,74.189c-7.103,7.5-6.124,15.632,1.256,23.116c14.278,14.479,57.23,26.7,30.606,49.207   c-18.661,15.773-47.624,17.187-68.309,30.508c-2.796,1.8-3.122,6.641-0.31,8.61c20.315,14.207,48.44,10.786,68.456,23.687   c-34.527,10.389-70.746,3.612-106.252,0.359c0.141-1.006,0.016-1.86,0.016-1.86c-4.514-27.658-4.971-33.657-2.877-47.488   c2.094-13.826,0-15.088,0-15.088c-21.37-29.333-47.331-84.73-47.331-84.73c-3.459-5.76-17.182-8.202-34.152-0.631   c-17.601,7.859-16.344,18.645-16.344,18.645l29.86,88.026c1.05,2.828,5.869,4.188,5.869,4.188   c27.973,8.066,50.774,36.333,53.814,40.733c3.04,4.4,5.238,2.725,5.238,2.725l-32.623-73.063c-2.491-0.571-5.031-2.736-6.527-5.945   c-2.165-4.65-1.305-9.633,1.92-11.134c3.225-1.501,7.593,1.05,9.758,5.7c1.632,3.503,1.539,7.19,0.022,9.442l31.101,70.273   c-0.228-0.022-0.457-0.044-0.685-0.065c-6.94-0.598,0.343,8.262,19.842,10.71c43.458,5.455,60.455,5.118,102.336-3.753   c4.297-0.908,4.373-6.396,1.55-9.274c-18.547-18.928-45.704-14.892-67.939-25.232C278.173,281.1,355.778,254.301,319.156,225.659z"
                                            fill="#F8F8FB"
                                            className="fa-secondary"
                                        />
                                    </g>
                                </svg>
                                <span className="link-text-sidebar">Auteurs</span>
                            </Link>
                        </li>

                        <li className="sidebar-nav-item display-none-mobile">
                            <Link to='/categories' className="sidebar-nav-link">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="svg14"
                                    version="1.1"
                                    width="512pt"
                                    viewBox="0 -52 512.00001 512"
                                    height="512pt"
                                    fill="#F8F8FB"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fad"
                                    data-icon="list"
                                    role="img"
                                    className="svg-inline--fa fa-w-6 fa-9x"
                                >
                                    <path
                                        id="path2"
                                        d="m0 113.292969h113.292969v-113.292969h-113.292969zm30.003906-83.289063h53.289063v53.289063h-53.289063zm0 0"
                                        className="fa-primary"
                                    />
                                    <path
                                        id="path4"
                                        d="m149.296875 0v113.292969h362.703125v-113.292969zm332.699219 83.292969h-302.695313v-53.289063h302.695313zm0 0"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path6"
                                        d="m0 260.300781h113.292969v-113.292969h-113.292969zm30.003906-83.292969h53.289063v53.289063h-53.289063zm0 0"
                                        className="fa-primary"
                                    />
                                    <path
                                        id="path8"
                                        d="m149.296875 260.300781h362.703125v-113.292969h-362.703125zm30.003906-83.292969h302.695313v53.289063h-302.695313zm0 0"
                                        className="fa-secondary"
                                    />
                                    <path
                                        id="path10"
                                        d="m0 407.308594h113.292969v-113.296875h-113.292969zm30.003906-83.292969h53.289063v53.289063h-53.289063zm0 0"
                                        className="fa-primary"
                                    />
                                    <path
                                        id="path12"
                                        d="m149.296875 407.308594h362.703125v-113.296875h-362.703125zm30.003906-83.292969h302.695313v53.289063h-302.695313zm0 0"
                                        className="fa-secondary"
                                    />
                                </svg>
                                <span className="link-text-sidebar">Catégories</span>
                            </Link>
                        </li>

                        <li className="sidebar-nav-item dropdown">
                            <a className="sidebar-nav-link nav-link" href="#!">
                                <svg
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    fill="#F8F8FB"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fad"
                                    data-icon="user"
                                    role="img"
                                    className="svg-inline--fa fa-w-6 fa-9x"
                                >
                                    <path
                                        d="M256,0c-74.439,0-135,60.561-135,135s60.561,135,135,135s135-60.561,135-135S330.439,0,256,0z"
                                        className="fa-secondary"/>

                                    <path d="M423.966,358.195C387.006,320.667,338.009,300,286,300h-60c-52.008,0-101.006,20.667-137.966,58.195
			                            C51.255,395.539,31,444.833,31,497c0,8.284,6.716,15,15,15h420c8.284,0,15-6.716,15-15
			                            C481,444.833,460.745,395.539,423.966,358.195z"
                                          className="fa-primary"
                                    />
                                </svg>
                                <div className="nav-item dropdown link-text-sidebar">
                                    <a className="dropdown-toggle" href="#" role="button"
                                       aria-haspopup="true" aria-expanded="false" data-toggle="dropdown">
                                        <span>{user.firstName} {user.lastName}</span>
                                    </a>
                                    <div className="dropdown-menu">
                                        {/* Bouton nouveau membre */}
                                        {isAuthenticated && haveRole(user, "MANAGER") && (
                                            <>
                                                <Link className="dropdown-item" to="/register">
                                                    Ajouter un utilisateur
                                                </Link>
                                                <Link className="dropdown-item" to={"/library/" + library.id}>
                                                    Modifier sa librairie
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </a>
                        </li>

                        <li className="sidebar-nav-item">
                            <a href="#" className="sidebar-nav-link">
                                {
                                    (isAuthenticated && (
                                        <div onClick={handleLogout}>
                                            <svg viewBox="0 0 512.016 512" width="512pt"
                                                 xmlns="http://www.w3.org/2000/svg" fill="#F8F8FB">
                                                <path
                                                    d="m496 240.007812h-202.667969c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16 0 8.832032-7.167969 16-16 16zm0 0"/>
                                                <path
                                                    d="m416 320.007812c-4.097656 0-8.191406-1.558593-11.308594-4.691406-6.25-6.253906-6.25-16.386718 0-22.636718l68.695313-68.691407-68.695313-68.695312c-6.25-6.25-6.25-16.382813 0-22.632813 6.253906-6.253906 16.386719-6.253906 22.636719 0l80 80c6.25 6.25 6.25 16.382813 0 22.632813l-80 80c-3.136719 3.15625-7.230469 4.714843-11.328125 4.714843zm0 0"/>
                                                <path
                                                    d="m170.667969 512.007812c-4.566407 0-8.898438-.640624-13.226563-1.984374l-128.386718-42.773438c-17.46875-6.101562-29.054688-22.378906-29.054688-40.574219v-384c0-23.53125 19.136719-42.6679685 42.667969-42.6679685 4.5625 0 8.894531.6406255 13.226562 1.9843755l128.382813 42.773437c17.472656 6.101563 29.054687 22.378906 29.054687 40.574219v384c0 23.53125-19.132812 42.667968-42.664062 42.667968zm-128-480c-5.867188 0-10.667969 4.800782-10.667969 10.667969v384c0 4.542969 3.050781 8.765625 7.402344 10.28125l127.785156 42.582031c.917969.296876 2.113281.46875 3.480469.46875 5.867187 0 10.664062-4.800781 10.664062-10.667968v-384c0-4.542969-3.050781-8.765625-7.402343-10.28125l-127.785157-42.582032c-.917969-.296874-2.113281-.46875-3.476562-.46875zm0 0"/>
                                                <path
                                                    d="m325.332031 170.675781c-8.832031 0-16-7.167969-16-16v-96c0-14.699219-11.964843-26.667969-26.664062-26.667969h-240c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-15.9999995 16-15.9999995h240c32.363281 0 58.664062 26.3046875 58.664062 58.6679685v96c0 8.832031-7.167969 16-16 16zm0 0"/>
                                                <path
                                                    d="m282.667969 448.007812h-85.335938c-8.832031 0-16-7.167968-16-16 0-8.832031 7.167969-16 16-16h85.335938c14.699219 0 26.664062-11.96875 26.664062-26.667968v-96c0-8.832032 7.167969-16 16-16s16 7.167968 16 16v96c0 32.363281-26.300781 58.667968-58.664062 58.667968zm0 0"/>
                                            </svg>
                                            <span className="link-text-sidebar">Deconnexion</span>
                                        </div>
                                    ))
                                }
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default SideBar;