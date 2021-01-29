import React, {useState, useContext} from 'react';
import AuthApi from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";
import {haveRole} from "../services/functions";

const LoginPage = ({history}) => {

    const {user, setIsAuthenticated} = useContext(AuthContext);
    const [count, setCount] = useState(1)
    const [loading, setLoading] = useState(false)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    //  useEffect(() => {
    //      if (user) {
    //          document.location.reload()
    //      }
    //  }, [user])

    //Gestion des champs
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setCredentials({...credentials, [name]: value});
    };

    // Gestion au submit authentification
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await AuthApi.authenticate(credentials);
            setIsAuthenticated(true);
            toast.success("Vous êtes connecté !")
            history.replace("/");
            if (haveRole(user, "ADMIN")) {
                document.location.reload();
            }
        } catch (error) {
            setLoading(false);
            let label = count > 1 ? count + " tentatives" : count + " tentative"
            toast.error("Mauvaise combinaison login/mot de passe - " + label)
            setCount(count + 1)
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
                       type='email'
                />

                <Field label="Mot de passe"
                       name='password'
                       value={credentials.password}
                       onChange={handleChange}
                       type="password"
                />
                <div className='form-group'>
                    <button type='submit' disabled={loading} className='btn btn-success'>
                        {loading ? (
                            <span className="spinner-border spinner-border-sm"/>
                        ) : (
                            <>Se connecter</>
                        )}
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginPage;