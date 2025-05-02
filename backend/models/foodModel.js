import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number, 
        required : true
    },
    category : {
        type : String, 
        required : true
    },
    url : {
        type : String, 
        default : null 
    },
    public_id : {
        type : String, 
        default : null 
    }

})

const foodModel =  mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;

