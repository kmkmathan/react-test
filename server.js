// Server

const express = require("express");
const app = express();
const tracer = require("./helpers/tracer");
const cors = require("cors");
const port = 4000;
const router = express.Router();

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}


process.on("uncaughtException", (err) => {
  tracer.error("Possibly uncaughtException at" + err.stack);
});

process.on("unhandledRejection", (err, p) => {
  tracer.error("Possibly unhandledRejection at" + err);
});

app.use(cors(corsOptions));
app.use("/api/", router);

require("./routes/index")(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
