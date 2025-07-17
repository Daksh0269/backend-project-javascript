import dotenv from "dotenv"
import connectDB from "./db/database.js";

dotenv.config(
    {  
        path: "./env"
    }
)
connectDB()









// this is first method
/*


const app = express()
;(async () => { 
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("error",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log("app is listening on post -->",process.env.PORT)
        })
    }
    catch(error){
        console.log(error)
        throw error
    }
})()

*/