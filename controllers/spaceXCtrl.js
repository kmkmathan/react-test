const https = require('https');

module.exports = {
    getSpaceXData: async function (path, clientReq, searchQuery = null) {

        return new Promise(async (resolve, reject) => {

            const limit = clientReq.query.limit || 10;

            const page = clientReq.query.page || 0;
            
            const offset = (limit * page) || 0;

            const search =  searchQuery ? searchQuery  : {};

               const data = JSON.stringify(
                {
                    query: {
                         ...search
                }, 
                options: {
                    limit: limit, 
                    offset: offset 
                }
            });

            console.log(data)

            const options = {
                hostname: 'api.spacexdata.com',
                path: path,
                port: 443,
                headers: { 'Content-Type' : 'application/json' },
                method: 'POST'
            }

            const req = https.request(options, function(res) {
            
                let body = "";
                
                res.on('data',  (chunk) => {
                    body += chunk;
                });

                res.on("end", () => {
                    try {
                        let json = JSON.parse(body);
                        resolve(json);
                    } catch (error) {
                        reject(error);
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
