require('dotenv').config();

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {

    const password = atob(req.body.password);
    const user = await User.findOne({username : req.body.username, password : password});
    
    if (user) {
        const jwtSecret = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(
            {username : user.name, id : user._id}, 
            jwtSecret,
            { expiresIn : '1H'}
        );
        
        res.json({userId : user._id, token : token});
    } else {
        res.status(404).send("Username or Password is incorrect!");
    }
    
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/verify/token', async(req, res) => {

    const jwtSecret = process.env.JWT_SECRET_KEY;
    const token = req.body.token;

    jwt.verify(token,jwtSecret, (error, decodedToken) => {
        switch(error.name) {
            case 'TokenExpiredError': 
                res.status(401).send('Token already expired!');
                break;
            case 'JsonWebTokenError':
                res.status(401).send('Invalid Token!');
                break;
            default :
                res.status(401).send('Authentication Failed!');
                break;
        }
        res.json(decodedToken);
    });

});


module.exports = router;