const express = require('express');
const router = express.Router();
const Food = require('../models/food');


router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    res.json(food);
  } catch (err) {
    res.status(404).send('Food not found!');
  }
});

router.post('/', async (req, res) => {
    try {
        const newFood = new Food(req.body);
        await newFood.save();
        res.status(201).json(newFood);
    } catch(err){
        res.status(501).json({error :  'Failed to create food item!'});
    }
});

router.post('/:id', async (req, res) => {
    try {
        const  { name, price, description, imageUrl, status } = req.body;
        const updatedFood = new Food.findByIdAndUpdate(
            req.params.id,
            { name, price, description, imageUrl, status },
            { new : true}
        );
        if (! updatedFood) {
            return res.status(404).json({error :  'Food does not exists!'})
        }
        res.json(updatedFood);
    } catch(err){
        res.status(501).json({error :  'Failed to update food item!'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);

        if (! deletedFood) {
            return res.status(404).json({error :  'Food does not exists!'})
        }
        res.json(deletedFood);
    } catch(err){
        res.status(501).json({error :  'Failed to update food item!'});
    }
});

module.exports = router;