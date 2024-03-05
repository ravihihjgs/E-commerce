

import express from 'express'
import { isAdmin, requireSignIn } from '../middlesware/authMiddleware.js';
import {
    braintreepaymentController,
    braintreetokenController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFiltersController,
    productListController,
    productphotoController,
    realtedProductController,
    searchProductController,
    updateProductController
} from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router()

//cfreate product
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

//get product
router.get('/get-product', getProductController)

//get single route
router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', productphotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//update product
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);

//filter product
router.post('/product-filters', productFiltersController);

//Product count
router.get('/product-count', productCountController);

//Product per page
router.get('/product-list/:page', productListController);

// Search Product 
router.get('/search/:keyword', searchProductController);

//similar products
router.get('/related-product/:pid/:cid', realtedProductController);

//category wise product 
router.get("/product-category/:slug", productCategoryController);

//payment/token
router.get("/braintree/token", braintreetokenController);

//payment
router.post('/braintree/payment',requireSignIn,braintreepaymentController)

export default router;
