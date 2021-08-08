const https = require('https')

require('dotenv').config();

const token = process.env.API_KEY; 
const options = {
    hostname: 'api.humanitix.com',
    path: '/v1/events?page=1&pageSize=100&since=2021-02-01T23%3A26%3A13.485Z',
    method: 'GET',
        headers: {
            'X-Api-Key': token
        }
}

const getEvents = (req,res) => {
   
    https.get(options, (response) => {
        
        var result = '';
        response.on('data', function (chunk) {
            result += chunk;
        });

        response.on('end', function () {    
            var finalResponse=JSON.parse(result);
            
        res.status(200).json(result);
        console.log(result);
        });

    });

};

module.exports = {
    getEvents,
};


