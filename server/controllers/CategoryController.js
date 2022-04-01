// Imports packages
const {PrismaClient} = require('@prisma/client');
// Import Category Logger
const Logger = require("../logger/Category");

// Create prisma instance
const prisma = new PrismaClient();

// Use Prisma Hooks For Logging
prisma.$use(async (params, next) => {
  
  if (params.action == "create" || params.action == "delete") {
    // Log Create and Delete Methods
    Logger.log({
      level: "info",
      message: params,
    })
  }
  return next(params)
})

module.exports =  class Category {

  // Get All Category
  static async getAllCategory(req, res) {

    try {
      const categories = await prisma.category.findMany({
        include: {
          product: true
        }
      })

      res.status(200).json({categories});
    } catch(error) {
      res.status(400).json(error);
      Logger.log({
        level: "error",
        message: error,
      })
    }
  }

  static async updateCategory(req,res) {
    
    try {

      const {id} = req.params;

      const category = await prisma.category.update({
        where: {
          id: Number(id)
        },
        data: req.body
      });

      res.status(201).json(category);

    } catch(error) {
      res.status(200).json(error);
      Logger.log({
        level: "error",
        message: error,
      })
    }
  }

  static async deleteCategory(req, res) {

    try {

      const {id} = req.params;

      const category = await prisma.category.delete({
        where: {
          id: Number(id)
        },
        include: {
          product: true
        }
      })

      res.status(200).json(category);

    } catch(error) {
      res.status(400).json(error);
      Logger.log({
        level: "error",
        message: error,
      })
    }

  }

  static async getCategoryById(req,res) {

    try {

      const {id} = req.params

      const category = await prisma.category.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          product: true
        }
      })
      res.status(200).json(category);
    } catch(error) {
      res.status(400).json(error);
    }

  }

}