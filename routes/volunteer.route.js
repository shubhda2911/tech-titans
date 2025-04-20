const express = require('express');
const router = express.Router();
const volunteerModel = require('../models/volunteer');

router.get('/',(req,res) => {
    res.render("volunteer");
})


router.post('/volunteer', async (req,res) => {
    try {

        let {name ,contact, email ,address ,haveVehicle ,textarea ,city} = req.body;

        const volunteer = await volunteerModel.create({
            name,
            contact,
            email,
            address,
            haveVehicle,
            textarea,
            city,
        })

        res.render('successfull');


    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;