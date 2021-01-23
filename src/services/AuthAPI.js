import axios from "axios";
import {LOGIN_API} from "../config";
import jwtDecode from "jwt-decode";


// TARGET LOGOUT
// Deconnexion (Suppression du token du local storage et sur Axios )
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers['Authorization'];
}

// TARGET LOGIN
//Requête http d'authentification et stockage du token dans le storage sur axios
function authenticate(credentials) {
    return axios.post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            // Je stocke mon token dans le localStorage
            window.localStorage.setItem("authToken", token);

            // On prévient axios qu'on a maintenant un header par défaut sur toutes nos futures requêtes HTTP
            setAxiostoken(token);
        })
}

//Positionne jwt token sur axios
function setAxiostoken(token) {
    axios.defaults.headers['Authorization'] = "Bearer " + token;
}

// KEEP THE TOKEN
//Mise en place lors du chargement de l'application
function setup() {
    // 1. Voir si on a un token ?
    const token = window.localStorage.getItem("authToken");

    // 2. Si le token est encore valide
    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()) {
            setAxiostoken(token);
        }
    }
}

// Permet de savoir si on est authentifié ou pas
function isAuthenticated() {
    // 1. Voir si on a un token ?
    const token = window.localStorage.getItem("authToken");

    // 2. Si le token est encore valide
    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};
