const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
exports.create = async (req, res,next) => {
    // if (!req.body?.name) {
    //     return next(new ApiError(400, "Name not be empty"));
    // }
    // console.log(req.body);
    try {

        // console.log(req.body);
        const productService = new ProductService(MongoDB.client);
        console.log(req.body);
        const document = await productService.create(req.body);
        // const docume nt = contactService.extractConactData(req.body);
        // console.log(document);

        return res.send("Ban da them thanh cong");
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while create a product")
        );
    }
};

exports.findAll = async (req, res,next) => {
    let arrayProduct = [];
    try {
        const productService = new ProductService(MongoDB.client);
        arrayProduct = await productService.find({});
    } catch (error) {
        return next(new ApiError(500,"An error occurred while retrieving product"));
    }
    return res.send(arrayProduct);
};

exports.findOne = async (req, res, next) => {
    // console.log(req.params.id);
    try {
        const productService = new ProductService(MongoDB.client);
        const productById = await productService.findById(req.params.id);
        if(!productById){
            return next(new ApiError(404,"Product not found"));
        }
        return res.send(productById)
    } catch (error) {
        console.log(error)
        return next(new ApiError(500,`Erorr  retrieving  product with id=${req.params.id}}`));
    }
};

exports.update = async (req, res,next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to upadte not be empty"));
    }
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id,req.body);
        if(!document){
            return (next(new ApiError(404,"Product ot found")))
        }
        return res.send(" Cập nhật sản phẩm thành công");
    } catch (error) {
        return (next(ApiError(500,`Error updating product with id = ${req.params.id}`)));
    }
};

exports.delete = (req, res) => {
    res.send({ message: "delete hanlder" });
};

exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll hanlder" });
};

exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite hanlder" });
};