const router = require('express').Router();
const User = require('../models/User');

router.get("/:id", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc;
        if(!user){
            res.status(404).json("user not found")
        } else {
            res.status(200).json(other);
        }  
    } catch (error) {
        res.status(500).json(error)
    }
});


router.put("/:id/addcoin", async(req,res)=>{
    
        try {
            const user = await User.findById(req.body.userId);
            const coinId = req.params.id;
            if(!user.watchlist.includes(coinId)){
               await user.updateOne({$push:{watchlist:coinId}})
               
              res.status(200).json("coin added to watchlist");
            } else {
                res.status(403).json('coin already in watchlist');
            } 
        } catch (error) {
            res.status(500).json(error);
        }
});


router.put("/:id/removecoin", async(req,res)=>{
    
        try {
            const user = await User.findById(req.body.userId);
            const coinId = req.params.id;
            if(user.watchlist.includes(coinId)){
              await user.updateOne({$pull:{watchlist:coinId}});

              res.status(200).json("coin removed from watchlist");
            } else {
                res.status(403).json('coin not in watchlist');
            } 
        } catch (error) {
            res.status(500).json(error);
        }
});

module.exports = router