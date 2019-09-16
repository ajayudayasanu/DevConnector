const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const user = require('../../models/User');
const { check, validationResult } = require('express-validator');

//@route    GET api/profile/me
//@desc     Get Current User Profile
//@access   private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route    POST api/profile
//@desc     Create or update user profile
//@access   private
router.post('/', [
  auth,
  [
    check('status', 'Status required ')
      .not()
      .isEmpty(),
    check('skills', 'Skills is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
]);

module.exports = router;
