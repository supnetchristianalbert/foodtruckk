require('dotenv').config();

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).send('User not found!');
  }
});

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        const jwtSecret = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(
            { username : user.username, email : user.email}, 
            jwtSecret,
            { expiresIn : '1H'}
        );
        
        await user.save();
        const { _id } = user;
        res.status(201).json({userId : _id, token : token});
    } catch(err){
        console.log('ERRR', err);
        res.status(501).json({error :  'Failed to create user!'});
    }
});

router.post('/:id', async (req, res) => {
    try {
        const  { name, address, email, mobile, username, password } = req.body;
        const updatedFood = await User.findByIdAndUpdate(
            req.params.id,
            { name, address, email, mobile, username, password },
            { new : true}
        );
        if (! updatedFood) {
            return res.status(404).json({error :  'User does not exists!'})
        }
        res.json(updatedFood);
    } catch(err){
        res.status(501).json({error :  'Failed to update user!'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedFood = await User.findByIdAndDelete(req.params.id);

        if (! deletedFood) {
            return res.status(404).json({error :  'User does not exists!'})
        }
        res.json(deletedFood);
    } catch(err){
        res.status(501).json({error :  'Failed to update user!'});
    }
});

module.exports = router;