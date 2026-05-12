const express = require('express');
require('dotenv').config({ path: './config.env' });
const morgan = require('morgan');

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode : ${process.env.NODE_ENV}`);
}

app.get('/', (req, res) => { 
    res.send('Hello World Node v1');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});