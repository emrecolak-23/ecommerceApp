const {Client} = require('@elastic/elasticsearch');
const esClient = new Client({
    cloud: {
        id: "EcommerceApp:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDhiNDY1MWI1MzA3MTRmMDBiOTk3MGNiMThiMjk3ZmJjJDRhMDI4YzFhODk2YzRlZGY4NjZlYWQ2NGE0OGM3MDUw"
      },
      auth: {
        username: "elastic",
        password: "ZUkEmYoXBKe6a2oZCwViphGK"
    }
});
 
esClient.info()
  .then(response => console.log(response))
  .catch(error => console.error(error))

module.exports = esClient;