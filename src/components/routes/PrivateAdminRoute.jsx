import React, {useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
import {haveRole} from "../../services/functions";
import {Redirect, Route} from "react-router-dom";

const PrivateAdminRoute = ({path, component}) => {
    const {isAuthenticated, user} = useContext(AuthContext);
    return isAuthenticated && haveRole(user, "ADMIN") ? <Route path={path} component={component}/> : <Redirect to="/"/>;
};

export default PrivateAdminRoute;