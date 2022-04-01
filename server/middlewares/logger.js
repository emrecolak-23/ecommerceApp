const CategoryLogger = require("../logger/Category");

module.exports = categoryLogger = (params) => {

  CategoryLogger.log({
    level: "info",
    message: params,
  })
  next();
}