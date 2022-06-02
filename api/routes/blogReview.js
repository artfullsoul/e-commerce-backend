const express = require('express');
const router = express.Router();
const BlogReview =  require("../models/BlogReview");
const mongoose = require("mongoose");
const getDate = require("../assets/getDate");

router.get('/',(req,res,next) => {
    BlogReview.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log("ERROR AT GET ALL Blog Review",err)
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
    const review = new BlogReview({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        description: req.body.description,
        cDate:finalDate,
        uDate:finalDate,
    })
    review
        .save()
        .then((result) =>
        {
            console.log(res);
            res.status(200).json({
                message:"Handling POST request to /blogReview",
                review: result
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err})
        })

    
})

// router.get('/:productId',(req,res,next) => {
//     const id = req.params.productId;
//     Product.findById(id)
//         .exec()
//         .then(doc => {
//             console.log(doc);
//             if(doc)
//                 res.status(200).json(doc);
//             else
//             res.status(404).json({message:"No valid Product found"});
//         })
//         .catch(err => {
//             console.log("ERROR AT GETPRODUCTBYID",err)
//             res.status(500).json({error:err});
//         });
//     // res.status(200).json({
//     //     message:"You passed an ID"
//     // })
// })
// router.patch("/:productId", (req, res, next) => {
    
//     const finalDate = getDate();
//     const id = req.params.productId;
//     const updateOps = {};
//     for (const ops of req.body) {
//       updateOps[ops.propName] = ops.value;
//     }
//     updateOps["uDate"] = finalDate;
//     Product.update({ _id: id }, { $set: updateOps })
//       .exec()
//       .then(result => {
//         console.log(result);
//         res.status(200).json(result);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
// });
router.delete('/:reviewId',(req,res,next) => {
    const id =req.params.reviewId;
    BlogReview.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log("Error while deleting Blog Review",err);
            res.status(500).json({error:err})
        })
    
    // res.status(200).json({
    //     message:"Deleted review"
    // })
})

module.exports = router;