require('dotenv').config(); //.env file in main folder
// NOTE: feels bad? react having access to .env

/* 
    config for things
*/

/* server config */
const SERVER_PORT = process.env.PORT || 8080;
const SERVER_HOSTNAME = process.SERVER_HOSTNAME || 'localhost';

/* mongodb config */
const MONGO_CONF = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const MONGO_URI = process.env.MONGO_URI;

/* firebase service keys config */
const FB_SERVICE_ACCOUNT = {
    type: process.env.FB_TYPE,
    project_id: process.env.FB_PROJECT_ID,
    private_key_id: process.env.FB_PRIVATE_KEY_ID,
    private_key: process.env.FB_PRIVATE_KEY,
    client_email: process.env.FB_CLIENT_EMAIL,
    client_id: process.env.FB_CLIENT_ID,
    auth_uri: process.env.FB_AUTH_URI,
    token_uri: process.env.FB_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FB_CLIENT_X509_CERT_URL,
};

// for exporting --------------------------------------------------------------------------------
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};

const DB = {
    uri: MONGO_URI,
    config: MONGO_CONF,
};

const config = {
    server: SERVER,
    db: DB,
    fbServiceKeys: FB_SERVICE_ACCOUNT,
};

module.exports = config;
