const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('first_name')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please enter your first name.'),
  check('last_name')
    .exists({ checkFalsy: true })
    .isLength({ min: 2})
    .withMessage('Please enter your last name.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {

    const { email, first_name, last_name, password, buyingPower } = req.body;
    const user = await User.signup({ email, first_name, last_name, password, buyingPower });

    // create asset/portfolio table to match user
    console.log('\n\n\n' + user.id + '\n\n\n')
    const portfolio = {
      user_id: user.id
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.put('/:id/buyingPower', asyncHandler(async (req, res) => {
  const id = req.params.id;
  let user = await User.findByPk(id);
  let { buyingPower } = req.body;

  user.buyingPower = parseInt(buyingPower) + parseInt(user.buyingPower);
  user.set(user);
  await user.save();
  res.json(user)
  // console.log('\n\n\n' + buyingPower + '\n\n\n')

}));

module.exports = router;
