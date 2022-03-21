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

router.put('/list/:id',
expressAsyncHandler(async(req, res) => {
    const id = req.params.id;
    const list = await Watchlist.findBy(id);

    list.set(req.body);
    await list.save();
    res.json(list);
}));

router.delete('/list/:id',
expressAsyncHandler(async(req, res) => {
    const id = req.params.id;
    const list = await Watchlist.findBy(id);
    await list.destroy();
}))

module.exports = router;
