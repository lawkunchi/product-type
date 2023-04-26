const express = require("express");
require('dotenv').config();
const mysql = require('mysql');
const app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const db = mysql.createConnection({

    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  
  });
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql Connected");

});


app.get("/createdb", (req, res) => {

    let sql = "CREATE DATABASE nodemysql";
  
    db.query(sql, (err) => {
      if (err) {
        throw err;
      }
      res.send("Database created");
    });
});


app.get("/add-product-type-table", (req, res) => {

    let sql =
  
      "CREATE TABLE product_type(id int AUTO_INCREMENT, type_code VARCHAR(255), markup VARCHAR(255), markup_active_date DATE, type_pic VARCHAR(255), type_description VARCHAR(255), PRIMARY KEY(id))";
  
    db.query(sql, (err) => {
  
      if (err) {
  
        throw err;
  
      }
  
      res.send("Product Type table created");
  
    });
  
  });

  app.post("/add-type", (req, res) => {

    const data = req.body;
    var errors = {};
    if(data.type_code == undefined) {
      errors.type_code = 'Type Code is required.';
    }
   
    if(data.markup == undefined) {
      errors.markup = 'Mark Up is required.';
    }
    if(data.markup_active_date == undefined) {
      errors.markup_active_date = 'Markup Active Date is required.';
    }
    else {
      var date = data.markup_active_date;
      if( new Date(date) !== "Invalid Date" && (!isNaN(new Date(date)))) {
        
      }
      else {
        errors.markup_active_date = 'Please enter a valid date.';
      }
    }

    if(data.type_pic == undefined) {
      errors.type_pic = 'Type Pic is required.';
    }

    if(data.type_description == undefined) {
      errors.type_description = 'Type Description is required.';
    }

  

    if(Object.keys(errors) .length > 0) {
      res.status(200).send({
        success: false,
        errors: errors
      });
    }

    let sql =
  
      `INSERT INTO product_type 
      (type_code, markup, markup_active_date, type_pic, type_description) 
      VALUES 
      ('${data.type_code}', '${data.markup}', '${data.markup_active_date}', '${data.type_pic}', '${data.type_description}')`;

      console.log(sql, 'sql');
  
    db.query(sql, (err) => {
  
      if (err) {
  
        throw err;
      //   res.status(200).send({
      //     success: true,
      //     message: err,
      // });
  
      }
  
          res.status(200).send({
            success: true,
            message: "Product Type Created",
        });
        
  
    });


  });


  app.listen("3000", () => {

    console.log("Server started on port 3000");
  
  });