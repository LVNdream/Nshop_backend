const { ObjectId } = require("mongodb");
class PaymentService {
    constructor(client) {
        this.payment = client.db().collection("payment");
    }

    // Dinh nghia cac phuong thuc su dung
    extractPaymentData(entity) {
        const time = new Date()
        const inforCustomer = {
            tenkh: entity.tenkh,
            email: entity.email,
            sodienthoai: entity.sodienthoai,
            diachi: entity.diachi,
            methodPay: entity.methodPay,
            ghichu: entity.ghichu,
            thoigian:time, 
            trangthai:'Cho xac nhan',
            tongtien:entity.tongtien
        };
        // console.log(inforCustomer.thoigian);
        // Remove undefined fields
        // Objects.keys(contact).forEach(
        //     (key) => contact[key] === undefined && delete contact[key]
        // );
        return inforCustomer;
    }
    async createOrder(entity) {
        const entityDB = this.extractPaymentData(entity);
        // console.log(entityDB);
        const result = await this.payment.insertOne(entityDB, { returnDocument: "after", upsert: true });
        // console.log(result.insertedId);
        // return result.insertedId;

    }
    async find(filter) {
        const cursor = await this.payment.find(filter);
        return await cursor.toArray();
    }
    async findOrderByEmail(email) {
        const arrayOrder = await this.payment.find({
            email: email,
        });
        return await arrayOrder.toArray();
    }
    async findOrderById(idhd) {
        const arrayOrder = await this.payment.findOne({
            _id: ObjectId.isValid(idhd) ? new ObjectId(idhd) : null,
        });
        return await arrayOrder;
    }


    async updateOrder(id, entity) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = {
            trangthai:entity
        };
        console.log(filter,update)
        const result = await this.payment.findOneAndUpdate(
            filter,
            { $set: update},
            { returnDocument: "after" }
        );
        return result.value;
    }

    async deleteOrdered(idhd) {
        const result = await this.payment.findOneAndDelete({
            _id: ObjectId.isValid(idhd) ? new ObjectId(idhd) : null,
        });
        return result.value;
    }

}
module.exports = PaymentService;