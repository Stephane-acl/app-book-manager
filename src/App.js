import React, {useState} from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import AuthorsPage from "./pages/AuthorsPage";
import LoginPage from "./pages/LoginPage";
import AuthApi from "./services/AuthApi";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

AuthApi.setup();

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated());

    const NavBarWithRouter = withRouter(NavBar);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <Router>
                <NavBarWithRouter/>
                <main className="container pt-5">
                    <Switch>
                        <Route exact path="/login" component={LoginPage}/>
                        <PrivateRoute exact path="/authors" component={AuthorsPage}/>
                        <PrivateRoute exact path="/books" component={BooksPage}/>
                        <PrivateRoute exact path='/' component={HomePage}/>
                    </Switch>
                </main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
