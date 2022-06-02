const express = require('express');
const router = express.Router();
const Restraunt =  require("../models/Restraunt");
const mongoose = require("mongoose");
const getDate = require("../assets/getDate");

router.get('/',(req,res,next) => {
    Restraunt.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log("ERROR AT GET ALL Restraunt",err)
            res.status(500).json({error:err});
        });
    // res.status(200).json({
    //     message:"Handling GET request to /products"
    // })
})
// [
//     {"propName":"name","value":"grapes"}
// ]
router.post('/',(req,res,next) => {
    //Like here we are able to get data only due to bodyparser
    console.log("Request recieved",req.body)
    const finalDate = getDate();
    const restraunt = new Restraunt({
        _id: new mongoose.Types.ObjectId(),
        restrauntName: req.body.restrauntName,
        restrauntLocation: req.body.restrauntLocation,
        resturantWallet: 0,
        cDate:finalDate,
        uDate:finalDate,
    })
    restraunt
        .save()
        .then((result) =>
        {
            console.log(res);
            res.status(200).json({
                message:"Handling POST request to /Restraunt",
                review: result
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err})
        })

    
})

router.get('/:restrauntId',(req,res,next) => {
    const id = req.params.restrauntId;
    Restraunt.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc)
                res.status(200).json(doc);
            else
            res.status(404).json({message:"No valid Restraunt found"});
        })
        .catch(err => {
            console.log("ERROR AT GET Restraunt BY ID",err)
            res.status(500).json({error:err});
        });
    // res.status(200).json({
    //     message:"You passed an ID"
    // })
})
router.patch("/:restrauntId",async (req, res, next) => {
    
    const finalDate = getDate();
    const id = req.params.restrauntId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    updateOps["uDate"] = finalDate;
    Restraunt.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});
router.delete('/:restrauntId',(req,res,next) => {
    const id =req.params.restrauntId;
    Restraunt.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log("Error while deleting Restraunt",err);
            res.status(500).json({error:err})
        })
    
    // res.status(200).json({
    //     message:"Deleted Restraunt"
    // })
})

module.exports = router;