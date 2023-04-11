const { ObjectId } = require("mongodb");
const bcrypt = require('bcryptjs');
class AccountService {
    constructor(client) {
        this.account = client.db().collection("account");
    }

    // Dinh nghia cac phuong thuc su dung
    extractAccountData(entity) {
        const matkhau_hash = bcrypt.hashSync(entity.matkhau,8)
        const inforUser = {
            ho: entity.ho,
            ten: entity.ten,
            sodienthoai: entity.sodienthoai,
            gioitinh: entity.gioitinh,
            ngaysinh: entity.ngaysinh,
            email: entity.email,
            matkhau:matkhau_hash,
            quyenhan:1
        };
        return inforUser;
    }
    // tao tai khoan
    async createAccount(entity) {
        const entityDB = this.extractAccountData(entity);

        const result = await this.account.insertOne(entityDB, { returnDocument: "after", upsert: true });

    }
    // lay ra danh sach tai khoan
    async find(filter) {
        const cursor = await this.account.find(filter);
        return await cursor.toArray();
    }
    // lay tai khoan theo email
    async findByEmail(email) {
        const userEmail= await this.account.findOne({
            email: email,
        });
        // console.log(userEmail);
        return userEmail;
    }

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

}
module.exports = AccountService;