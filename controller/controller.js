'use strict';
var util = require('util');

var response = require('../res/res');
var connection = require('../db/conn');

exports.customer = function(req, res) {
    connection.query('SELECT * FROM customer', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

exports.testpost = function(req, res) {
    response.ok("Post Masuk "+util.inspect(req.body), res)
};

exports.insertCustomer = function(req, res) {
    connection.query('INSERT INTO customer set ?', req.body , function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

const sqlGetById = "SELECT * FROM customer where customer_number = ?";
exports.findById = function(req, res) {
    // var id = req.params.id;
    connection.query(sqlGetById,req.params['id'],function (error, rows){
        if(error){
            console.log(error)
        } else{
            response.ok(rows[0], res)
        }
    });
};