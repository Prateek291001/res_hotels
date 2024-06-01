const mongoose = require('mongoose');

// defining the mongoDB connection URL


const mongoURL=  'mongodb://127.0.0.1:27017/hotels'

// set up MongoDB connection 


mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db= mongoose.connection;

db.on('connected',()=>{
    console.log('connection established to mongoDB');
})

db.on('error', (err)=>{
    console.log('error found:',err);
})

db.on('disconnected',()=>{
    console.log('disconnected to mongoDB');
})

// export the database connection

module.exports=db;