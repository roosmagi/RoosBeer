const Beer = require("../models/beer")

class BeerController {
    async getOneBeer(req, res) {
        const beerId = req.params.beerId
        const beer = await Beer.findOne({
            where: { id: beerId }, 
    });
        res.status(200).json({
            message: 'Got beer by id',
            beer: beer
    });
}
    async getAllBeer(req, res) {
        const beers = await Beer.findAll()
        console.log(beers)
        res.status(201).json({
        beers: beers
    })
}
    async addBeer(req,res) {
        const beer = await Beer.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.file.filename,
        style: req.file.style,
        character: req.body.character,
        vol: req.body.vol
    })
    res.status(201).json({
        message: 'Beer is added',
        productId: beer.id
    })
}
}
module.exports = new BeerController()