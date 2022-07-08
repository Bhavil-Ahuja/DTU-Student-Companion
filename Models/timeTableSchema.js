const mongoose = require("mongoose");

const timeTableSchema = (
    {
        batch: {
            type: String
        },
        Monday: [{
            type: String,
        }],
        Tuesday: [{
            type: String,
        }],
        Wednesday: [{
            type: String,
        }],
        Thursday: [{
            type: String,
        }],
        Friday: [{
            type: String,
        }]
    }
)

module.exports = mongoose.model("TimeTable", timeTableSchema);