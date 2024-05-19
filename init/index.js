const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listings.js");

main()
    .then(()=>{
        console.log("connection is successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlist');
}

const initDb = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was initiased");
};

initDb();