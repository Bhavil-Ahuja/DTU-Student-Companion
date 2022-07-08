const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        res.render("about", {page_name: "About"});
    } else {
        res.render("error", {page_name: "Error 401"});
    }
})

module.exports = router;