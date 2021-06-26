const router = require('express').Router();
const controller = require('../controller/user.controller');
const { verifyToken: validateToken } = require('../middlewares/verifyToken');

/* 
    crud operations for a user
*/

// /api/user

router.get('/', controller.getUser);
router.get('/all', controller.getAllUsers);

module.exports = router;
