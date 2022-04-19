const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    species: {
        type: String,
        require: true,
    },
    house: {
        type: String,
        require: true,
    },
    actor: {
        type: String,
        require: true,
    },
});

modules.exports = mongoose.model("Character", characterSchema)