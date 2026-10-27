require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const ConnectDB = require('./config/db')
const connectDB = require('./config/db')

const app = express()

const origin = (process.env.FRONTENT_URL || "").split(',').map((u)=>u.trim().replace('/\/+$/' , '')).filter(Boolean)

app.use(
    cors({
        origin:origin.length?origin:true,
        methods: ["GET" , "POST" , "DELETE" , "PATCH" , "PUT" , "OPTION"],
        allowedHeaders:["Content-Type" , "Authorization"]
    })
)

app.use(express.json())

app.use(async(req,res,next)=>{
    try{
        await ConnectDB()
        next()
    }catch(err){
        res.status(500).json({message:'Mongo DB IS Not Connect'  ,error: err.message})
    }

    app.use('/api/auth' , require('./routes/authRoutes ')) 
    app.use('/api/cars' , require('./routes/carRoutes')) 
    app.use('/', (req,res)=>res.status(200).json({message:'Api Thik Chal rahe hai'}))

    if(!proces.env.VERCEL){
        const PORT = process.env.PORT || 5000;
        connectDB().then(()=>{
            app.listen(PORT,()=>console.log(`Server Running On Port ${PORT}`))
        }).catch((err)=>{
            console.log("DB Error: " , err);
        })
    }
})

module.exports = app