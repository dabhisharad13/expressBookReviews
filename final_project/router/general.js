const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) {
            users.push({"username":username,"password":password});
            return res.status(200).json({message:`User ${username} registered`});
        }
        else {
            return res.status(400).json({message:`User ${username} already registered`});
        }
    }
    else {
        return res.status(404).json({message: "Must provide username and password"});
    }
});

public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbnNum = parseInt(req.params.isbn);
    if (books[isbnNum]) {
        res.send(books[isbnNum]);
    } else {
        res.status(error.status).json({message: error.message})
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    getBooks()
    .then((bookEntries) => Object.values(bookEntries))
    .then((books) => books.filter((book) => book.author === author))
    .then((filteredBooks) => res.send(filteredBooks));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    getBooks()
    .then((bookEntries) => Object.values(bookEntries))
    .then((books) => books.filter((book) => book.title === title))
    .then((filteredBooks) => res.send(filteredBooks));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbnNum = parseInt(req.params.isbn);
    
    if (books[isbnNum]) {
        const r = books[isbnNum].review;
        res.send(r);
    } else {
        res.status(error.status).json({message: error.message})
    }
});


function getBooks() {
    return new Promise((resolve, reject) => {
        resolve(books);
    });
}

module.exports.general = public_users;
