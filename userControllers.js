const User = require('./userSchema');


exports.createNewUser = (req, res) => {
    const username = req.body.username;

    const foundUser = User.findOne({ username: username });

    if (foundUser || username == 'admin') {
        return res.status(400).json({ message: 'Username has already been used. Please try another', user });
    }


    try {
        const user = new User({ ...req.body });
        user.save(function (err) {
            if (err) {
                return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
            }
        });
        return res.status(200).json({ message: 'User Created Successfully', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.getAllUsers = (req, res) => {
    if (req.body.username !== 'admin') {
        return res.status(404).json({ message: 'Page not found!' });
    }
    try {
        const users = User.find({});
        return res.status(200).json({ message: 'Here are the registered users in the bookstore:', users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.getOneUser = (req, res) => {
    const userId = req.params.userId;
    try {
        const user = User.findById(userId);
        return res.status(200).json({ message: `Here's the user:`, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}


exports.updateOneUser = (req, res) => {
    const userId = req.body.userId;
    try {
        const user = User.findByIdAndUpdate(userId, { ...req.body });
        user.save(function (err) {
            if (err) {
                return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
            }
        });
        return res.status(200).json({ message: 'User Updated Successfully', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.deleteOneUser = (req, res) => {
    const userId = req.body.userId;
    try {
        const book = Book.findByIdAndDelete(userId);
        return res.status(200).json({ message: 'User Deleted Successfully', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}