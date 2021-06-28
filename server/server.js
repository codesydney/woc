const express = require('express');
const path = require('path');

const logging = require('./config/logging');
const config = require('./config/config');
const serverMiddleware = require('./middlewares/serverMiddleware');

const NAMESPACE = 'Server';
/* 
    This be the big un
*/

/**
 * TODO:
 * - set up cors to secure access
 */

// server config ------------------------------------------------------------------------------------------
const app = express();
require('./config/connectMongo'); // connecting to database
require('./config/connectFirebase'); // connecting to firebase for Auth

// middlewares -----------------------------------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(serverMiddleware.logAllRequests);

// serving static file ---------------------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, '../web', 'build')));

// api routing -----------------------------------------------------------------------------------------------
app.use('/api', require('./routes'));

// error handling --------------------------------------------------------------------------------------------
app.use(serverMiddleware.errHandling);
app.get('*', serverMiddleware.redirectToIndex);

// start the server ------------------------------------------------------------------------------------------
app.listen(config.server.port, () => {
    logging.info(
        NAMESPACE,
        `Server running on ${config.server.hostname}:${config.server.port}`
    );
});
