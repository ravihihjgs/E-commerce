import  express from 'express';
import  colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authroute from './routes/authroute.js';
import CategoryRoutes from "./routes/CategoryRoutes.js";
import ProductRoute from "./routes/ProductRoute.js";
import cors from 'cors'

 

//configure of enviromental
dotenv.config();  //(path:'folder name if env in some folder')

//db config
connectDB();


//rest object
const app=express();


//middleware
app.use(express.json());
app.use(morgan('dev'));


//routes api

app.use("/api/v1/auth",authroute);
app.use('/api/v1/category',CategoryRoutes)
app.use('/api/v1/product',ProductRoute)






app.get('/',(req,res)=>{
    res.send("<h1>wlcome to artifulstitches</h1>");
})

//port
const PORT =process.env.PORT ||5000; //process.env .PORT(port name) to connect to env to server.js 5000 to config when some error happen it consider 5000

//run lisen
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode port on  ${PORT}`.bgCyan.white);
})