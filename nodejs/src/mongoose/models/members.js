const mongoose = require("mongoose");

//Scehma for members
const membersSchema = new mongoose.Schema({
    employee_id: {
        type: Number,
        required: true,
        min: 100000,
        max: 3000000,
    },
    employee_name: {
        type: String,
        required: true,
        validate(value) {
            if(!value.match(/^[A-Za-z ]{3,}$/)) {
                throw new Error("Name should have atleast 3 letters and can have only alphabets and spaces");
            }
        }
    },
    technology_name: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
        min: 0,
    },
});

//setting up members model
const Members = mongoose.model("Members", membersSchema);

module.exports = Members;
