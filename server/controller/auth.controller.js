const bcrypt = require('bcrypt');
const authUtil = require('../utils/auth');

const User = require('../models/user.model');
const logging = require('../config/logging');

/**
 * Authentication controller
 *
 * COMPLETED:
 * - SignUp
 *
 * TODO:
 * - SignUp:
 * - changePassword
 */
const NAMESPACE = 'AuthController';

// route definitions --------------------------------------------------------------------------------
// may not need this
module.exports.user = (req, res) => {
    if (!req.token)
        return res
            .status(401)
            .json({ message: 'controller not authenticated' });
    return res.status(200).json({ message: 'authenticated', user: req.token });
};

module.exports.login = async (req, res) => {
    // check matching account
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res
            .status(401)
            .json({ success: false, msg: 'Account does not exist' });

    // check matching password
    const checkPassword = await authUtil.checkHash(
        req.body.password,
        user.passwordHash
    );
    if (!checkPassword)
        return res
            .status(401)
            .json({ success: false, msg: 'Invalid password' });

    // successful
    const tokenObj = await authUtil.signToken({ id: user._id });

    return res.status(200).json({
        success: true,
        token: tokenObj.token,
        expiresIn: tokenObj.expiresIn, // just for response
    });
};

/**
 *  Check existing Email
 */
module.exports.checkEmail = async (req, res) => {
    const exist = await User.findOne({ email: req.body.email });
    return exist
        ? res.status(200).json({ exist: true, msg: 'Email already exist' })
        : res.status(200).json({ exist: false, msg: 'OK to use' });
};

module.exports.signup = async (req, res) => {
    // already done in checkEmail but leaving this here for safety
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
        return res.status(200).json({ msg: 'Email already exist' });
    }

    // new user object
    const newUser = new User({
        ...req.body,
        passwordHash: await authUtil.generateHash(req.body.password),
    });

    // save
    try {
        const saved = await newUser.save();
        logging.info(NAMESPACE, 'New User Created');
        return res.status(200).json({
            msg: 'New User Created',
            // saved,
        });
    } catch (err) {
        logging.error(NAMESPACE, `Signup ${err.message}`, err);
        return res
            .status(400)
            .json({ msg: 'Signup error. Please try again or contact support' });
    }
};

// change password
// - compare old password hash
// - update new password
