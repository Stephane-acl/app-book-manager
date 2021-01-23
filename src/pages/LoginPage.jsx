import React, {useState, useContext} from 'react';
import AuthApi from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";

const LoginPage = ({history}) => {

    const {setIsAuthenticated} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState("");

    //Gestion des champs
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setCredentials({...credentials, [name]: value});
    };

    //Gestion du submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AuthApi.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes connecté !")
            history.replace("/");
        } catch (error) {
            setError("Aucun compte ne posssède cette adresse email ou alors les informations de correspondent pas !");
            toast.error("Une erreur est survenue");
        }
    };

    return (
        <>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit}>
                <Field label="Adresse email"
                       name='username'
                       value={credentials.username}
                       onChange={handleChange}
                       placeholder="prenom@exemple.com"
                       error={error}
                       type='email'
                />

                <Field label="Mot de passe"
                       name='password'
                       value={credentials.password}
                       onChange={handleChange}
                       type="password"
                />
                <div className='form-group'>
                    <button type='submit' className='btn btn-success'>Se connecter</button>
                </div>
            </form>
        </>
    )
}

export default LoginPage;