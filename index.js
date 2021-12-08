const express = require("express");
const logger = require("./startup/logging");

const app = express();
const port = process.env.PORT || 3001;

require("./startup/db")();
require("./startup/routes")(app);

app.listen(port, () => logger.info(`Connected to port ${port}`));

// 2. winston
// 3. asyncHandler as middleware with try..catch
