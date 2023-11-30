const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json');

const app = express();

app.use(cors());

const getRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    return booksData[randomIndex]
}

app.get('/random-book', (req, res) => {
    res.json(getRandomBook());
});

app.get('/random-book-delayed', (req, res) => {
    setTimeout(() => {
        res.json(getRandomBook());
    }, 2000);
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});