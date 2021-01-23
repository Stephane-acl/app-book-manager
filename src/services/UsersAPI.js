import axios from "axios";
import {USERS} from "../config";

function register(user) {
    return axios.post(USERS, user);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register
};