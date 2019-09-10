const express = require('express');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

//@route    POST api/users
//@desc     test route
//@access   public

router.post(
  '/',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'please enter a password with 6 or more charaters').isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('user route');
  }
);
module.exports = router;
//
