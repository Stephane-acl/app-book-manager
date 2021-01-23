import React, {useState} from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorPage from "./pages/AuthorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthApi from "./services/AuthAPI";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
                        <Route exact path="/register" component={RegisterPage}/>
                        <PrivateRoute exact path="/authors/:id" component={AuthorPage}/>
                        <PrivateRoute exact path="/authors" component={AuthorsPage}/>
                        <PrivateRoute exact path="/books/:id" component={BookPage}/>
                        <PrivateRoute exact path="/books" component={BooksPage}/>
                        <PrivateRoute exact path='/' component={HomePage}/>
                    </Switch>
                </main>
            </Router>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
        </AuthContext.Provider>
    );
}

export default App;
