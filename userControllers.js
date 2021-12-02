const User = require('./userSchema');


exports.createNewUser = (req, res) => {
    const username = req.body.username;

    try {
        User.findOne({ username: username }, (err, foundUser) => {
            if (err) throw err;
            if (foundUser || username == 'admin') {
                return res.status(400).json({ message: 'Username has already been used. Please try another' });
            } else {
                const user = new User({ ...req.body });
                user.save(function (err, newUser) {
                    if (err) throw err;
                    else return res.status(200).json({ message: 'User Created Successfully', newUser });

                });
            }
        });
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
        User.find({}, (err, foundUsers) => {
            if (err) throw err;
            else return res.status(200).json({ message: 'Here are the registered users in the bookstore:', foundUsers });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.getOneUser = (req, res) => {
    const userId = req.params.userId;
    try {
        User.findById(userId, (err, foundUser) => {
            if (err) throw err;
            else return res.status(200).json({ message: `Here's the user:`, foundUser });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}


exports.updateOneUser = (req, res) => {
    const userId = req.body.userId;
    try {
        User.findByIdAndUpdate(userId, { ...req.body }, (err, user) => {
            if (err) throw err;
            else return res.status(200).json({ message: 'User Updated Successfully', user });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}

exports.deleteOneUser = (req, res) => {
    const userId = req.body.userId;
    try {
        User.findByIdAndDelete(userId, (err, user) => {
            if (err) throw err;
            else return res.status(200).json({ message: 'User Deleted Successfully', user });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Some Error Occured. Please Try Again Later' });
    }
}