const Book = require('./bookSchema');

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