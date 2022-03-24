const express = require("express")
const asyncHandler = require("express-async-handler");

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {

    let symbol = req.params;

    console.log(res.get(`${BASE_URL}${symbol}${API_KEY}`))

}));


module.exports = router;
