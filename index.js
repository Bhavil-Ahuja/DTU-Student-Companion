require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const session = require("express-session")
const { v4: uuidv4 } = require("uuid")
const port = process.env.PORT || 3000;
const authentication = require("./Routes/authentication");
const home = require("./Routes/home");
const academic = require("./Routes/academic");
const community = require("./Routes/community");
const about = require("./Routes/about");
const profile = require("./Routes/profile");
const path = require("path");
const bodyParser = require("body-parser");
const connectDb = require("./config/db");
connectDb();

const server = app.listen(port, () => {
    console.log("Server is running on port " + port);
})

const io = require("socket.io")(server);
require("./Routes/socket")(io);

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});
app.use('/peerjs', peerServer);

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

app.set('views', [path.join(__dirname, 'views/authentication'), path.join(__dirname, 'views/homepage'), path.join(__dirname, 'views/error'), path.join(__dirname, 'views/academic'), path.join(__dirname, 'views/community'), path.join(__dirname, 'views/about'), path.join(__dirname, 'views/profile')]);

app.use(express.static(path.join(__dirname, 'public')));

app.use("/", authentication)
app.use("/home", home);
app.use("/academic", academic);
app.use("/community", community);
app.use("/about", about);
app.use("/profile", profile);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
