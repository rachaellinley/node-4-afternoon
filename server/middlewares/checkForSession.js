//check to see if the session has a user object or not
//the user object will keep track of users on the website 
//we'll store what items are in their cart, the total cost of the car, and their username
//if a user does not exist, we want to add a user object to the session 
//user object should default to the following 

module.exports = function(req, res, next) {
    const { session } = req; 

    if ( !session.user ) {
        session.user = {username: '', cart: [], total: 0 };
    };
    next();
}