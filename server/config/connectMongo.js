const mongoose = require('mongoose');
const config = require('./config');
const logging = require('./logging');

const NAMESPACE = 'Mongo';
/* 
    Connecting to MongoDB
*/

mongoose
    .connect(config.db.uri, config.db.config)
    .then((res) => logging.info(NAMESPACE, 'Mongo connected'))
    .catch((err) => logging.error(NAMESPACE, err.message, err));

module.exports = mongoose;
