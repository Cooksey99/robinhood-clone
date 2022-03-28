const express = require("express")
const asyncHandler = require("express-async-handler");
const { Stock, Watchlist } = require("../../db/models");
// const { db } = require('../../config')


const router = express.Router();
//          /list

router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const stocks = await Stock.findAll({
        where: { watchlist_id: id },
        include: Watchlist
    });

    const data = stocks.map(stock => stock);

    res.json(data)

}));


//    /list/:listId/addStock/:symbol
//    ADDING STOCK TO A LIST
router.post('/addStock/:ticker',
    asyncHandler(async (req, res) => {
        const stock = await Stock.create({ ...req.body });
        res.json(stock)
    }));

// router.post('/purchaseStock/:ticker',
//     asyncHandler(asyncHandler(async (req, res) => {
//         const stock = await Stock.create({ ...req.body });
//         res.json(stock)
//     })));

module.exports = router;
