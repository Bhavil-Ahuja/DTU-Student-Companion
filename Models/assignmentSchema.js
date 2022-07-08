const mongoose = require("mongoose");

const assignmentSchema = (
    {
        teacher: {
            type: String
        },
        batch: {
            type: String
        },
        students: [{
            name: {
                type: String
            },
            filesUploaded: {
                type: String
            }
        }],
        filenames: [{
            type: String
        }]
    }
)

module.exports = mongoose.model("Assignment", assignmentSchema);