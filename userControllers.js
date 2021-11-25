const User = require('./userSchema');


exports.createNewUser = (req, res) => {
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