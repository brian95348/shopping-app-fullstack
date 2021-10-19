const Order = require('../models/Order')


const createOrder = async (req,res)=>{
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(201).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateOrder = async (req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {new:true}
        )
        res.status(200).json({success:true,updatedOrder})
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteOrder = async (req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({success:true,message:`${req.params.id} deleted successfully`})
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUserOrders = async (req,res)=>{
    try {
        const orders = await Order.find({userId:req.params.userId})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllOrders = async (req,res)=>{
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {getAllOrders,getUserOrders,createOrder,deleteOrder,updateOrder}