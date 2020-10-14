const express = require('express');
//const path = require('path');
const connectDB = require('./config/db');
const app = express();

// Connect Database
connectDB();
// Init Middleware
app.use(express.json({ extended: false }));
// Define Routes
app.use('/api/products', require('./routes/api/products'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/category', require('./routes/api/category'));

const PORT = process.env.PORT || 5433;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
