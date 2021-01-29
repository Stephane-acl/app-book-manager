import React, {useContext} from 'react';
import AuthContext from "../../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";

const PrivateLoginRoute = ({path, component}) => {
    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated ? <Redirect to="/"/> : <Route path={path} component={component}/>
};

export default PrivateLoginRoute;