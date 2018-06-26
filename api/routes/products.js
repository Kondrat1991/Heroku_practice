const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

let Product = require('../models/products');

router.get('/', function (req, res, next) {
    Product.find()
        .select('-__v')
        .exec()
        .then(docs => {
            res.status(200).json({
                message: 'Products',
                allProducts: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            })
        });
});

router.post('/', function (req, res, next) {
    let product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        price: req.body.price
    });
    product
        .save()
        .then(doc => {
            res.status(201).json({
                message: 'product was created',
                createdProduct: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            })
        })
});

router.patch("/:productId", function (req, res, next) {
    Product.findByIdAndUpdate(req.params.productId, {title: req.body.title})
        .exec()
        .then(doc => {
            return Product.findById(req.params.productId).exec()
        })
        .then(newDoc => {
            res.status(200).json({
                message: "Product patched!",
                patchedProduct: newDoc
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.put("/:productId", function (req, res, next) {
    Product.findByIdAndUpdate(req.params.productId, {title: req.body.title})
        .exec()
        .then(doc => {
            return Product.findById(req.params.productId).exec()
        })
        .then(newDoc => {
            res.status(200).json({
                message: "method put used already",
                putProduct: newDoc
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.delete("/:productId", function (req, res, next) {
    if(req.auth) {
        Product.findByIdAndRemove(req.params.productId)
            .exec()
            .then((doc) => {
                res.status(200).json({
                    message: "product is delete now",
                    id: doc._id
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }
    else {
        res.status(418).json({
            message: 'You need to login'
        })
    }
});

module.exports = router;



