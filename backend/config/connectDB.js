import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/QuickConnect").then(()=>{
        console.log("Connected to database");
    }).catch(e => console.log(e))
}
export default connectDB;