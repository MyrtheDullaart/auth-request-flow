const express = require('express');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    const token = jwt.sign(mockUser.username, secret)

    res.json({
        token
    })
});

router.get('/profile', (req, res) => {
    const token = req.headers.authorization

    try {
        jwt.verify(token, secret)
        res.json({
            profile: mockUser.profile
        })
      } catch(err) {
        res.status(401).json({
            message: 'Failure to get profile, not authorised'
        })
      }
});


module.exports = router;
