const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
	//Write your code here

	const username = req.body.username;
	const password = req.body.password;

	if (username && password) {
		if (usernameExists(username)) {
			return res.status(404).json({ message: "Username already exists" });
		} else {
			users.push({ username, password });
			return res.status(200).json({ message: "User successfully added!" });
		}
	} else {
		return res.status(404).json({
			message:
				"Please enter BOTH a username and a password. Unable to register user.",
		});
	}
});

function usernameExists(username) {
	// Only returning first match
	let existingUser = users.filter((user) => {
		return user.username === username;
	});

	if (existingUser.length > 0) {
		return true;
	} else {
		return false;
	}
}

// Get the book list available in the shop
public_users.get("/", function (req, res) {
	//Write your code here

	if (books) return res.send(JSON.stringify(books, null, 4));
	else return res.status(204).send();
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
	//Write your code here
	const isbnNumber = req.params.isbn;

	if (books[isbnNumber])
		return res.send(JSON.stringify(books[isbnNumber], null, 4));
	else
		return res.status(300).json({ message: "No book with that ISBN number" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
	//Write your code here

	const bookKeys = Object.keys(books);
	const booksByAuthor = [];
	bookKeys.map((key) => {
		if (books[key].author == req.params.author) booksByAuthor.push(books[key]);
	});
	if (booksByAuthor.length > 0) return res.send(booksByAuthor);
	else return res.status(300).json({ message: "No books by that author" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
	//Write your code here
	const bookKeys = Object.keys(books);
	const booksByTitle = [];
	bookKeys.map((key) => {
		if (books[key].title == req.params.title) booksByTitle.push(books[key]);
	});
	if (booksByTitle.length > 0) return res.send(booksByTitle);
	else return res.status(300).json({ message: "No books by that title" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
	//Write your code here
	const isbnNumber = req.params.isbn;
	const selectedBook = books[isbnNumber];

	if (selectedBook) {
		if (Object.keys(selectedBook.reviews).length == 0) {
			return res.status(300).json({ message: "No reviews for this book yet" });
		} else return res.send(JSON.stringify(selectedBook.reviews));
	} else {
		return res.status(300).json({ message: "No book with that ISBN number" });
	}
});

module.exports.general = public_users;
