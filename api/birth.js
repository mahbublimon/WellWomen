const http = require('https');

const options = {
	method: 'GET',
	hostname: 'women-health-and-birth-control.p.rapidapi.com',
	port: null,
	path: '/birth',
	headers: {
		'x-rapidapi-key': '3f929550e7msh30043002612672cp1abef2jsn363583fee0d0',
		'x-rapidapi-host': 'women-health-and-birth-control.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();