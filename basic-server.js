const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
// const routes = require('./routes');
const db = require('./dbConnect');
const app = express();

app.use(cors());
app.use(parser());

db.query('show tables', (err, rows) => {
    if(err) {
        console.log(err);
    } else {
        console.log(rows);
    }
});


// app.use('/', routes);
app.listen(3000, () => {
  console.log('chatterbox-serer listen on 3000');
});

module.exports = app;
