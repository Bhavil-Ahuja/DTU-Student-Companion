const express = require("express");
const router = express.Router();
const Community = require("../Models/communitySchema");

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function getDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return months[month] + " " + day + ", " + year;
}

router.get("/", async (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        const results = await Community.find();
        res.render("community_main", { page_name: "Community Page", results: results, user: req.session.name });
    } else {
        res.render("error", { page_name: "Error 401" });
    }
})

router.post("/delete", async(req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        const deletePost = await Community.deleteOne({_id: req.body.post_id});
        if (deletePost) {
            res.redirect("/community");
        } else {
            res.status(400);
            throw new Error("Failed to Delete");
        }
    }
})

router.get("/live-chat", (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        res.render("livechat", { page_title: "Live Chat", name: req.session.name, time: formatAMPM(new Date), date: getDate() });
    } else {
        res.render("error", { page_name: "Error 401" });
    }
})

router.post("/post", async (req, res) => {
    const name = req.session.name;
    const message = req.body.message;
    if (!message) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const post = await Community.create({
        sender: name,
        message: message
    });
    if (post) {
        res.redirect("/community");
    } else {
        res.status(400);
        throw new Error("Failed to post");
    }
})

router.post("/post-comment", async (req, res) => {
    const name = req.session.name;
    const comment = req.body.reply;
    const postId = req.body.post_id;
    console.log(name + ": " + comment);
    if (!name || !comment) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const post = await Community.find({ _id: postId });
    console.log(post);
    if (post) {
        const update = await Community.findByIdAndUpdate(postId, { $push: { replies: { replier: name, reply: comment } } });
        res.redirect("/community");
    } else {
        res.status(400);
        throw new Error("Failed to post");
    }
})

module.exports = router;