const express = require('express');
const router = express.Router();
const Hungryman =  require("../models/Hungryman");
const mongoose = require("mongoose");
const getDate = require("../assets/getDate");


router.get('/',(req,res,next) => {
    Hungryman.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log("ERROR AT GET ALL Review",err)
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
    const finalDate = getDate();
    const hungryman = new Hungryman({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        cDate:finalDate,
        uDate:finalDate,
    })
    hungryman
        .save()
        .then((result) =>
        {
            console.log(res);
            res.status(200).json({
                message:"Handling POST request to /review",
                review: result
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err})
        })

    
})

router.get('/:hungrymanId',(req,res,next) => {
    const id = req.params.hungrymanId;
    Hungryman.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc)
                res.status(200).json(doc);
            else
            res.status(404).json({message:"No valid Product found"});
        })
        .catch(err => {
            console.log("ERROR AT GET Hungryman BY ID",err)
            res.status(500).json({error:err});
        });
    // res.status(200).json({
    //     message:"You passed an ID"
    // })
})
router.patch("/:hungrymanId", (req, res, next) => {
    
    const finalDate = getDate();
    const id = req.params.hungrymanId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    updateOps["uDate"] = finalDate;
    Hungryman.update({ _id: id }, { $set: updateOps })
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
router.delete('/:hungrymanId',(req,res,next) => {
    const id =req.params.hungrymanId;
    Hungryman.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log("Error while deleting Hungryman",err);
            res.status(500).json({error:err})
        })
    
    // res.status(200).json({
    //     message:"Deleted Hungryman"
    // })
})

module.exports = router;