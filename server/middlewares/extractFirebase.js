const firebaseAdmin = require('firebase-admin');
const logging = require('../config/logging');

const NAMESPACE = 'FirebaseMiddleware';
/*
    Extracting, validating middleware keys
*/

/**
 * extracting and authenticating request
 * return 401 if failed
 */
const extractFirebaseInfo = (req, res, next) => {
    logging.info(NAMESPACE, 'Validating Firebase Token...');
    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        firebaseAdmin
            .auth()
            .verifyIdToken(token)
            .then((result) => {
                if (result) {
                    // authenticated
                    res.locals.firebase = result;
                    res.locals.firebaseToken = token;
                    next();
                } else {
                    logging.warn(NAMESPACE, 'Bad token used...');
                    return res.status(401).json({ msg: 'unauthorized' });
                }
            });
    } else return res.status(401).json({ msg: 'unauthorized' });

    next();
};

export default extractFirebaseInfo;
