// Import Packages for elasticsearch
const elasticClient = require("../elasticsearch/config/connection");
// Import Logger
const Logger = require("../logger/Product");
// Import Packages
const { PrismaClient } = require("@prisma/client");
// Create prisma instance
const prisma = new PrismaClient();
// Import fs module
const fs = require("fs");

// Use Prisma Hooks For Logging
prisma.$use(async (params, next) => {
  if (params.action == "create" || params.action == "delete") {
    // Log Create and Delete Methods
    Logger.log({
      level: "info",
      message: params,
    });
  }
  const result = await next(params);
  return result;
});
//--- Get Product By Id From Postgre Database ---//
async function getProductById(params) {
  const { id } = params;
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Category: true,
    },
  });
  return product;
}
//--- Search Product ----///
async function searchProduct(phrase) {
  let hits = [];

  const searchResult = await elasticClient.transport
    .request({
      method: "POST",
      path: "/ecommerce_data/_search",
      body: {
        query: {
          multi_match: {
            query: phrase,
            fields: ["title", "content"],
            type: "phrase_prefix",
          },
        },
        highlight: {
          fields: {
            title: {},
            content: {},
          },
        },
      },
    })
    .catch((e) => console.log("err", e));

  hits = searchResult.hits.hits.map(function (hit) {
    return hit._source;
  });
  console.log(hits);

  return {
    hitsCount: hits.length,
    hits,
  };
}

//--- Delete Product  ---//
async function deleteProduct(params) {
  try {
    const { id } = params;

    // Delete Product From Elastic Search Database
    await elasticClient.transport
      .request({
        method: "DELETE",
        path: `/ecommerce_data/_doc/${id}`,
      })
      .catch((e) => console.log("err", e));

    // Postgre Database Delete Product
    const product = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    })
    // Delete Product Image From Uploads Folder
    let deletedImage = __dirname + "/../uploads/" + product.image;
    fs.unlinkSync(deletedImage);
  
    return product;
  } catch (error) {
    // Log Error
    Logger.log({
      level: "error",
      message: error,
    });
    return error;
  }
}

//--- Create Product and Add Into Databases ---//
async function createProduct(req) {
  // PostgreSql Product Data Created
  const product = await prisma.product.create({
    data: {
      title: req.body.title,
      quantity: Number(req.body.quantity),
      content: req.body.content,
      image: req.file.filename,
      price: Number(req.body.price),
      categoryId: Number(req.body.categoryId),
    },
  });

  // Elastic Search Product Document Created
  const bulkResponse = await elasticClient.bulk({
    refresh: true,
    operations: [
      { index: { _index: "ecommerce_data", _id: product.id } },
      {
        title: req.body.title,
        quantity: Number(req.body.quantity),
        content: req.body.content,
        image: req.file.filename,
        price: parseFloat(req.body.price),
        categoryId: Number(req.body.categoryId),
      },
    ],
  });

  if (bulkResponse.errors) {
    console.log(bulkResponse);
    process.exit(1);
  }

  return product;
}

//--- Update Product --//
async function updateProduct(req) {
  const { id } = req.params;
  // Product Price Updated in Postgre Database
  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      price: Number(req.body.price),
    },
  });
  // Product Price Updated in Elasticsearh Database
  await elasticClient
    .update({
      index: "ecommerce_data",
      id: id,
      doc: {
        price: parseFloat(req.body.price),
      },
    })
    .catch((e) => console.log("err", e));

  return product;
}
// Search Products By Category and Min Max Price In ElasticSearch
async function detailedSearch(req) {

  let hits = [];

  const searchResult = await elasticClient.transport
    .request({
      method: "GET",
      path: "/ecommerce_data/_search",
      body: {
        query: {
          bool: {
            must: [ 
              {
                match_phrase: {
                  categoryId: Number(req.query.category)
                }
              },
              {
                range: {
                  price: {
                    gte: parseFloat(req.query.min),
                    lte: parseFloat(req.query.max)
                  }
                }
              }
            ]
          }
        }
      },
    })
    .catch((e) => console.log("err", e));

  hits = searchResult.hits.hits.map(function (hit) {
    return hit._source;
  });
  console.log(hits);

  return {
    hitsCount: hits.length,
    hits,
  };

}
// Search Products By Category In ElasticSearch
async function searchByCategory(query) {
  let hits = [];

  const searchResult = await elasticClient.transport
    .request({
      method: "GET",
      path: "/ecommerce_data/_search",
      body: {
        query: {
          match:{
            categoryId: Number(query)
          }
        }
      },
    })
    .catch((e) => console.log("err", e));

  hits = searchResult.hits.hits.map(function (hit) {
    return hit._source;
  });
  console.log(hits);

  return {
    hitsCount: hits.length,
    hits,
  };
}

module.exports = {
  deleteProduct,
  getProductById,
  createProduct,
  updateProduct,
  detailedSearch,
  searchProduct,
  searchByCategory
};
