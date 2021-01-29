import React, {useState, useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Switch, withRouter} from "react-router-dom";

import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/books/BooksPage";
import BookPage from "./pages/books/BookPage";
import BookDetailsPage from "./pages/books/BookDetailsPage";
import AuthorsPage from "./pages/authors/AuthorsPage";
import AuthorPage from "./pages/authors/AuthorPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import CategoryPage from "./pages/categories/CategoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthApi from "./services/AuthAPI";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/routes/PrivateRoute";
import PrivateAdminRoute from "./components/routes/PrivateAdminRoute";
import PrivateLoginRoute from "./components/routes/PrivateLoginRoute";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UsersAPI from "./services/UsersAPI";
import AvailableBooksPage from "./pages/books/AvailableBooksPage";
import UnAvailableBooksPage from "./pages/books/UnAvailableBooksPage";

AuthApi.setup();

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated());
    const [user, setUser] = useState("");

    const loadUserdata = async () => {
        try {
            const userData = await UsersAPI.getUser();
            setUser(userData);
            if (!userData["@id"]) throw Error()
        } catch (e) {
            console.log(e.response);
        }
    }

    useEffect(() => {
        loadUserdata();
    }, []);


    const NavBarWithRouter = withRouter(TopBar);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user}}>
            <Router>
                <NavBarWithRouter/>
                <main className="container pt-5">
                    <Switch>
                        <PrivateLoginRoute exact path="/login" component={LoginPage}/>
                        <PrivateAdminRoute exact path="/register" component={RegisterPage}/>
                        <PrivateRoute exact path="/categories" component={CategoriesPage}/>
                        <PrivateRoute exact path="/categories/:id" component={CategoryPage}/>
                        <PrivateRoute exact path="/authors/:id" component={AuthorPage}/>
                        <PrivateRoute exact path="/authors" component={AuthorsPage}/>
                        <PrivateRoute exact path="/availableBooks" component={AvailableBooksPage}/>
                        <PrivateRoute exact path="/UnAvailableBooks" component={UnAvailableBooksPage}/>
                        <PrivateRoute exact path="/booksDetails/:id" component={BookDetailsPage}/>
                        <PrivateRoute exact path="/books/:id" component={BookPage}/>
                        <PrivateRoute exact path="/books" component={BooksPage}/>
                        <PrivateRoute exact path='/' component={HomePage}/>
                    </Switch>
                </main>
            </Router>
            <ToastContainer position={toast.POSITION.TOP_CENTER}/>
        </AuthContext.Provider>
    );
}

export default App;
