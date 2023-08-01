// importing express for creating app
const express=require("express")
const app=express()

// importing dotenv for accessing data from .env file
require("dotenv").config()


// importing cors 
const cors=require("cors")

// importing booking router 
const { bookingRouter }=require("./routes/bookingRouter")


// middleware 
app.use(express.json())

app.use(cors())

// basic enpoint of this api
app.get("/",(req,res)=>{
    res.send("Home Page Of This Api")
})


// making api request
app.use("/",bookingRouter)


// app is listening here on specific port no
app.listen(process.env.port,()=>{
    
    console.log(`Server is listening on port no ${process.env.port}`)
})