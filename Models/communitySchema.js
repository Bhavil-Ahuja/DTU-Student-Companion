const mongoose = require("mongoose");

const communitySchema = (
    {
        sender: {
            type: String
        },
        message: {
            type: String
        },
        replies: [{
            replier: {
                type: String
            },
            reply: {
                type: String
            }
        }]
    }
)

module.exports = mongoose.model("Community", communitySchema);