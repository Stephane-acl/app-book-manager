import axios from 'axios';
import {AUTHORS, BOOKS} from "../config";


// TARGET BOOKS
function findAllBooks() {
    return axios
        .get(BOOKS)
        .then(response => response.data['hydra:member'])
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


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    findAllBooks,
    findAllAuthors,
    delete: deleteAuthor,
};