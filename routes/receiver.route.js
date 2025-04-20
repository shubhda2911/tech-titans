const express = require('express');
const router = express.Router();
const receiverModel = require('../models/receiver');


router.get('/',(req,res) => {
    res.render('receiver')
})

router.post('/receiver', async (req,res) => {
    try {

        let {name ,number ,email ,address ,textarea ,foodType ,foodRequirementType} = req.body;

        let FoodReceiver = await receiverModel.create({
            name,
            number,
            email,
            address,
            textarea,
            foodType,
            foodRequirementType,
        })

        res.render('successfull');


    } catch (error) {
        console.log(error.message);
    }
})


module.exports = router;