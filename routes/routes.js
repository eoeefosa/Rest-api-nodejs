"use strict";

// const { Router } = require("express");
const express =require(`express`);
const router= express.Router();
const Model= require('../models/model');

// Post Method
router.post('/post', async(req, res)=>{
    const data= new Model({
        name:req.body.name,
        age:req.body.age
    })

    try{
        const dataToSave =data.save();
        res.status(200).json({ name:req.body.name,
            age:req.body.age});
    }
    catch(error){ 
        res.status(400).json({
            message:error.message
        })
    }
})


// Get all Method
router.get('/getAll', async (req,res)=>{
    try{
        const data =await Model.find();
        res.json(data);
    } catch (error){
        res.status(500).json({message:error.message})
    }
})


// Get by Id Method
router.get('/getOne/:id',async (req, res)=>{
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

// Update by ID Method
router.patch(`/update/:id`, async (req, res)=>{
    try{
        const id =req.params.id;
        const updatedData=req.body;
        const options ={new: true};

        const result =await Model.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result);
    }catch(error){
        res.status(500).json({message:error.message});
    }

})

// Delete by ID Method
router.delete(`/delete/:id`, (req, res)=>{
    res.send('Delete by ID API')
})


router.post('/users', (req, res)=>{
    Model.findOne({name:req.body.name}).then((user)=>{
        if(user){
            return res.status(400).send(req.body.Username + 'already exists');
        } else{
            Model.create({
                name:req.body.name,
                age:req.body.age
            }).then((user)=> {res.status(201).json(user)}).
            catch((error)=>{
                console.error(error);
                res.status(500).send('Error: ' + error);
            });
        }
    }).catch((error)=>{
        console.error(error);
        res.status(500).send('Error: ' +error);
    })
})

module.exports = router;