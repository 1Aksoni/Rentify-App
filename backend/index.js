import connectionDb  from "./db/dbConnection.js";
import dotenv from "dotenv";
import {app} from "./app.js";
dotenv.config();
const port =process.env.PORT || 5000;
//console.log(process.env.PORT);

 connectionDb()
 .then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR:",error);
    });
    
    app.listen(port,()=>{
        console.log(`Server is listening at PORT ${port}`);
    })
 })
 .catch((error)=>{
    console.log("MONGODB connection Failed !!!",error);
 });




