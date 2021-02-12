
module.exports = function (app) {
    const common = require("../helpers/common");
    const spaceXCtrl = require("../controllers/spaceXCtrl");
    
    app.get("/launches", async (req, res) =>  {
      	try {
            const path = `/v4/launches/query`;

            const result = await spaceXCtrl.getSpaceXData(path, req);

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
		try {
            const path = `/v4/rockets/query`;

            const result = await spaceXCtrl.getSpaceXData(path, req);

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

    app.get("*", async (req, res) => {
        res.json({
            data: null,
            message: "Hello world",
        });
    });
};
