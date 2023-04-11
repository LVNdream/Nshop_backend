const { ObjectId } = require("mongodb");
class DetailOrderService {
    constructor(client) {
        this.detailOrder = client.db().collection("detailorder");
    }

    // Dinh nghia cac phuong thuc su dung
    // extractDetailOrderData(id,entity) {
    //     const detailOrderData = {
    //         _id: id,
    //         masp: entity.id,
    //         soluong: entity.quantity,
    //         size: entity.size,
    //     };
    //     return detailOrderData;
    // }
    async createDetailOrder(detailData) {
        // const detailData = await this.extractDetailOrderData(id,entity);
        // console.log('bat dau data');
        // console.log(detailData);
        // console.log('asasdwwrrrrr');
        const result = await this.detailOrder.insertOne(detailData, { returnDocument: "after", upsert: true });
        // return result;
    }

    async findDetailOrderById(idhd) {
        // console.log(idhd)
        const arrayDetail = await this.detailOrder.find({
            idhd: ObjectId.isValid(idhd) ? new ObjectId(idhd) : null,
        });
        return await arrayDetail.toArray();
    }

    // async find(filter) {
    //     const cursor = await this.product.find(filter);
    //     return await cursor.toArray();
    // }
    // async findById(id) {
    //     return await this.product.findOne({
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     });
    // }

    // async update(id, entity) {
    //     const filter = {
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     };
    //     const update = this.extractPaymentData(entity);
    //     const result = await this.product.findOneAndUpdate(
    //         filter,
    //         { $set: update },
    //         { returnDocument: "after" }
    //     );
    //     return result.value;
    // }
    async deleteDetailOrder(idhd) {
        const result = await this.detailOrder.deleteMany({ idhd: ObjectId.isValid(idhd) ? new ObjectId(idhd) : null, });
        return result.deletedCount;
    }

}
module.exports = DetailOrderService;