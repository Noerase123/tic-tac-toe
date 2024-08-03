'use strict';

const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DB || 'db_umbra'
});

const jsonParser = bodyParser.json();

connection.connect();

app.use(express.static(path.join(__dirname, '../build')));

app.use(jsonParser);

app.route('/store')
  .get((req, res) => {
    connection.query('SELECT * FROM game', (err, rows, fields) => {
      if (err) throw err;
    
      console.log('The solution is: ', rows[0])
      res.status(200).json({
        message: 'testing GET',
        data: rows
      });
    });
  })
  .post(jsonParser, (req, res) => {
    const playerOne = req.body.playerOne;
    const playerTwo = req.body.playerTwo;
    const winner = req.body.winner;
    const dateCreated = req.body.dateCreated;
    var sqlQuery = `INSERT INTO game (playerOne, playerTwo, winner, dateCreated) VALUES('${playerOne}', '${playerTwo}', '${winner}', '${dateCreated}')`;
    connection.query(sqlQuery, function(err) {
      if (err) throw err;
      console.log('insert data successfully');
    });
    res.status(201).json({
      message: 'POST successfully'
    });
  })

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});