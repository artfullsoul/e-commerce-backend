const express = require('express');
const router = express.Router();
const Blog =  require("../models/Blog");
const mongoose = require("mongoose");
const getDate = require("../assets/getDate");

router.get('/',(req,res,next) => {
    Blog.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log("ERROR AT GET ALL Blog",err)
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
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        Title: req.body.title,
        Body: req.body.body,
        cDate:finalDate,
        uDate:finalDate,
    })
    blog
        .save()
        .then((result) =>
        {
            console.log(res);
            res.status(200).json({
                message:"Handling POST request to /blog",
                blog: result
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err})
        })

    
})

router.get('/:blogId',(req,res,next) => {
    const id = req.params.blogId;
    Blog.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc)
                res.status(200).json(doc);
            else
            res.status(404).json({message:"No valid Blog found"});
        })
        .catch(err => {
            console.log("ERROR AT GET Blog BY ID",err)
            res.status(500).json({error:err});
        });
    // res.status(200).json({
    //     message:"You passed an ID"
    // })
})
router.patch("/:blogId", (req, res, next) => {
    
    const finalDate = getDate();
    const id = req.params.blogId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    updateOps["uDate"] = finalDate;
    Blog.update({ _id: id }, { $set: updateOps })
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
router.delete('/:blogId',(req,res,next) => {
    const id =req.params.blogId;
    Blog.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log("Error while deleting Blog",err);
            res.status(500).json({error:err})
        })
    
    // res.status(200).json({
    //     message:"Deleted blog"
    // })
})

module.exports = router;