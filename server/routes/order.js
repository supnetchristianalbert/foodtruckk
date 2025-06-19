const express = require('express');
const router = express.Router();
const Order = require('../models/order');


router.get('/', async (req, res) => {
  try {
    const foods = await Order.find();
    res.json(foods);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await Order.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).send('Order not found!');
  }
});

router.post('/', async (req, res) => {
    try {
        const newFood = new Order(req.body);
        await newFood.save();
        res.status(201).json(newFood);
    } catch(err){
        res.status(501).json({error :  'Failed to create order!'});
    }
});

router.post('/:id', async (req, res) => {
    try {
        const { amount, totalBill, foodItem, user, status, description, request } = req.body;
        const updatedFood = await Order.findByIdAndUpdate(
            req.params.id,
            { amount, totalBill, foodItem, user, status, description, request },
            { new : true}
        );
        if (! updatedFood) {
            return res.status(404).json({error :  'Order does not exists!'})
        }
        res.json(updatedFood);
    } catch(err){
        console.log('DD>>>', err);
        res.status(501).json({error :  'Failed to update order!'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedFood = await Order.findByIdAndDelete(req.params.id);

        if (! deletedFood) {
            return res.status(404).json({error :  'Order does not exists!'})
        }
        res.json(deletedFood);
    } catch(err){
        res.status(501).json({error :  'Failed to update order!'});
    }
});

module.exports = router;