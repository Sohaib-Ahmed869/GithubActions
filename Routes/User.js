const express = require('express');
const { default: users } = require('../users');
const router = express.Router();

const UsersArray = users;

router.get('/', (req, res) => {
    res.json(UsersArray);
}
);

router.post('/', (req, res) => {
    const newUser = {
        id: UsersArray.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    if (!newUser.name || !newUser.email || !newUser.password) {
        return res.status(400).json({ msg: 'Please include a name, email and password' });
    }
    UsersArray.push(newUser);
    res.json(UsersArray);
}
);

module.exports = router;