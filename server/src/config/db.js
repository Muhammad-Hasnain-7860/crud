import mongoose from "mongoose"
import config from "./dotenv.js"

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb_url)
        console.log('connect DB')
    } catch (error) {
        console.log(error)
        Promise.reject(error)
    }
}

export default connectDB