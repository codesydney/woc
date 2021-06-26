const jwt = require('jsonwebtoken');
const { authErrMsg } = require('../utils/auth');
const User = require('../models/user.model');

const NAMESPACE = 'VERIFYTOKEN';
/**
 *  Validate token then bind user data to req.user
 *  return 401 if token is bad
 */
module.exports.verifyToken = async (req, res, next) => {
    // token validation
    const auth = req.header('Authorization');
    const token = auth.split(' ')[1];

    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: payload.id });

        // pass user object if success
        req.user = user;
        next();
    } catch (e) {
        if (e.name === 'JsonWebTokenError')
            return res.status(401).json({ err });
        return res.status(401).json(authErrMsg(NAMESPACE)); //  misc error
    }
};

// verify admin status
module.exports.verifyAdmin = (req, res, next) => {
    // is not admin
    if (req.user.role !== 1)
        return res.status(401).json(authErrMsg(NAMESPACE, 'not admin'));
    // is admin
    else next();
};
