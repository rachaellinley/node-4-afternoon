require("dotenv").config();
const express = require("express");
const session = require("express-session");
const swagController = require('./controllers/swagController');
//require middleware
const checkForSession = require ("./middlewares/checkForSession");
const authController = require("./controllers/authController");
const cartController = require("./controllers/cartController");
const searchController = require('./controllers/searchController');

const app = express();


let { SERVER_PORT, SESSION_SECRET } = process.env;
//add middleware to the app and express.json so we can read JSON from the request body and add session so 
//we can create sessions. session needs a configuration object as the first argument. 

app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
);

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.post("/api/register", authController.register);
app.post("/api/login", authController.login);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);

//swag

app.get("/api/swag", swagController.read);

//cart 

app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);

//search 

app.get("/api/search", searchController.search);

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`)
})
