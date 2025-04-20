const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to DB');
    })

    .catch(() => {
        console.log('Error !');
    })
}


module.exports = connectToDB;