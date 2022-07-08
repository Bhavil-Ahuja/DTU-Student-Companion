const express = require("express");
const router = express.Router();
const { v4: uuidV4 } = require("uuid");
const TimeTable = require("../Models/timeTableSchema");
const User = require("../Models/userSchema");
const Assignment = require("../Models/assignmentSchema");
const multer = require("multer");
const path = require("path")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../Files'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.get("/", (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        res.render("mainpage", { page_name: "Academic" });
    } else {
        res.render("error", { page_name: "Error 401" })
    }
})

router.get("/online-lectures", (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        res.redirect(`/academic/online-lectures/${uuidV4()}`)
    } else {
        res.render("error", { page_name: "Error 401" });
    }
})

router.get("/online-lectures/:room", (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        res.render('room', { roomId: req.params.room });
    } else {
        res.render("error", { page_name: "Error 401" });
    }
})

router.get("/time-table", async (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        const count = await TimeTable.count();
        const tables = await TimeTable.find();
        res.render("time_table", { page_name: "Time Table", batch: tables, count: count, count_total: count });
    } else {
        res.render("error", { page_name: "Error 401" })
    }
})

router.post("/time-table", async (req, res) => {
    const batch = req.body.batch;
    if (!batch) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const tt = await TimeTable.create({ batch: batch, Monday: ["None", "None", "None", "None", "None", "None", "None", "None", "None", "None"], Tuesday: ["None", "None", "None", "None", "None", "None", "None", "None", "None", "None"], Wednesday: ["None", "None", "None", "None", "None", "None", "None", "None", "None", "None"], Thursday: ["None", "None", "None", "None", "None", "None", "None", "None", "None", "None"], Friday: ["None", "None", "None", "None", "None", "None", "None", "None", "None", "None"] });
    if (tt) {
        res.redirect("/academic/time-table");
    } else {
        res.status(400);
        throw new Error("Failed to post");
    }
})

router.get("/time-table/:batch", async (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        const results = await TimeTable.findOne({ batch: req.params.batch });
        res.render("batch_time_table", { page_name: `Batch ${req.params.batch}`, batch: req.params.batch, Day: results });
    } else {
        res.render("error", { page_name: "Error 401" })
    }
})

router.post("/time-table/:batch/edit", async (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        const day = req.body.day;
        const slot = req.body.slot;
        const subject = req.body.subject;
        console.log(req.body);
        if (!day || !slot || !subject) {
            res.status(400);
            throw new Error("Please enter all the fields");
        }
        var done = false;

        if (day === "Monday") {
            console.log(day);
            if (slot === '8-9') {
                console.log(slot);
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Monday.0": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '9-10') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Monday.1": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '10-11') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Monday.2": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '11-12') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Monday.3": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '12-1') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Monday.4": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '1-2') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Monday.5": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '2-3') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Monday.6": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '3-4') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Monday.7": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '4-5') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Monday.8": subject
                    }
                })
                if (updateTT) done = true;
            } else {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Monday.9": subject
                    }
                })
                if (updateTT) done = true;
            }
        } else if (day === "Tuesday") {
            if (slot === '8-9') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Tuesday.0": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '9-10') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Tuesday.1": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '10-11') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Tuesday.2": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '11-12') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Tuesday.3": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '12-1') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Tuesday.4": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '1-2') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Tuesday.5": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '2-3') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Tuesday.6": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '3-4') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Tuesday.7": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '4-5') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Tuesday.8": subject
                    }
                })
                if (updateTT) done = true;
            } else {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Tuesday.9": subject
                    }
                })
                if (updateTT) done = true;
            }
        } else if (day === "Wednesday") {
            if (slot === '8-9') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Wednesday.0": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '9-10') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Wednesday.1": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '10-11') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Wednesday.2": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '11-12') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Wednesday.3": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '12-1') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Wednesday.4": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '1-2') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Wednesday.5": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '2-3') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Wednesday.6": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '3-4') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Wednesday.7": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '4-5') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Wednesday.8": subject
                    }
                })
                if (updateTT) done = true;
            } else {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Wednesday.9": subject
                    }
                })
                if (updateTT) done = true;
            }
        } else if (day === "Thursday") {
            if (slot === '8-9') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Thursday.0": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '9-10') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Thursday.1": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '10-11') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Thursday.2": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '11-12') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Thursday.3": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '12-1') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Thursday.4": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '1-2') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Thursday.5": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '2-3') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Thursday.6": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '3-4') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Thursday.7": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '4-5') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Thursday.8": subject
                    }
                })
                if (updateTT) done = true;
            } else {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Thursday.9": subject
                    }
                })
                if (updateTT) done = true;
            }
        } else {
            if (slot === '8-9') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Friday.0": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '9-10') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Friday.1": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '10-11') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Friday.2": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '11-12') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Friday.3": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '12-1') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Friday.4": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '1-2') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Friday.5": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '2-3') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Friday.6": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '3-4') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Friday.7": subject
                    }
                })
                if (updateTT) done = true;
            } else if (slot === '4-5') {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Friday.8": subject
                    }
                })
                if (updateTT) done = true;
            } else {
                const updateTT = await TimeTable.updateOne({ batch: req.params.batch }, {
                    $set: {
                        "Friday.9": subject
                    }
                })
                if (updateTT) done = true;
            }
        }

        if (done) {
            res.redirect(`/academic/time-table/${req.params.batch}`);
        } else {
            res.status(400);
            throw new Error("Failed to post");
        }
    } else {
        res.render("error", { page_name: "Error 401" })
    }
})

