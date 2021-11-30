# A simple Express application

A bookstore RESTful API built in Node.js using Express and Mongoose.

**Use guide:*

**General:**

* To register as a new user to the book store, send a POST request to localhost:8080/users, with a JSON object:

    ``` JSON

        {
            "username": "non-spaced string, unique",
            "firstName": "non-spaced string, non-unique",
            "lastName": "non-spaced string, non-unique"
        }

    ```

**Admin:**

* To add a new book to the library, send a POST request to localhost:8080/books, with a JSON object:

    ``` JSON

        {
            "name": "Name of book (string)",
            "author": "Author of book (string)",
            "publisher": "Publisher of book (string)",
            "price": Price of book (number),
            "copies": Number of copies in stock (number)
        }

    ```

* To view the full information and IDs of books available in the bookstore, send a GET request to localhost:8080/books, with a JSON object:

    ``` JSON

        {
            "username": "admin"
        }

    ```

* To get a particular book from the library, send a GET request to localhost:8080/books/:bookId

* To update a particular book available, send a PUT request to localhost:8080/books, with a JSON object:

    ``` JSON

        {
            "bookId": "ID of book in database, gotten from admin GET request to all books (string)",
            "name": "New Name of book if changed, else do not include property in JSON object (string)",
            "author": "New author of book if changed, else do not include property in JSON object (string)",
            "publisher": "New author of book if changed, else do not include property in JSON object (string)",
            "price": New price of book, if changed, else do not include property in JSON object, (number),
            "copies": New number of copies in store, if changed, else do not include property in JSON object (number),
        }

    ```

* To delete a particular book from the library, send a DELETE request to localhost:8080/books, with a JSON object:

    ``` JSON

        {
            "bookId": "ID of book in database, gotten from admin GET request to all books (string)"
        }

    ```

* To view the full information and IDs of users registered to the bookstore, send a GET request to localhost:8080/users, with a JSON object:

    ``` JSON

        {
            "username": "admin"
        }

* To get a particular registered user, send a GET request to localhost:8080/books/:userId

* To update a particular user, send a PUT request to localhost:8080/users, with a JSON object:

    ``` JSON

        {
            "userId": "ID of users in database, gotten from admin GET request to all users (string)",
            "username": "registered user's username (string)",
            "firstName": "New first name of user if changed, else do not include property in JSON object (string)",
            "lastName": "New last name of user if changed, else do not include property in JSON object (string)"
        }

    ```

* To delete a particular user, send a DELETE request to localhost:8080/users, with a JSON object:

    ``` JSON

        {
            "username": "registered user's username (string)"
        }

    ```

**Registered Users:**

* To view all books available in the bookstore, send a GET request to localhost:8080/books/:username

* To lend a book, send a GET request to localhost:8080/borrow, with a JSON object:

    ``` JSON

        {
            "username": "registered user's username (string)",
            "name": "Name of book (string)",
            "author": "Author of book (string)"
        }

    ```

* To view all the books you've borrowed, send a GET request to localhost:8080/:username

* To return a book, send a PUT request to localhost:8080/return

    ``` JSON

        {
            "username": "registered user's username (string)",
            "name": "Name of book (string)",
            "author": "Author of book (string)"
        }

    ```

**Thank you!!!**
