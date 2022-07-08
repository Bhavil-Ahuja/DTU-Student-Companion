const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if (req.session.user) {
        res.render("home", {page_name: "Home"});
    } else {
        res.render("error", { page_name: "Error 401" });
    }
})

module.exports = router;