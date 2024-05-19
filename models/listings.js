const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    description: String,
    image:{
        type:String,
        default:"https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg?cs=srgb&dl=pexels-alexis-ricardo-alaurin-6590699.jpg&fm=jpg",
        set: (v)=> v===""? "https://images.pexels.com/photos/6590699/pexels-photo-6590699.jpeg?cs=srgb&dl=pexels-alexis-ricardo-alaurin-6590699.jpg&fm=jpg": v
    },
    price: Number,
    location: String,
    country: String
});

const Listing =  mongoose.model("Listing",listingSchema);

module.exports = Listing;