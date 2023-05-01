const Account = require("../services/account.service");
const bcrypt = require('bcryptjs');
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const AccountService = require("../services/account.service");
exports.createAccount = async (req, res, next) => {
    // console.log('tao khoan');
    try {

        // console.log(req.body);
        const accountService = new AccountService(MongoDB.client);

        const created = await accountService.createAccount(req.body);

        return res.send('Da tao thanh cong tai khoan');
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while create a account")
        );
    }
};
// ham de dang nhap tai khoan

exports.loginAccount = async (req, res, next) => {
    let isLogin;

    if (req.body.email&&req.body.email!='') {
        try {
            const accountService = new AccountService(MongoDB.client);

            const user = await accountService.findByEmail(req.body.email);
            // console.log(user)
            if (user) {

                const resultPW = bcrypt.compareSync(req.body.matkhau, user.matkhau);
                if (resultPW) {
                    delete user.matkhau;
                    isLogin = true;
                    return res.send(
                        { user: user, message: 'Ban da dang nhap thanh cong!', isLogin }
                    )
                }
                else {
                    isLogin = false;
                    return res.send(
                        { user: null, message: 'Ban da nhap sai mat khau!', isLogin }
                    )
                }
            }
            else {
                isLogin=false;
                return res.send(
                    { user: null, message: 'Ban da nhap sai email', isLogin })
            }

        } catch (error) {
            console.log(error);
            return next(
                new ApiError(500, "An error occurred while login account")
            );
        }
    } else {
        isLogin=false;
        return res.send(
            { user: null, message: 'Khong co tai khoan giong email',isLogin}
        )
    }


}




// exports.findAll = async (req, res, next) => {
//     const arrayOrder = [];
//     try {
//         const paymentService = new PaymentService(MongoDB.client);
//         arrayOrder = await paymentService.find({});
//     } catch (error) {
//         return next(new ApiError(500, "An error occurred while retrieving order"));
//     }
//     return res.send(arrayOrder);
// };

// exports.findOne = async (req, res, next) => {
//     console.log(req.params.id);
//     try {
//         const productService = new ProductService(MongoDB.client);
//         const productById = await productService.findById(req.params.id);
//         if(!productById){
//             return next(new ApiError(404,"Product not found"));
//         }
//         return res.send(productById)
//     } catch (error) {
//         console.log(error)
//         return next(new ApiError(500,`Erorr  retrieving  product with id=${req.params.id}}`));
//     }
// };

// exports.update = async (req, res,next) => {
//     if (Object.keys(req.body).length == 0) {
//         return next(new ApiError(400, "Data to upadte not be empty"));
//     }
//     try {
//         const productService = new ProductService(MongoDB.client);
//         const document = await productService.update(req.params.id,req.body);
//         if(!document){
//             return (next(new ApiError(404,"Product ot found")))
//         }
//         return res.send({message:" Product was updated successfully"});
//     } catch (error) {
//         return (next(ApiError(500,`Error updating product with id = ${req.params.id}`)));
//     }
// };

// exports.delete = (req, res) => {
//     res.send({ message: "delete hanlder" });
// };

// exports.deleteAll = (req, res) => {
//     res.send({ message: "deleteAll hanlder" });
// };

// exports.findAllFavorite = (req, res) => {
//     res.send({ message: "findAllFavorite hanlder" });
// };