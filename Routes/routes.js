const express = require('express');
const products = require('../models/products');
const User = require('../models/users');
const Order = require('../models/orders');
const auth = require('../middleware/jwt');
const routes = express.Router();

routes.get("/products", auth, async (req, res)=>{

    try{
        const product = await products.find({});
        if(!product){
            return res.status(400).json({
                msg:"Something went wrong"
            });
        }
        else{
            return res.status(200).json({
                product: product,
                msg:"All data feted"
            });
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: "Internal Server Error",
          });
    }
});

routes.post('/add-product', auth, async (req, res) => {
    try {
      console.log("getting rquests");
      const { pname, company, category, price, quality, imageUrl } = req.body;
  
      const newProduct = new products({
        pname,
        company,
        category,
        price,
        quality,
        imageUrl,
      });
  
      const savedProduct = await newProduct.save();

      return res.status(201).json({
        product: savedProduct,
        msg: 'Product added successfully',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  });

  routes.get('/all-orders', auth, async (req, res) => {
    try {
    
      const orders = await Order.find({});
  
      res.status(200).json({
        orders: orders,
        msg: 'All orders fetched successfully',
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  });

  routes.post('/add-orders', auth, async (req, res) => {
    try {
      const { orderDate, customerid, amount, status, discounts, remarks } = req.body;
  
      const newOrder = new Order({
        orderDate,
        customerid,
        amount,
        status,
        discounts,
        remarks,
      });
  
      const savedOrder = await newOrder.save();
  
      res.status(201).json({
        order: savedOrder,
        msg: 'Order added successfully',
      });
    } catch (error) {
      console.error('Error adding order:', error);
      res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  });

routes.get('/users', auth, async (req, res) => {
    try {
      const users = await User.find({});
      if(!users){
        return res.status.json({
          msg:"Unable to Fetch user from the Database! Please Retry!"
        });
      }
  
      return res.status(200).json({
        users: users,
        msg: 'All users fetched successfully',
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        msg: 'Internal Server Error',
      });
    }
  });
module.exports = routes;