export const API_URL = process.env.REACT_APP_DEV_LOCAL
	? "http://127.0.0.1:8000"
	: "https://api-book-manager.herokuapp.com"


export const LOGIN_API = API_URL + "/login_check"
export const USERS = API_URL + "/users"
export const BOOKS = API_URL + "/books"
export const AUTHORS = API_URL + "/authors"