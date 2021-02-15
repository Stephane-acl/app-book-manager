import axios from 'axios';
import {AUTHORS, BOOKS, CATEGORIES, LIBRARY} from "../config";
import * as API from "../config"
import AuthAPI from "./AuthAPI";


function findAll(target, condition = null) {
    return axios.get(condition ? API[target] + condition : API[target]).then(async (response) => {
        return response.data["hydra:member"] ? response.data["hydra:member"] : response.data
    })
}

function find(target, id) {
    return axios.get(API[target] + "/" + id).then(async (response) => {
        isAuthorize(response)
        return response.data
    })
}

function update(target, id, data) {
    return axios.put(API[target] + "/" + id, data).then(async (response) => {
        isAuthorize(response)
        return response
    })
}


// TARGET BOOKS
function findBook(id) {
    return axios.get(BOOKS + '/' + id)
        .then(response => response.data);
}

function updateBook(id, book) {
    return axios.put(BOOKS + '/' + id, {...book, author: `/authors/${book.author}`, category: `/categories/${book.category}`});
}

function createBook(book) {
    return axios.post(BOOKS, {...book, author: `/authors/${book.author}`, category: `/categories/${book.category}`});
}

function deleteAuthor(id) {
    return axios
        .delete(AUTHORS + '/' + id)
}
// TARGET AUTHORS

//function findAllAuthors() {
//    return axios.get(AUTHORS).then(response => response.data['hydra:member'])
//}

function findAuthor(id) {
    return axios.get(AUTHORS + '/' + id)
        .then(response => response.data);
}

function updateAuthor(id, author) {
    return axios.put(AUTHORS + '/' + id, author);
}

function createAuthor(author) {
    return axios.post(AUTHORS, author);
}

// TARGET CATEGORIES

function deleteCategory(id) {
    return axios.delete(CATEGORIES + '/' + id);
}

function findCategory(id) {
    return axios.get(CATEGORIES + '/' + id).then(async  (response) => {
        isAuthorize(response)
        return response.data
    })
}

function updateCategory(id, category) {
    return axios.put(CATEGORIES + '/' + id, category);
}

function createCategory(category) {
    return  axios.post(CATEGORIES, category);
}

//*******//
function isAuthorize(response) {
    if (response.status === 401) {
        AuthAPI.reloadApp()
        return false
    }
    return true
}

function getLibrary() {
    return axios.get(LIBRARY).then((response ) => response.data['hydra:member'][0]);
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    findAll,
    find,
    update,
    delete: deleteAuthor,
    findBook,
    updateBook,
    createBook,
    findAuthor,
    updateAuthor,
    createAuthor,
    deleteCategory,
    findCategory,
    updateCategory,
    createCategory,
    getLibrary
};