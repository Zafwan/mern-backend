const express = require('express');
const router = express.Router();

// Load Book model
const Book = require('../../models/book');

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
    Book.find()
        .then(books => res.json({
            status: true,
            data: books
        }))
        .catch(err => res.status(404).json({
            status: false,
            message: 'No book in database'
        }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(book => res.json({
            status: true,
            data: book
        }))
        .catch(err => res.status(404).json({
            status: false,
            message: 'No Book found'
        }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
    Book.create(req.body)
        .then(book => res.json({
            status: true,
            message: 'Book added successfully'
        }))
        .catch(err => res.status(400).json({
            status: false,
            message: 'Unable to add this book'
        }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
        .then(book => res.json({
            status: true,
            message: 'Updated successfully'
        }))
        .catch(err =>
            res.status(400).json({
                status: false,
                message: 'Unable to update this book'
            })
        );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id, req.body)
        .then(book => res.json({
            status: true,
            message: 'Book deleted successfully'
        }))
        .catch(err => res.status(404).json({
            status: false,
            message: 'Book not found'
        }));
});

module.exports = router;