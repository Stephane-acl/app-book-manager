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
            if (haveRole(user, "MANAGER")) {
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

        <div className="container d-flex align-items-center login">
            <div className="col">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5 col-xl-4">
                        <div>
                            <div className="mb-5 text-center">
                                <img
                                    src="/static/img/read.svg"
                                    className="w-50"
                                    alt="BookManager Logo - Service dédiés a la gestion de livres"
                                />
                                <p className="text-muted mb-0">Managez vos livres.</p>
                            </div>
                            <span className="clearfix"/>
                            <form onSubmit={handleSubmit} data-cy="login-form">
                                <div className="form-group">
                                    <label className="form-control-label">Adresse Email</label>
                                    <div className="input-group">
												<span className="input-group-text-login">
													<i className="fad fa-user"/>
												</span>
                                        <Field name='username'
                                               value={credentials.username}
                                               onChange={handleChange}
                                               placeholder="Prenom@exemple.com"
                                               type='email'
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <label className="form-control-label">Mot de passe</label>
                                        </div>
                                    </div>
                                    <div className="input-group">
												<span className="input-group-text-login">
													<i className="fad fa-key"/>
												</span>
                                        <Field name='password'
                                               value={credentials.password}
                                               onChange={handleChange}
                                               type="password"
                                               placeholder="Mot de passe"
                                        />
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <button type='submit' disabled={loading} className='btn btn-block btn-primary'>
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm"/>
                                        ) : (
                                            <>Se connecter</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;