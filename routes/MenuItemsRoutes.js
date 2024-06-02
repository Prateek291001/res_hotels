const express = require('express');
const router = express.Router(); 
const MenuItem = require("./../models/MenuItem");


  //GET method of MenuItem
  router.get('/', async(req, res)=>{
    try{
      const data= await MenuItem.find();
      console.log('data fetched successfully');
      res.status(200).json(data);
    } 
    catch(err){
      console.log(err);
      res.status(500).json({ error: "Internal server error hai ye"});
    }
  })
  router.post('/', async (req, res) =>{
    try{
      const data = req.body

      const newItem = new MenuItem(data);

      const response2 = await newItem.save();
      console.log('data saved');
      res.status(200).json(response2);
    }

    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error dusra wala'});
    }
  

  })

  router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; // Extract the Id from URL parameter
        const updatedPersonData = req.body; // Updated data for the person
        const response = await MenuItem.findByIdAndUpdate(personId, updatedPersonData, {
            new:true,
            runValidators:true,
        })
        
        if (!response){
            return res.status(404).json({ error : 'Person NOT found'});
        }

        console.log('data updated successfully');
        res.status(200).json(response);
      }catch(err){
        console.log(err);
      res.status(500).json({error: 'Video delete! video delete 15 november tak'});
    }
  })

  module.exports = router; 





// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router(); 
// const MenuItem = require("./../models/MenuItem");


// // GET method of MenuItem
// router.get('/', async (req, res) => {
//   try {
//     const data = await MenuItem.find();
//     console.log('data fetched successfully');
//     res.status(200).json(data);
//   } 
//   catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal server error hai ye" });
//   }
// });

// // POST method of MenuItem
// router.post('/', async (req, res) => {
//   try {
//     const data = req.body;
//     const newItem = new MenuItem(data);
//     const response2 = await newItem.save();
//     console.log('data saved');
//     res.status(200).json(response2);
//   } 
//   catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal server error dusra wala' });
//   }
// });

// // PUT method for Person
// router.put('/:id', async (req, res) => {
//   try {
//     const personId = req.params.id; // Extract the Id from URL parameter
//     console.log(`Updating person with ID: ${personId}`); // Logging the ID to debug

//     // Check if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(personId)) {
//       return res.status(400).json({ error: 'Invalid ID format' });
//     }

//     const updatedPersonData = req.body; // Updated data for the person
//     const response = await MenuItem.findByIdAndUpdate(personId, updatedPersonData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!response) {
//       console.log(`Person with ID ${personId} not found`); // Logging if person is not found
//       return res.status(404).json({ error: 'Person NOT found' });
//     }

//     console.log('data updated successfully');
//     res.status(200).json(response);
//   } 
//   catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Video delete! video delete 15 november tak' });
//   }
// });

// module.exports = router;
