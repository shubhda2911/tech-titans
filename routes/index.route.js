const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('index');
})

router.get('/success',(req,res) => {
    res.render('successfull');
})

router.get('/chatbot',(req,res) => {
    res.render('chatbot');
})

module.exports = router;