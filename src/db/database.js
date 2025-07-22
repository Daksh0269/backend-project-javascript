import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () =>{
    try {
        const connectInstant = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        // console.log(connectInstant)
        console.log(`\n MongoDB connected !! DB_HOST : ${connectInstant.connection.host} `)
    } catch (error) {
        console.log("database has failed to connected ", error)
        process.exit(1)
    }
}

export default connectDB