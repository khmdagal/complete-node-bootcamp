const express = require('express')
const router = express.Router();

const {getAllUsers, postUsers,getUsersById} = require('./../controllers/userControllers')
router.param('id', (req, res, next, value) => {
  console.log(id);
});
router.route('/').get(getAllUsers).post(postUsers);
router.route('/:id').get(getUsersById);

module.exports = router