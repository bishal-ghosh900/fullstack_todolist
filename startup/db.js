const mongoose = require("mongoose");
const config = require("config");
const logger = require("./logging");

module.exports = () => {
  mongoose
    .connect(config.get("db"), { useUnifiedTopology: true })
    .then(() => logger.info("Connected to mongodb with ease"))
    .catch((ex) => logger.error("Disconnected to mongodb", ex));
};
