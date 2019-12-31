//require swag objects
// export an object with an add, delete, and checkout
//each method should capture req and res as parameters
const swag = require("../models/swag");

module.exports = {
    add: (req, res) => {
        //make sure the swag isn't already in the cart 
        //if not, add it tot eh cart and increase the total price
        //if it is, return the request session's user object with a status 
        const { id } = req.params;
        let {user} = req.session;

        //return -1 if it isn't in the cart
        const index = swag.findIndex(swag => swag.id == id); 
        //if it is in the cart 
        if (index !== -1) {
            const selectedSwag = swag[index];

            user.cart.push(selectedSwag);
            user.total += selectedSwag.price; 
        }
        res.status(200).send(user);
    },
    
    delete: (req, res) => {
//removes swag from the cart 
        const { id } = req.params;
        const { user } = req.session;

        const index = user.cart.findIndex(swag => swag.id == id);
        const selectedSwag = swag.find(swag => swag.id == id);

        if (index !== -1) {
            user.cart.splice(index, 1);
            user.total -= selectedSwag.price;
        }
        res.status(200).send(user);
    },
    checkout: (req, res) => {
        //reset the value cart to na empty array and total to 0
        const { user } = req.session;
        user.cart = [];
        user.total = 0;

        res.status(200).send(user);

    }

}