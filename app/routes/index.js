const productRouter = require('./product.route');
const paymentRouter = require('./payment.router');
const accountRouter = require('./account.router');


function router(app) {


    app.use('/Nshop', productRouter);
    app.use('/Nshop/payment', paymentRouter);
    app.use('/Nshop/account', accountRouter);
}

module.exports = router;