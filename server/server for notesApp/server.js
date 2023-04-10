const express = require('express')
const mongoose = require('mongoose')
var app = express()  // this create an express object to use in our project 
var Data = require('./noteSchema')

mongoose.connect('mongodb://localhost/newDB')

mongoose.connection.once("open", () => {   // insted of function we can writr ()=>
    console.log("Connected to DB!")
}).on("error", (error) => {
    console.log("Failed to connect"+ error)
})

// now we have to create a schema 

// create a note 
//post request 
app.post("/create", (req,res) => {
    var note = new Data ({
        
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date")
    })

    note.save().then( () => {
        
        if( note.isNew == false){
            console.log("Save data!")
            res.send("Saved data !")
        }else{
            console.log("Failed to save data !")
        }
    })
})

// fetch all notes 
// get request
 
app.get('/fetch', (req, res) => {    // empty curly brackets means we want to find everything in database 
    Data.find({}).then( (DBitems) => {
        res.send(DBitems )
    })  
})

// delete a note 
//post request 
// app.post("/delete" , ( req , res ) =>{
    // const id = req.get("id");
//     Data.findOneAndRemove({
//         _id:id
        
//     }, function(err) {
//         console.log("Failed"+ err)
//     })

//     res.send("Deleted!")
// })

app.post("/delete", (req, res) => {
    const id = req.get("id");
    Data.findOneAndRemove({ _id: id })
      .then((result) => {
        console.log(result);
        res.send("Deleted!");
      })
      .catch((err) => {
        console.log("Failed" + err);
        res.send("Failed to delete!");
      });
  });
  

  // update a note 
//post request 
// app.post("/update" , ( req , res) => {
//     Data.findOneAndUpdate({
//         id:req.get("id")
//     },{
//         note: req.get("note"),
//         title: req.get("title"),
//         date: req.get("date")
//     },(err) =>{
//         console.log("Failed to update"+ err)
//     })
//     res.send("Updated!")
// })
app.post("/update", (req, res) => {
    Data.findOneAndUpdate(
      { _id: req.get("id") },
      {
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date"),
      }
    )
      .then(() => {
        res.send("Updated!");
      })
      .catch((err) => {
        console.log("Failed to update" + err);
        res.status(500).send("Failed to update");
      });
  });

  


//http://192.168.29.93:8081/create

var server = app.listen (8081,"192.168.29.93",()=>{
    console.log("server is running !")
})



