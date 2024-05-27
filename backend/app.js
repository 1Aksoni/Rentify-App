import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();
const path = require("path");
app.use(cors());

    
    app.use(express.json({limit:"16kb"})); 
    app.use(urlencoded({extended:true,limit:"16kb"})); 
    app.use(express.static("public")) 
    
    app.use(cookieParser()) 
    app.use(express.static(path.join(__dirname,'build')));
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname,'build', 'index.html'));     
    });
    //import routes
    import publicRoutes from './routes/public.routes.js';
     import sellerRoutes from './routes/seller.routes.js';
     import buyerRoutes from './routes/buyer.routes.js';
    
     app.get('/', (req, res) => {
        res.send('Hey this is my API running 🥳')
      })
    app.use('/api/v1/auth',publicRoutes);
    app.use('/api/v1/seller',sellerRoutes);
    app.use('/api/v1/buyer',buyerRoutes);

export {app};