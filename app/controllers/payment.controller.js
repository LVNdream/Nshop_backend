const PaymentService = require("../services/payment.service");
const DetailOrderService = require("../services/detailOrder.service");

const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
exports.createOrder = async (req, res, next) => {
    try {
        let arraypayment = [];

        const paymentService = new PaymentService(MongoDB.client);
        const detailOrderService = new DetailOrderService(MongoDB.client);
        // console.log('day la du lieu');
        // console.log(req.body);
        const itemDetail = req.body.items;
        const document = await paymentService.createOrder(req.body);
        arraypayment = await paymentService.find({});
        // // Ham de them vao chi tiet
        const id_detailOrder = arraypayment[arraypayment.length - 1]._id;
        // console.log(id_detailOrder);

        for (let index = 0; index < itemDetail.length; index++) {
            const dataDetail = {
                idhd: id_detailOrder,
                tensp: itemDetail[index].name,
                masp: itemDetail[index].id,
                soluong: itemDetail[index].quantity,
                size: itemDetail[index].size,
                price: itemDetail[index].price,
                totalprice: (itemDetail[index].price * itemDetail[index].quantity),
                picture: itemDetail[index].picture
            }
            // console.log(dataDetail);
            // console.log('asdsadasdas')
            const kq = await detailOrderService.createDetailOrder(dataDetail);
        }

        // // const document = contactService.extractConactData(req.body);
        // console.log(arraypayment[arraypayment.length-1]);
        return res.send('Da them thanh cong don hang');
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while create a payment")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let arrayOrders = [];
    // console.log(121231231232)
    try {
        const paymentService = new PaymentService(MongoDB.client);
        const detailOrderService = new DetailOrderService(MongoDB.client);
        const orders = await paymentService.find({});
        if (orders.length > 0) {
            for (let index = 0; index < orders.length; index++) {
                const order = orders[index];
                const detailProducts = await detailOrderService.findDetailOrderById(order._id)
                const OrderData = {
                    _id: order._id,
                    thoigian: order.thoigian,
                    tenkh: order.tenkh,
                    diachi: order.diachi,
                    sodienthoai: order.sodienthoai,
                    trangthai: order.trangthai,
                    products: detailProducts,
                    tongtien: order.tongtien
                }
                // console.log(OrderData.products);
                arrayOrders[index] = OrderData
            }
            return res.send({ arrayOrders: arrayOrders, isEmpty: false })
        }
        else {
            return res.send({ arrayOrders: arrayOrders, isEmpty: true })
        }
        // console.log(arrayOrder)
    } catch (error) {
        // console.log(error);
        return next(new ApiError(500, "An error occurred while retrieving order"));
    }
};

exports.findOrderByEmail = async (req, res, next) => {
    // console.log(req.params.email);
    try {
        let allOrders = [];
        const paymentService = new PaymentService(MongoDB.client);
        const detailOrderService = new DetailOrderService(MongoDB.client);
        const orders = await paymentService.findOrderByEmail(req.params.email);
        // console.log(orders.length)
        if (orders.length > 0) {
            for (let index = 0; index < orders.length; index++) {
                const order = orders[index];
                const detailProducts = await detailOrderService.findDetailOrderById(order._id)
                const OrderData = {
                    id: order._id,
                    thoigian: order.thoigian,
                    tenkh: order.tenkh,
                    diachi: order.diachi,
                    sodienthoai: order.sodienthoai,
                    trangthai: order.trangthai,
                    products: detailProducts,
                    tongtien: order.tongtien
                }
                // console.log(OrderData.products);
                allOrders[index] = OrderData
            }
            return res.send({ arrayOrders: allOrders, isEmpty: false })
        }
        else {
            return res.send({ arrayOrders: allOrders, isEmpty: true })
        }

    } catch (error) {
        console.log(error)
        return next(new ApiError(500, `Erorr  retrieving  product with id=${req.params.id}}`));
    }
};

exports.updateOrder = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to upadte not be empty"));
    }
    try {
        const paymentService = new PaymentService(MongoDB.client);
        const resultUpdate = await paymentService.updateOrder(req.body.id, req.body.trangthai);
        if (!resultUpdate) {
            return (next(new ApiError(404, "Product not found")))
        }
        return res.send({ message: " Order was updated successfully" });
    } catch (error) {
        return (next(ApiError(500, `Error updating product with id = ${req.body.id}`)));
    }
};

exports.cancleOrder = async (req, res, next) => {

    try {
        console.log(req.body.idhd);
        const paymentService = new PaymentService(MongoDB.client);
        const detailOrderService = new DetailOrderService(MongoDB.client);
        const order = await paymentService.findOrderById(req.body.idhd);
        // console.log(order)
        if (order) {
            const resultDeleteOrder = await paymentService.deleteOrdered(req.body.idhd);
            const resultDeleteDetailOrder = await detailOrderService.deleteDetailOrder(req.body.idhd);
            console.log(resultDeleteOrder);
            console.log(resultDeleteDetailOrder);
            if (resultDeleteOrder && resultDeleteDetailOrder > 0) {
                res.send('Ban da xoa hoa don thanh cong');
            }
            else {
                res.send('xoa khong thanh cong')
            }

        }
        else {
            res.send('k tim thay hoa don')
        }

    } catch (error) {
        console.log(error)
        return next(new ApiError(500, `Erorr  retrieving  product with id=${req.params.id}}`));
    }

};
// ham show order theo ngay
exports.showOrderFilterByDate = async (req, res, next) => {
    console.log(req.body)
    const start = req.body.start;
    const end = req.body.end;
    // console.log(new Date(ngay))

    try {

        if (start != '' && end!='') {
            const paymentService = new PaymentService(MongoDB.client);
            const OrderFiterByDate = await paymentService.filterOrderByDate(start,end);
            console.log(OrderFiterByDate)
            if (OrderFiterByDate.length > 0) {
                return res.send({ arrayOrders: OrderFiterByDate, isEmpty: false });
            }
            else {
                return res.send({ arrayOrders: null, isEmpty: true });
            }

        }
        else {
            return res.send({ arrayOrders:'Moi ban nhap ngay bat dau va ngay ket thuc', isEmpty: true });
        }

    } catch (error) {
        console.log(error)
        return (next(new ApiError(500, `Error filter order`)));
    }
    // let AllOrderByDate = [];
    // let issetHD_ByDate_Admin = false;
    // if (req.body.ngay) {
    //   const order = await adminModel.selectOrderByDate(req.body.ngay);
    //   if (order != null) {
    //     issetHD_ByDate_Admin = true;
    //     for (let i = 0; i < order.length; i++) {
    //       // console.log(value);
    //       AllOrderByDate[i] = {
    //         listItem: await adminModel.selectCTHD(order[i].idhd),
    //         idhd: order[i].idhd,
    //         hovaten: order[i].hovaten,
    //         ngaylaphd: order[i].ngaylaphd,
    //         diachichitiet: order[i].diachichitiet,
    //         nhanhang: order[i].nhanhang,
    //         trangthai: order[i].trangthai,
    //         tongtien: order[i].tongtien,

    //       }
    //     }
    //     // console.log(AllOrderByDate);
    //     res.render('admin', { AllOrder: AllOrderByDate, issetHD_Admin: issetHD_ByDate_Admin });
    //   }
    //   else {
    //     res.render('admin', { AllOrder: AllOrderByDate, issetHD_Admin: issetHD_ByDate_Admin });
    //   }
    // }
    // else {
    //   res.render('admin', { AllOrder: AllOrderByDate, issetHD_Admin: issetHD_ByDate_Admin });
    // }
};


