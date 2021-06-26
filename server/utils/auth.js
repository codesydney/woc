const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logging = require('../config/logging');

/* 
    functions handling jwt
    TODO:
    - set what can be passed into payload
*/
const NAMESPACE = 'JWT';

const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    return await bcrypt.hash(password, salt);
};

const checkHash = async (password, hash) =>
    await bcrypt.compare(password, hash);

/**
 *
 * @param {object} dataObj payload object
 * @returns valid jwt token
 */
const signToken = (dataObj) => {
    const expires = process.env.JWT_EXP;
    const SECRET = process.env.JWT_SECRET;

    const payload = {
        ...dataObj,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: expires });
    return {
        token,
        expiresIn: expires,
    };
};

const authErrMsg = (NAMESPACE, msg) => ({
    namespace: NAMESPACE,
    msg: msg || 'failed authentication',
});

module.exports = {
    //generateJWT, authenticateToken
    generateHash,
    checkHash,
    signToken,
    authErrMsg,
};
