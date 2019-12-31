const swag = require('../models/swag');

module.exports = {
    search: (req, res) => {
//looks at the request query for a category 
//if it can't find the category, return a status of 200 with the entire swag array 
const { category } = req.query;
if(!category){
    res.status(200).send(swag);
} else {
    const filteredSwag = swag.filter(swag => swag.category === category);
    res.status(200).send(filteredSwag);
}
    }
};