//responsible for login in users, registering users, signing out users, and retrieving their info
//require user.js which exports an array of all the users 

const users = require("../models/users");
//id assigns newly registered users
let id = 1;

module.exports = {
    //look for a username and password on the request body and then create a user object
    //after pushing the new user object ot he users array it should increment the value of id by one 
    //set the value of username on the request session's user object ot eh value of username from teh req.body
    // return the updated user object with a status of 200

    register: (req, res) => {
        const { session } = req;
        const { username, password } = req.body;

        users.push({id, username, password});
        id++;

        session.user.username = username;
        res.status(200).send(session.user);
    }, 
    login: (req, res) => {
//use username and password from req.body to find a user object in the users array with the same user/pass 
//if it finds a user with that combo, it should update the value of username on the request sessions user obj to the same from req.body
//send a status with updated user object 
//if user not found, send status of 500
        const {session} = req;
        const { username, password } = req.body;

        const user = users.find(user => user.username === username && user.password == password);
        if (user){
            session.user.username = user.username;
            res.status(200).send(session.user);
        } else {
            res.status(500).send('Unauthorized.');
        }
    },
    signout: (req, res) => {
        //destroy the session and return session 
    req.session.destroy();
    res.status(200).send(req.session);

    },
    
    getUser: (req, res) => {
        //read the user object off the session and return with a status of 200
        const {session} = req;
        res.status(200).send(session.user);

    }
}
