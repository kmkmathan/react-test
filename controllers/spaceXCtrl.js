const https = require('https');

module.exports = {
    getSpaceXData: async function (path, clientReq) {

        return new Promise(async (resolve, reject) => {

            const limit = clientReq.query.limit || 10;

            const page = clientReq.query.page || 0;
            
            const offset = (limit * page) || 0;

            const data = JSON.stringify({query: {}, options: {limit: limit, offset: offset }});

            const options = {
                hostname: 'api.spacexdata.com',
                path: path,
                port: 443,
                headers: {'Content-Type' : 'application/json'},
                method: 'POST'
            }

            var req = https.request(options, function(res) {
            
            let body = "";
            
            res.on('data',  (chunk) => {
                console.log('BODY: ' + chunk);
                body += chunk;
            });

            res.on("end", () => {
                try {
                    let json = JSON.parse(body);
                    resolve(json);
                } catch (error) {
                    reject(error);
                    console.error(error.message);
                };
            });

            });
            
            req.on('error', (e) => {
            reject(e);
            console.error(e.message);
            });
            req.write(data);
            req.end();
        });
    }
}
