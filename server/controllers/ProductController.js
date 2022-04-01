// Imports packages
const { PrismaClient } = require("@prisma/client");
// Imports logger
const Logger = require("../logger/Product");
// Create prisma instance
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.action == "create" || params.action == "delete") {
    Logger.log({
      level: "info",
      message: params,
    });
  }
  const result = await next(params);
  return result;
});

exports.getAllProduct = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const productPerPage = 4;
    const totalProduct = await prisma.product.count();
    const products = await prisma.product.findMany({
      take: productPerPage,
      skip: (page-1)*productPerPage,
      include: { Category: true },
    });
    res.status(200).json({
      products : products,
      pages: Math.ceil(totalProduct/productPerPage)
    })
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
    Logger.log({
      level: "error",
      message: error,
    });
  }
};

exports.getAllProductAdmin = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { Category: true },
    });
    res.status(200).json(products)
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
    Logger.log({
      level: "error",
      message: error,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { getProductById } = require("../repositories/Product");
    const product = await getProductById(req.params);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
    Logger.log({
      level: "error",
      message: error,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { createProduct } = require("../repositories/Product");
    const product = await createProduct(req);

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!", error });
    Logger.log({
      level: "error",
      message: error,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const { deleteProduct } = require("../repositories/Product");
    const data = await deleteProduct(req.params);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
    Logger.log({
      level: "error",
      message: error,
    });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const { updateProduct } = require("../repositories/Product");
    const product = await updateProduct(req);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(error);
    Logger.log({
      level: "error",
      message: error,
    });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const { searchProduct } = require("../repositories/Product");
    const product = await searchProduct(req.query.q);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
    Logger.log({
      level: "error",
      message: error,
    });
  }
};

exports.searchProductByCategory = async (req,res) => {
  try {
    const { searchByCategory } = require("../repositories/Product");
    const product = await searchByCategory(req.query.category);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
    Logger.log({
      level: "error",
      message: error,
    });
  }
}

exports.detailedSearchProduct = async (req,res) =>{
  try {
    const {detailedSearch} = require("../repositories/Product");
    const product = await detailedSearch(req);
    res.status(200).json(product);
  } catch(error) {
    res.status(400).json(error);
    Logger.log({
      level: "error",
      message: error
    })
  }
}
