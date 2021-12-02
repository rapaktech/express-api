const Book = require('./bookSchema');
const User = require('./userSchema');

exports.createNewBook = (req, res) => {
    try {
        const book = new Book({ ...req.body });
        book.save(function (err) {
            if (err) {
                return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
            }
        });
        return res.status(200).json({ message: 'Book Created Successfully', book });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}


exports.getAllBooks = (req, res) => {
    if (req.body.username !== 'admin') {
        return res.status(404).json({ message: 'Page not found!' });
    }
    try {
        Book.find({}, (err, foundBooks) => {
            if (err) throw err;
            else return res.status(200).json({ message: 'Here are the books in the library:', foundBooks });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.getOneBook = (req, res) => {
    const bookId = req.params.bookId;
    try {
        Book.findById(bookId, (err, foundBook) => {
            if (err) throw err;
            else return res.status(200).json({ message: `Here's the book:`, foundBook });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.updateOneBook = (req, res) => {
    const bookId = req.body.bookId;
    try {
        Book.findByIdAndUpdate(bookId, { ...req.body }, (err, book) => {
            if (err) throw err;
            else return res.status(200).json({ message: 'Book Updated Successfully', book });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.deleteOneBook = (req, res) => {
    const bookId = req.body.bookId;
    try {
        Book.findByIdAndDelete(bookId, (err, book) => {
            if (err) throw err;
            else return res.status(200).json({ message: 'Book Deleted Successfully', book });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.getBooks = (req, res) => {
    const username = req.params.username;
    try {
        User.findOne({ username: username }, (err, foundUser) => {
            if (err) throw err;
            else {
                if (!foundUser) {
                    return res.status(404).json({ message: 'Page not found!' });
                } else {
                    Book.find({}, (err, foundBooks) => {
                        if (err) throw err;
                        else return res.status(200).json({ message: 'Here are the books in the library:', foundBooks });
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.borrowBook = (req, res) => {
    const username = req.body.username;
    const bookId = req.body.bookId;
    try {
        User.findOne({ username: username }, (err, foundUser) => {
            if (err) throw err;
            else {
                if (!foundUser) {
                    return res.status(404).json({ message: 'Page not found!' });
                } else {
                    const book = foundUser.books.find(({ _id }) => _id == bookId);
                    if (book) return res.status(400).json({ message: `You've already borrowed this book before!` });
                    else Book.findById(bookId, (err, foundBook) => {
                        if (err) throw err;
                        foundUser.books.push(foundBook);
                        foundBook.copies--;
                        foundBook.save(function (err, updatedBook) {
                            if (err) throw err;
                            foundUser.save(function (err, updatedUser) {
                                if (err) throw err;
                                else res.status(200).json({ message: 'Book borrowed successfully:', updatedBook, updatedUser });
                            });
                        });
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.getUserBooks = (req, res) => {
    try {
        const username = req.params.username;
        User.findOne({ username: username }, (err, foundUser) => {
            if (err) throw err;
            else {
                if (!foundUser) {
                    return res.status(404).json({ message: 'Page not found!' });
                } else {
                    const books = foundUser.books;
                    return res.status(200).json({ message: `Here are the books you've borrowed from the library:`, books });
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.returnBook = (req, res) => {
    const username = req.body.username;
    const bookId = req.body.bookId;
    try {
        User.findOne({ username: username }, (err, foundUser) => {
            if (err) throw err;
            else {
                if (!foundUser) {
                    return res.status(404).json({ message: 'Page not found!' });
                } else {
                    const book = foundUser.books.find(({ _id }) => _id == bookId);
                    if (!book) return res.status(400).json({ message: `You've not borrowed this book before!` });
                    else Book.findById(bookId, (err, foundBook) => {
                        if (err) throw err;
                        foundUser.books = foundUser.books.filter(book => book._id != bookId);
                        foundBook.copies++;
                        foundBook.save(function (err, updatedBook) {
                            if (err) throw err;
                            foundUser.save(function (err, updatedUser) {
                                if (err) throw err;
                                else res.status(200).json({ message: 'Book returned successfully:', updatedBook, updatedUser });
                            });
                        });
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}