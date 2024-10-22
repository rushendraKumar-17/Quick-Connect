import mongoose from "mongoose";
const meetingSchema = new mongoose.Schema({
    id:{
        type:String,
    }
})
const meetingModel = new mongoose.model("meetings",meetingSchema);
export default meetingModel;