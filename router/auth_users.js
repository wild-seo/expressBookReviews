const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
	//returns boolean
	//write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
	//returns boolean
	//write code to check if username and password match the one we have in records.
	let validUser = users.filter((user) => {
		return username == user.username && password == user.password;
	});

	if (validUser.length > 0) {
		return true;
	} else {
		return false;
	}
};

//only registered users can login
regd_users.post("/login", (req, res) => {
	//Write your code here
	const username = req.body.username;
	const password = req.body.password;

	if (!username || !password) {
		return res.status(404).json({
			message:
				"Please enter BOTH a username and a password. Unable to login user.",
		});
	} else {
		if (authenticatedUser(username, password)) {
		}
	}
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
	//Write your code here
	return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
