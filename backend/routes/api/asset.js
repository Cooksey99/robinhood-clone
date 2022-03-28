const express = require("express")
const asyncHandler = require("express-async-handler");
const { Stock, Asset, Transaction } = require("../../db/models");

const router = express.Router();


// router.get('/:ticker', asyncHandler(async (req, res) => {
//     const { ticker } = req.paramsm;

//     const stocks
// }))

router.get('/:ticker/:id', asyncHandler(async (req, res) => {
    const { ticker, id } = req.params;
    // console.log('\n\n\n' + ticker + '\n\n\n')
    const stocks = await Stock.findAll({
        where: {
            asset_id: id,
            ticker: ticker
        }
    });

    const data = stocks.map(stock => stock);


    res.json(data)
}))

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

    console.log('\n\n\n' + transactions + '\n\n\n')
    const data = transactions.map(transaction => transaction);
    res.json(data)
}))

router.post('/purchaseStock/:userId',
    asyncHandler(async (req, res) => {
        const userId = req.params.userId;
        const { asset_id, ticker, price, quantity } = req.body
        // console.log('\n\n\n' + asset_id + '\n\n\n')
        let stock;
        for (let i = 0; i < quantity; i++) {
            stock = await Stock.create({ asset_id, ticker });
        }

        const transaction = await Transaction.create({ user_id: userId, ticker, price, quantity });

        res.json(stock);
    }));

router.delete('/sellStock', asyncHandler(async (req, res) => {
    // const stockId = req.params.stockId;
    // let id = stockId;
    let { assetId, stockId, ticker, price, quantity } = req.body;

    console.log('\n\n\n' + stockId + '\n\n\n')

    let currStock;
    for (let i = 0; i < stockId.length; i++) {
        currStock = await Stock.findByPk(stockId[i]);
        if (currStock) await currStock.destroy();
    };
    // console.log('\n\n\n assetId ' + assetId + ' \n\n\n stockId ' + stockId)

    price = parseInt(-price);

    const transaction = await Transaction.create({ user_id: assetId, ticker, price, quantity });

    res.json(currStock)
}))


module.exports = router;