router.get("/notes-and-assignments", (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        res.render("notes_and_assignments", { page_name: "Notes and Assignments" });
    } else {
        res.render("error", { page_name: "Error 401" })
    }
})

router.get("/notes", async (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    const user = User.findOne({ email: req.session.user });
    const role = user.role;
    if (isLoggedIn) {
        if (role === "Student") {
            res.render("notes_student", { page_name: "Notes" });
        } else {
            res.render("notes_teacher", { page_name: "Notes Upload" });
        }
    } else {
        res.render("error", { page_name: "Error 401" });
    }
})

router.get("/assignments", async (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    const user = await User.findOne({ email: req.session.user });
    if (isLoggedIn) {
        if (user.role === "Student") {
            const assignments = await Assignment.find({ batch: user.batch });
            console.log(assignments);
            res.render("assignments_student", { page_name: "Assignments", assignments: assignments });
        } else {
            const find = await Assignment.find({ teacher: req.session.name });
            res.render("assignments_teacher", { page_name: "Assignments Upload", assignments: find });
        }
    } else {
        res.render("error", { page_name: "Error 401" });
    }
})

router.post("/assignment/download/:filename", async (req, res) => {
    const x = path.join(__dirname, '../Files/', req.params.filename);
    res.download(x);
})

router.post("/assignment/upload", upload.single('file'), async (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        const batch = req.body.batch;
        // console.log(req.file, req.body);
        const find = await Assignment.findOne({ teacher: req.session.name, batch: batch });
        if (find) {
            // console.log("Updating");
            const update = await Assignment.updateOne({ teacher: req.session.name, batch: batch }, { $push: { filenames: req.file.filename } });
            if (update) {
                res.redirect("/academic/assignments");
            } else {
                res.status(400);
                throw new Error("Failed to post");
            }
        } else {
            // console.log("Adding new");
            const create = await Assignment.create({ teacher: req.session.name, batch: batch });
            const add = await Assignment.updateOne({ teacher: req.session.name, batch: batch }, { $push: { filenames: req.file.filename } });
            if (create && add) {
                res.redirect("/academic/assignments");
            } else {
                res.status(400);
                throw new Error("Failed to post");
            }
        }
    } else {
        res.render("error", { page_name: "Error 401" });
    }
})

router.post("/assignment/submit", upload.single('file'), async (req, res) => {
    const isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        const user = await User.findOne({ email: req.session.user });
        const update = await Assignment.findOneAndUpdate({ teacher: req.body.teacher, batch: user.batch }, { $push: { students: { name: req.session.name, filesUploaded: req.file.filename } } });
        if (update) {
            res.redirect("/academic/assignments");
        } else {
            res.status(400);
            throw new Error("Failed to post");
        }
    } else {
        res.render("error", { page_name: "Error 401" });
    }
})

module.exports = router;