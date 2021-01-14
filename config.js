export const API_URL = process.env.REACT_APP_DEV_LOCAL
	? "http://127.0.0.1:8000"
	: document.location.href.includes("api-book-manager.herokuapp.com")
	? "https://api-book-manager.herokuapp.com/"
	: "https://244.ip-51-83-79.eu"

export const BOOKS = API_URL + "/books"