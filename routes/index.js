
module.exports = function (app) {
    const common = require("../helpers/common");
    const spaceXCtrl = require("../controllers/spaceXCtrl");
    app.get("/launches", async (req, res) =>  {
        try {
           
            let result = await spaceXCtrl.getLaunches();
            console.log(result, "analytics");
            return common.sendResponse(result, req, res);
          } catch (err) {
            return common.sendError(
              {
                message: err,
              },
              res
            );
          }
    });

    app.get("/rockets", async (req, res) => {
        res.json({
            data: null,
            message: "Hello world",
        });
    });

    app.get("*", async (req, res) => {
        res.json({
            data: null,
            message: "Hello world",
        });
    });
};
