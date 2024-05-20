const categoriesRouter = require('express').Router();
const { checkAuth } = require("../middlewares/auth.js");
  
const {findAllCategories, createCategory, findCategoryById, updateCategory, checkIsEmptyName, deleteCategory} = require('../middlewares/categories');
const {sendAllCategories, sendCreatedCategory, sendUpdatedCategory, sendDeletedCategory} = require('../controllers/categories');
  
categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.post("/categories", checkAuth, checkIsEmptyName, findAllCategories, createCategory, sendCreatedCategory);
categoriesRouter.put('/categories/:id', checkAuth, checkIsEmptyName, findCategoryById, updateCategory, sendUpdatedCategory);
categoriesRouter.delete("/categories/:id", checkAuth, deleteCategory, sendDeletedCategory);

module.exports = categoriesRouter;
  