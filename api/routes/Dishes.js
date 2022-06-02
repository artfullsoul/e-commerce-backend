const express = require('express');
const router = express.Router();
const Dishes =  require("../models/Dishes");
const mongoose = require("mongoose");
const getDate = require("../assets/getDate");


router.get('/',(req,res,next) => {
    Dishes.find()
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
    const dishes = new Dishes({
        _id: new mongoose.Types.ObjectId(),
        dishName: req.body.dishName,
        restrauntId: req.body.restrauntId,
        dishPrice: req.body.dishPrice,
        cDate:finalDate,
        uDate:finalDate,
    })
    dishes
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

router.get('/:dishesId',(req,res,next) => {
    const id = req.params.dishesId;
    Dishes.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc)
                res.status(200).json(doc);
            else
            res.status(404).json({message:"No valid Product found"});
        })
        .catch(err => {
            console.log("ERROR AT GET Dishes BY ID",err)
            res.status(500).json({error:err});
        });
    // res.status(200).json({
    //     message:"You passed an ID"
    // })
})
router.patch("/:dishesId", (req, res, next) => {
    
    const finalDate = getDate();
    const id = req.params.dishesId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    updateOps["uDate"] = finalDate;
    Dishes.update({ _id: id }, { $set: updateOps })
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
router.delete('/:dishesId',(req,res,next) => {
    const id =req.params.dishesId;
    Dishes.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log("Error while deleting Dishes",err);
            res.status(500).json({error:err})
        })
    
    // res.status(200).json({
    //     message:"Deleted Dishes"
    // })
})

module.exports = router;