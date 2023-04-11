const { ObjectId } = require("mongodb");
class ProductService {
    constructor(client) {
        this.product = client.db().collection("product");
    }

    // Dinh nghia cac phuong thuc su dung
    extractConactData(entity) {
        const product = {
            avata: entity.avata,
            tensp: entity.tensp,
            giasp: entity.giasp,
            soluong: entity.soluong,
        };
        // Remove undefined fields
        // Objects.keys(contact).forEach(
        //     (key) => contact[key] === undefined && delete contact[key]
        // );
        return product;
    }
    async create(entity) {
        const entityDB = this.extractConactData(entity);
        console.log(entityDB);
        const result = await this.product.insertOne(entityDB, { returnDocument: "after", upsert: true });
        console.log(result.insertedId);
        return result.insertedId;

    }

    async find(filter) {
        const cursor = await this.product.find(filter);
        return await cursor.toArray();
    }
    async findById(id) {
        return await this.product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, entity) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(entity);
        const result = await this.product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

}
module.exports = ProductService;