const express = require('express');
const router = express.Router();
const Parent =  require("../models/parent");
const mongoose = require("mongoose");
const getDate = require("../assets/getDate");


router.get('/',(req,res,next) => {
    Parent.find()
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
    const parent = new Parent({
        _id: new mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        emailId: req.body.emailId,
        address: `${req.body.addressLane1}, ${req.body.addressLane2}, ${req.body.addressLane3}, ${req.body.city}, ${req.body.state}-${req.body.pin}`,
        childData: {
            fullName: req.body.childFullName,
            DOB: req.body.childDOB,
            admissionClass: req.body.admissionClass
        },
        cDate:finalDate,
        uDate:finalDate,
    })
    parent
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
router.delete('/:parentId',(req,res,next) => {
    const id =req.params.parentId;
    Parent.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log("Error while deleting Review",err);
            res.status(500).json({error:err})
        })
    
    // res.status(200).json({
    //     message:"Deleted review"
    // })
})

module.exports = router;