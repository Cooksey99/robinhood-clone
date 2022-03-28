const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { restoreUser } = require("../../utils/auth");
const { Linked_bank } = require("../../db/models")

const router = express.Router();


router.post('/addBank',
    expressAsyncHandler(async (req, res) => {
        const bank = await Linked_bank.create({ ...req.body });
        res.json(bank)
    }));

router.put('/editBank/:id',
    expressAsyncHandler(async (req, res) => {

        const { id } = req.params;

        const bank = await Linked_bank.findByPk(id);

        bank.set(req.body);
        await bank.save();
        res.json(bank)
    }));

router.get('/:id', expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const banks = await Linked_bank.findAll({
        where: { user_id: id }
    });

    const data = banks.map(bank => bank);
    console.log('\n\n\n' + data + '\n\n\n')
    res.json(data);
}));

router.delete('/removeBank/:bankId', expressAsyncHandler(async (req, res) => {
    const bankId = req.params.bankId;
    const bank = await Linked_bank.findByPk(bankId);
    await bank.destroy();

    res.json(bankId)
}))


module.exports = router;
