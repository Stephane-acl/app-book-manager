export const API_URL = process.env.REACT_APP_DEV_LOCAL
	? "http://127.0.0.1:8000"
	: "https://api-book-manager.herokuapp.com"


export const BOOKS = API_URL + "/books"