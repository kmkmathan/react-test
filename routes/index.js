
module.exports = function (app) {
    const common = require("../helpers/common");
    const spaceXCtrl = require("../controllers/spaceXCtrl");
    
    app.get("/launches", async (req, res) =>  {
      	try {
            const path = `/v4/launches/query`;

            const search = req.query.search ? { "name":  { "$regex": req.query.search }, "upcoming":false }: { "upcoming":false };

            const result = await spaceXCtrl.getSpaceXData(path, req, search);

            return common.sendResponse(result, req, res);
        } catch (err) {
            console.error(err)
            return common.sendError(
              {
                message:
                        err && err.custom
                            ? err.custom
                            : "Error, Please try again",
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
            console.error(err)
            return common.sendError(
              {
                message:
                err && err.custom
                    ? err.custom
                    : "Error, Please try again",
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
