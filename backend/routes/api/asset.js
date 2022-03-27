const express = require("express")
const asyncHandler = require("express-async-handler");
const { Stock, Asset, Transaction } = require("../../db/models");

const router = express.Router();


router.get('/:id', asyncHandler(async (req, res) => {

    const { id } = req.params;

    const stocks = await Stock.findAll({
        where: { asset_id: id },
        include: Asset
    });

    const data = stocks.map(stock => stock);

    res.json(data);
}));

router.get('/transactions/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const transactions = await Transaction.findAll({
        where: { user_id: id }
    });

    const data = transactions.map(transaction => transaction);
    
    res.json(data)
}))

router.post('/purchaseStock/:userId',
    asyncHandler(async (req, res) => {
        const userId = req.params.userId;
        const { asset_id, ticker, price, quantity } = req.body
        // console.log('\n\n\n' + asset_id + '\n\n\n')
        const stock = await Stock.create({ asset_id, ticker });

        const transaction = await Transaction.create({ user_id: userId, price, quantity });

        res.json(stock);
    }));

router.delete('/sellStock', asyncHandler(async (req, res) => {
    // const stockId = req.params.stockId;
    // let id = stockId;
    const { assetId, stockId, price, quantity } = req.body;
    const currStock = await Stock.findByPk(stockId);
    // console.log('\n\n\n assetId ' + assetId + ' \n\n\n stockId ' + stockId)


    const transaction = await Transaction.create({ user_id: assetId, price, quantity });

    await currStock.destroy();
}))


module.exports = router;
