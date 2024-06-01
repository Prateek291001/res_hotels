const express = require('express')
const app = express()
const router = express.Router();
const db= require("./db")
const Person= require("./models/person")
const MenuItem = require("./models/MenuItem")

const bodyParser= require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Har Har Mahadev')
})

// app.get('/paneer', function (req, res) {
//     let customized_paneer= {
//         name: "Paneerlababdar",
//         quantity: 500,
//         is_spicy: true,
//         price:250
//         }
//         res.send(customized_paneer)
//   })

//   app.get('/tandoori', function (req, res) {
//     let roti={
//         name:"tandoori",
//         size:10,
//         is_maida:false,
//         is_aata:true
//     }
//         res.send(roti)
    
//   })

  app.post('/person', async (req, res) =>{
  //   const data= req.body

  //   const newPerson = new Person(data);

  //   newPerson.save((error,savedPerson)=>{
  //     if(error){
  //       console.log('Error saving Problem: ', error);
  //       res.status(500).json({error: 'Internal server error'})
  //     } 
  //     else{
  //       console.log('Data saved successfully');
  //       res.status(200).json(savedPerson);
  //     }
  //   }
  // )

    try{
      const data = req.body

      const newPerson = new Person(data);

      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }

    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  

  })

  // GET method to get the person
  app.get('/person', async(req, res)=>{
    try{
      const data= await Person.find();
      console.log('data fetched successfully');
      res.status(200).json(data);
    } 
    catch(err){
      console.log(err);
      res.status(500).json({ error: "Internal server error hai ye"});
    }
  })
  

  app.get('/person/:workType', async(req, res)=>{
    try{
      const workType =req.params.workType;
      if(workType =='chef' || workType == 'manager' || workType == 'waiter'){
        const response = await Person.find({work: workType});
        console.log("Response has been fetched");
        res.status(200).json(response);
      }
      else{
        res.status(404).json({error: 'Invalid work type'});
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error dusra wala'});
        }
  })
  // Import the router files
  const personRoutes = require('./routes/personRoutes');
  const menutItemRoutes = require('./routes/MenuItemsRoutes');

  //Use the routers
  app.use('/person', personRoutes);
  app.use('/menuItem', menutItemRoutes);

app.listen(3000, ()=>{
    console.log("I am working pretty fine here...");
})