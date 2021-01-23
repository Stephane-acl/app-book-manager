import axios from 'axios';
import {AUTHORS, BOOKS} from "../config";


// TARGET BOOKS
function findAllBooks() {
    return axios
        .get(BOOKS)
        .then(response => response.data['hydra:member'])
}

function findBook(id) {
    return axios.get(BOOKS + '/' + id)
        .then(response => response.data);
}

function updateBook(id, book) {
    return axios.put(BOOKS + '/' + id, {...book, author: `/authors/${book.author}`});
}

function createBook(book) {
    return axios.post(BOOKS, {...book, author: `/authors/${book.author}`});
}

//TARGET AUTHORS
function findAllAuthors() {
    return axios
        .get(AUTHORS)
        .then(response => response.data['hydra:member'])
}

function deleteAuthor(id) {
    return axios
        .delete(AUTHORS + '/' + id)
}

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


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    findAllBooks,
    findAllAuthors,
    delete: deleteAuthor,
    findBook,
    updateBook,
    createBook,
    findAuthor,
    updateAuthor,
    createAuthor
};