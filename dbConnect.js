var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'bwbtest.cnuvjza6zuce.ap-northeast-2.rds.amazonaws.com',
  user     : 'bwbTest',
  password : 'bwbTest12',
  port     : 13306,
  database : 'bwbTest'
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

module.exports = connection;
