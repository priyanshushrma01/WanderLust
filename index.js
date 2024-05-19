const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listings.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

main()
    .then(()=>{
        console.log("connection is successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlist');
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"/public")));

//Index Route
app.get("/listings",async (req,res)=>{
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings});
});

//New Route
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id",async (req,res)=>{
  let {id} = req.params;
  const listing =await Listing.findById(id);
  res.render("listings/show.ejs",{listing})
});

//Create Route
app.post("/listings",async (req,res)=>{
  let newlisting = new Listing(req.body.listing);
  await newlisting.save();
  res.redirect("/listings"); 
});

//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
  let {id} = req.params;
  const listing =await Listing.findById(id);
  res.render("listings/edit.ejs",{listing});
});

//Update Route
app.put("/listings/:id", async (req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id",async (req,res)=>{
  let {id} = req.params;
  const dellisting = await Listing.findByIdAndDelete(id);
  console.log(dellisting);
  res.redirect("/listings");
});

// app.get("/testlisting",async (req,res)=>{
//   let samplelisting = new Listing({
//     title:"villa",
//     description:"by the beach",
//     price:1200,
//     location:"south goa",
//     country:"India"
//   });
//   await samplelisting.save();
//   console.log("listing was saved");
//   res.send("successful testing");
// });

app.get("/",(req,res)=>{
  res.send("working");
});

app.listen(8080,(req,res)=>{
  console.log("Server listening on port 8080");
});