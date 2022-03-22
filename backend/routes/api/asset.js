const express = require("express")
const asyncHandler = require("express-async-handler");

const router = express.Router();

const BASE_URL = 'https://finnhub.io/api/v1';
const API_KEY = 'c8obubqad3iddfsarfeg';
// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "c8obubqad3iddfsarfeg"
// const finnhubClient = new finnhub.DefaultApi()

// await finnhubClient.quote(symbol, (error, data, response) => (assetData = data));


// ticker will be APPL
// /asset/APPL
router.get('/:symbol', asyncHandler(async (req, res) => {

    let symbol = req.params;

    console.log(res.get(`${BASE_URL}${symbol}${API_KEY}`))

}));


module.exports = router;
