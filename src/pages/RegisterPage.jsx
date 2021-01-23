import React, {useState} from "react";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import UsersAPI from "../services/UsersAPI";
import {toast} from "react-toastify";


const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    // Gestion des changements des inputs dans le formulaire
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setUser({...user, [name]: value});
    };

    //Gestion de la soumission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiErrors = {};

        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec votre mot de passe original";
            setErrors(apiErrors);
            toast.error("Des erreurs dans votre formulaire");
            return;
        }

        try {
            await UsersAPI.register(user);
            setErrors({});

            toast.success("Vous êtes desormais inscrit, vous pouvez vous connecter !");
            history.replace('/login');

        } catch (error) {
            const {violations} = error.response.data;
            if (violations) {

                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
            toast.error("Des erreurs dans votre formulaire");
        }
    };

    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field name="firstName"
                       label="Prénom"
                       error={errors.firstName}
                       value={user.firstName}
                       onChange={handleChange}
                />
                <Field name="lastName"
                       label="Nom"
                       error={errors.lastName}
                       value={user.lastName}
                       onChange={handleChange}
                />
                <Field name="email"
                       label="Email"
                       error={errors.email}
                       value={user.email}
                       onChange={handleChange}
                       type="email"
                />
                <Field name="password"
                       label="Mot de passe"
                       type="password"
                       error={errors.password}
                       value={user.password}
                       onChange={handleChange}
                />
                <Field name="passwordConfirm"
                       label="Confirmation du mot de passe"
                       type="password"
                       error={errors.passwordConfirm}
                       value={user.passwordConfirm}
                       onChange={handleChange}
                />
            </form>
            <div className='form-group'>
                <button type='submit' className='btn btn-success' onClick={handleSubmit}>Confirmation</button>
                <Link to='/login' className='btn btn-link'>J'ai déja un compte</Link>
            </div>
        </>
    )
}

export default RegisterPage;