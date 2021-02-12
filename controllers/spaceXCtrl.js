const https = require('https');

module.exports = {
    getLaunches: async function () {
    try {
        const url = 'https://api.spacexdata.com/v4/launches';
        // https.get(url,(res) => {
        //     let body = "";
        
        //     res.on("data", (chunk) => {
        //         body += chunk;
        //     });
        
        //     res.on("end", () => {
        //         try {
        //             let json = JSON.parse(body);
        //             console.log(json)
        //             res.json({
        //                 data: json,
        //                 message: "Hello world",
        //             });
        //             // do something with JSON
        //         } catch (error) {
        //             console.error(error.message);
        //         };
        //     });
        
        // }).on("error", (error) => {
        //     console.error(error.message);
        // });

        let result = await https.get(url);
        console.log(result, 'result')
      //let result = await transporter.sendMail(mail);
      
      return result;
    } catch (err) {
      throw err;
    }
  }
}
