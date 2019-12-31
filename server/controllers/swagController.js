//swag is a js filed that exports an array of swag objects
const swag = require('../models/swag');
//module.exports exports an object with a read method. this method should capture req and res as parameters
// then use res to send a status and the swag array 

module.exports = {
    read: ( req, res, next ) => {
        res.status(200).send( swag );
    }
};