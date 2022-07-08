const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");

router.get("/", async (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        const results = await User.findOne({ email: req.session.user });
        res.render("profile", { page_name: "Profile", name: results.name, role: results.role, email: req.session.user, roll_no: results.roll_no, year: results.year, branch: results.branch, batch: results.batch });
    } else {
        res.render("error", { page_name: "Error 401" });
    }
})

router.post("/edit", async (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        const role = req.body.role;
        const email = req.body.email;
        const roll_no = req.body.roll_no;
        const year = req.body.year;
        const branch = req.body.branch;
        const batch = req.body.batch;

        if (!role || !email || !roll_no || !year || !branch || !batch) {
            res.status(400);
            throw new Error("Please enter all the fields");
        }

        const updateProfile = await User.updateOne({ email: req.session.user }, {
            $set: {
                "email": email,
                "role": role,
                "roll_no": roll_no,
                "year": year,
                "branch": branch,
                "batch": batch
            }
        })
        if (updateProfile) {
            req.session.user = email;
            res.redirect("/profile");
        }
    } else {
        res.render("error", { page_name: "Error 401" });
    }
})

module.exports = router;