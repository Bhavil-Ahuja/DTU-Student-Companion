const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema");

router.get("/register", (req, res) => {
    res.render("register", { page_name: "Registration" });
})

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name: name,
        email: email,
        password: password,
        role: "Student",
        roll_no: "NIL",
        year: 0,
        branch: "NIL",
        batch: "NIL"
    });

    if (user) {
        req.session.user = email;
        req.session.name = name;
        res.redirect("/home");
    } else {
        res.status(400);
        throw new Error("Failed to create the user");
    }
})

router.get("/", (req, res) => {
    res.render("login", { page_name: "Login" });
})

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        req.session.user = email;
        req.session.name = user.name;
        res.redirect("/home");
    } else {
        res.render("error");
    }
})

module.exports = router;