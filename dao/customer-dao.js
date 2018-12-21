var connection = require('../db/conn');

const sqlGetById = "SELECT * FROM customer WHERE customer_number = ?";
const sqlUpdate = "UPDATE customer SET ? WHERE customer_number = ?";
const sqlGetAll = "SELECT * FROM customer";
const sqlInsert = "INSERT INTO customer SET ?";
const sqlDelete = "DELETE FROM customer WHERE customer_number = ?";

//dia terima dua parameter, id dan callback
exports.getById = function getById(id, callback) {
    //sebenarnya function juga callback, nah mysql naroh parameter error di yang pertama
    connection.query(sqlGetById,id, function (error, rows){
        //kalo udah eror yaudah
        if(error){
            console.log(error);
            //kalo ga return jalan terus kebawah, jadi pas balikin eror yaudah selesai. getoo.
            return callback(error);
        }
        //disi 2 null sebagai error, rows itu datanya
        callback(null, rows[0]);
    });
};

exports.getAll = function getAll(callback) {
    connection.query(sqlGetAll, function (error,rows){
        if(error){
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};

exports.insert = function insert(data, callback) {
    connection.query(sqlInsert, data, function (error, rows){
        if (error){
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};
//buat method update, berdasarkan id
exports.update = function update(id, data, callback){
    //[data, id] adalah array ini buat parameter lebih dari satu. parameternya dijadiin aray. urutannya sesuai || function(data1,data2) dia akan SELALU menaruh eror di data1
    connection.query(sqlUpdate, [data, id], function(error,rows){
        if (error){
            console.log(error);
            return callback(error);
        }
        callback(null,rows);
    });
};

exports.del = function del (id, callback){
    connection.query(sqlDelete, id, function (error,rows){
        if(error){
            console.log(error);
            return callback(error);
        }
        callback(null, rows);
    });
};