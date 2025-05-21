const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', async (req, res) => {
  try {
    const foods = await User.find();
    res.json(foods);
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
        const newFood = new User(req.body);
        await newFood.save();
        res.status(201).json(newFood);
    } catch(err){
        res.status(501).json({error :  'Failed to create user!'});
    }
});

router.post('/:id', async (req, res) => {
    try {
        const  { name, address, email, mobile, userName, password } = req.body;
        const updatedFood = await User.findByIdAndUpdate(
            req.params.id,
            { name, address, email, mobile, userName, password },
            { new : true}
        );
        if (! updatedFood) {
            return res.status(404).json({error :  'User does not exists!'})
        }
        res.json(updatedFood);
    } catch(err){
        console.log('DD>>>', err);
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