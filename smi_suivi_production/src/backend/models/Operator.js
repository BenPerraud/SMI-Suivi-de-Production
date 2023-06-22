const mongoose = require("mongoose")

const operatorSchema = mongoose.Schema ({
    firstname: {type: String, required: true},
    name: {type: String, required: true},
    contract: {type: String, required: true},
})

module.exports = mongoose.model("Operator", operatorSchema)