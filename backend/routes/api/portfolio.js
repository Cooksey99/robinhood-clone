const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { Watchlist, User } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");

const router = express.Router();

router.get('/lists/:id', restoreUser,
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const lists = await Watchlist.findAll({
            where: { user_id: id }
        });
        const response = lists.map(list => list)
        res.json(response);
    }));

router.post('/list',
    expressAsyncHandler(async (req, res) => {
        const list = await Watchlist.create({ ...req.body })
        res.json(list);
    }))

router.put('/list/:id',
    expressAsyncHandler(async (req, res) => {
        // console.log('backend route')
        const listId = req.params.id;
        console.log('checking id:       ', listId)
        const list = await Watchlist.findByPk(listId);

        list.set(req.body);
        await list.save();
        res.json(list);
    }));

router.delete('/list/:id',
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const list = await Watchlist.findByPk(id);
        await list.destroy();
    }));

module.exports = router;
