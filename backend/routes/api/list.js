const express = require("express")
const asyncHandler = require("express-async-handler");
const { Stock, Watchlist } = require("../../db/models");


const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params.id;
    const stocks = await Stock.findAll({
        where: {
            watchlist_id: id,
        },
        include: Watchlist
    });

    const response = stocks.map(stock => stock.dataValues);
    res.json(response);
}))


module.exports = router;
