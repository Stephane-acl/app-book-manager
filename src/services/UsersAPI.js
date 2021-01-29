import axios from "axios";
import {USERS} from "../config";

function register(user) {
    return axios.post(USERS, user);
}

function find(id) {
    return axios.get(USERS + '/' + id).then(response => response.data);
}

function getUser() {
    return axios.get(USERS).then((response ) => response.data['hydra:member'][0]);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    find,
    getUser
};