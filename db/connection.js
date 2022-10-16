const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Password1!',
      database: 'business'
    },
    console.log('Connected to the database.')
  );

  module.exports = db;