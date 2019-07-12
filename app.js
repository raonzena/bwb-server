const express = require('express');
const cors = require('cors');
const http = require('http');
const parser = require('body-parser');
const routes = require('./routes/routes');
const app = express();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'OPTIONS'],
    confidential: true
}));
app.use(parser());
app.use(routes);



// app.use('/', routes);
app.listen(3000, () => {
    console.log('chatterbox-serer listen on 3000');
});

module.exports = app;