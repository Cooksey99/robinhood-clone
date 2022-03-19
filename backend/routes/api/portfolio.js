const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { Watchlist } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");

const router = express.Router();

// router.get('/list', expressAsyncHandler(async(req, res) => {
//     const lists = await Watchlist.findAll();
//     console.log('in the backend')
//     res.json(lists);
// }));

router.post('/list',
expressAsyncHandler(async(req, res) => {
    const list = await Watchlist.create({...req.body})
    res.json(list);
}))

module.exports = router;
