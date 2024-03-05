import mongoose from "mongoose";

const categrySchema=new mongoose.Schema({
    name:{
        type:String,
        // require:true,
        // unique:true,
    },
    slug:{
        type:String,
        lowercase:true,
    }
})
export default mongoose.model("Category",categrySchema);