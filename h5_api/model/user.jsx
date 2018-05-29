import mongo from 'mongoose';
import bcryptjs from 'bcryptjs';
import moment from 'moment';
const UserSchema = mongo.Schema({
    usercode    : { type: String, lowercase: true, unique: true },     // 账号
    username    : { type: String },                                    // 用户名
    password    : { type: String, required: true },                    // 密码
    mobile      : { type: String },                                    // 手机
    email       : { type: String },                                    // 邮箱
    level       : { type: Number, defalut: 0 },                        // 级别 
    createdate  : { type: Date }                                       // 创建日期
}, { collection: "userinfo" });

UserSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcryptjs.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            }
            bcryptjs.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash;
                user.level = user.level || 0;
                user.createdate = new Date(moment().format('YYYY-MM-DD'));
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function(_password, fun) {
    bcryptjs.compare(_password, this.password, function(err, isMatch) {
        if (err) {
            return fun(err);
        }
        fun(null, isMatch);
    });
};

module.exports = mongo.model("userinfo", UserSchema);