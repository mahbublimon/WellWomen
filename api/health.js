const https = require('https');

module.exports = function fetchHealthArticles(callback) {
    const options = {
        method: 'GET',
        hostname: 'women-health-and-birth-control.p.rapidapi.com',
        port: null,
        path: '/health',
        headers: {
            'x-rapidapi-key': '3f929550e7msh30043002612672cp1abef2jsn363583fee0d0',
            'x-rapidapi-host': 'women-health-and-birth-control.p.rapidapi.com'
        }
    };

    const req = https.request(options, (res) => {
        const chunks = [];

        res.on('data', (chunk) => {
            chunks.push(chunk);
        });

        res.on('end', () => {
            const body = Buffer.concat(chunks);
            callback(null, JSON.parse(body.toString())); // Parse and return JSON data
        });
    });

    req.on('error', (err) => {
        callback(err, null);
    });

    req.end();
};