const express = require("express");
const logger = require("./startup/logging");

const app = express();
const port = process.env.PORT || 3001;

const p = new Promise((resolve, reject) => {
  reject(new Error("Something wrong happaned"));
});

require("./startup/db")();
require("./startup/routes")(app);

app.listen(port, () => logger.info(`Connected to port ${port}`));
