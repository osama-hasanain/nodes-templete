const express = require('express');
require('dotenv').config({ path: './config.env' });
const morgan = require('morgan');
const ApiError = require('./utils/api_error');
const globalErrorHandler  = require('./middleware/error_middleware');
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/category_route');

// Connnect with Database
dbConnection();

// Express App
const app = express();

// Middleware
app.use(express.json());
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode : ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/categories', categoryRoute);

app.use( (req,res,next)=>{
 next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 400));
});

// Global Error Handler for express
app.use(globalErrorHandler);


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Handle rejection outside express
process.on('unhandledRejection', (err)=>{
    console.log(`Unhandled Rejection Error ${err.name} | ${err.message}`);
    server.close(()=>{
        console.log('Shutting down server...');
        process.exit(1);
    });
});