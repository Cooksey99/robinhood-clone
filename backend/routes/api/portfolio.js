const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { Watchlist, User } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");

const router = express.Router();

router.get('/lists', restoreUser,
expressAsyncHandler(async(req, res) => {
    // const id = req.params.id;
    const lists = await Watchlist.findAll();
    const response = lists.map(list => list)
    res.json(response);
}));

router.post('/list',
expressAsyncHandler(async(req, res) => {
    const list = await Watchlist.create({...req.body})
    res.json(list);
}))

module.exports = router;
