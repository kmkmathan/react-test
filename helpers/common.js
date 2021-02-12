module.exports = {
    sendResponse: function (data, req, res) {
        try {
            return res.status(200).json({ data: data, message: "successful" });
        } catch (error) {
            throw error;
        }
    },

    sendError: function (data, res) {
        try {
            return res.status(500).json(data);
        } catch (error) {
            throw error;
        }
    },
};
