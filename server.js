// Server

const express = require("express");
const app = express();
const tracer = require("./helpers/tracer");
const port = 4000;

process.on("uncaughtException", (err) => {
  tracer.error("Possibly uncaughtException at" + err.stack);
});

process.on("unhandledRejection", (err, p) => {
  tracer.error("Possibly unhandledRejection at" + err);
});


require("./routes/index")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
