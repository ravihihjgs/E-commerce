import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authroute from './routes/authroute.js';
import CategoryRoutes from "./routes/CategoryRoutes.js";
import ProductRoute from "./routes/ProductRoute.js";
import cors from 'cors';

// Load environment variables
dotenv.config();

// Database connection
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors()); // Enable CORS

// Routes
app.use("/api/v1/auth", authroute);
app.use('/api/v1/category', CategoryRoutes);
app.use('/api/v1/product', ProductRoute);

// Default route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Artful Stitches</h1>");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});