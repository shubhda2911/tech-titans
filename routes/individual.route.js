const express = require('express');
const router = express.Router();
const individualModel = require('../models/individual');


router.get('/',(req,res) => {
    res.render("individual.ejs");
})

router.post('/individual', async (req,res) => {
    try {

        let {name,contactNumber ,email ,address ,quantityOfFood ,foodDescription ,expiryDate ,foodType} = req.body;

        const FoodDonor = await individualModel.create({
            name,
            contactNumber,
            email,
            quantityOfFood,
            address,
            foodDescription,
            foodType,
        })

        res.render('successfull');

    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;