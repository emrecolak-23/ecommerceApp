var client = require("./config/connection.js");

/* Get the health status */
client.cluster.health({},function(err,resp,status) {  
    console.log("-- Client Health --",resp);
  });