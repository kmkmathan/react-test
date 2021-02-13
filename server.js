// Server

const express = require("express");
const app = express();
const tracer = require("./helpers/tracer");
const cors = require("cors");
const port = 4000;
const router = express.Router();

app.use(cors());

process.on("uncaughtException", (err) => {
  tracer.error("Possibly uncaughtException at" + err.stack);
});

process.on("unhandledRejection", (err, p) => {
  tracer.error("Possibly unhandledRejection at" + err);
});


app.use("/api/", router);

require("./routes/index")(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
