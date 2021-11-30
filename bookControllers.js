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
        const books = Book.find({});
        return res.status(200).json({ message: 'Here are the books in the library:', books });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.getOneBook = (req, res) => {
    const bookId = req.params.bookId;
    try {
        const book = Book.findById(bookId);
        return res.status(200).json({ message: `Here's the book:`, book });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.updateOneBook = (req, res) => {
    if (!req.body.name || req.body.name == '') {
        return res.status(400).json({ message: 'Name field cannot be empty' });
        
    }
    
    if (!req.body.author || req.body.author != '') {
        return res.status(400).json({ message: 'Author field cannot be empty' });
    }


    const bookId = req.body.bookId;
    const bookName = req.body.name;
    const bookAuthor = req.body.author;

    try {
        const book = Book.findByIdAndUpdate(bookId, { ...req.body });

        const users = User.find({});

        users.map(user => {
            return user.books.map(book => {
                if (book._id == bookId) {
                    book.name = bookName;
                    book.author = bookAuthor;
                    return book;
                }
            });
        });

        book.save(function (err) {
            if (err) {
                return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
            }
        });

        users.save(function (err) {
            if (err) {
                return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
            }
        });
        return res.status(200).json({ message: 'Book Updated Successfully', book });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.deleteOneBook = (req, res) => {
    const bookId = req.body.bookId;
    try {
        const book = Book.findByIdAndDelete(bookId);
        return res.status(200).json({ message: 'Book Deleted Successfully', book });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.getBooks = (req, res) => {
    const username = req.params.username;
    const user = User.findOne({ username: username });

    if (!user) {
        return res.status(404).json({ message: 'Page not found!' });
    } else {
        try {
            const books = Book.find({});
            books.map(book => {
                book.id = null;
                book.copies = null;
                return book;
            });
            return res.status(200).json({ message: 'Here are the books in the library:', books });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
        }
    }
}

exports.borrowBook = (req, res) => {
    const username = req.body.username;
    const user = User.findOne({ username: username });

    if (!user) {
        return res.status(404).json({ message: 'Page not found!' });
    } else {
        try {
            const book = Book.findOne({ name: req.body.name, author: req.body.author });
            user.books.push(book);

            book.copies--;
            book.save(function (err) {
                if (err) {
                    return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
                }
            });

            user.save(function (err) {
                if (err) {
                    return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
                }
            });

            book.id = null;
            book.copies = null;
            return res.status(200).json({ message: 'Book borrowed successfully:', book });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
        }
    }
}

exports.getUserBooks = (req, res) => {
    try {
        const username = req.params.username;
        const user = User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: 'Page not found!' });
        }

        const books = user.books;
        books.map(book => {
            book.id = null;
            book.copies = null;
            return book;
        });
        
        return res.status(200).json({ message: `Here are the books you've borrowed from the library:`, books });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.returnBook = (req, res) => {
    const username = req.body.username;
    const user = User.findOne({ username: username });

    if (!user) {
        return res.status(404).json({ message: 'Page not found!' });
    } else {
        try {
            const book = Book.findOne({ name: req.body.name, author: req.body.author });
            book.copies++;
            book.save(function (err) {
                if (err) {
                    return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
                }
            });

            user.save(function (err) {
                if (err) {
                    return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
                }
            });

            book.id = null;
            book.copies = null;
            return res.status(200).json({ message: 'Book returned successfully:', book });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
        }
    }
}