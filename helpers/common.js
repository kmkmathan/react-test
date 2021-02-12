module.exports = {
    sendResponse: function (data, req, res) {
        try {
            return res.status(200).json({ data: data, message: 'success', status: true });
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
