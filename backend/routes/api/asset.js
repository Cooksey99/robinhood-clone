const express = require("express")
const asyncHandler = require("express-async-handler");

const router = express.Router();

// ticker will be APPL
// /asset/APPL
router.get('/:ticker', asyncHandler(async(req, res) => {


}))


module.exports = router;
