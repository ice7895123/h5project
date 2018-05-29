import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserInfo from './model/user';

dotenv.config();
const router = express.Router();
const SECRET = 'Kdli89=29Kjd=29hk72J.?ld/kdh03hKK^27';

router.use('/loading', (req, res) => {
    res.send(true);
});

router.use('/login', async (req, res) => {
    const {usercode, password} = req.body;
    if (usercode && password) {
        const userinfo = await UserInfo.findOne({$or: [{usercode}, {mobile: usercode}]});
        if (!userinfo) {
            return res.send({msg: '用户不存在请核实登录信息！', auth: false});
        }
        return userinfo.comparePassword(password, async (err, isMatch) => {
            if (isMatch && !err) {
                const token = await jwt.sign({...userinfo}, SECRET, {expiresIn: '2 days'});
                res.send({auth: true, token, result: userinfo});
            } else {
                res.send({msg: '用户账号获取失败！', auth: false});
            }
        });
    }
    return res.send({msg: '用户账号获取失败！', auth: false});
});

router.use('/register', async (req, res) => {
    const data = req.body;
    if (!data) {
        return res.send({code: 500, msg: '注册信息获取失败，请重新操作！'});
    }
    const {usercode, mobile} = data;
    try {
        const userinfo = await UserInfo.findOne({$or: [{usercode}, {mobile}]});
        if (userinfo) {
            if (usercode === userinfo.usercode) {
                return res.send({code: 500, msg: '账号已被使用！'});
            }
            if (mobile === userinfo.mobile) {
                return res.send({code: 500, msg: '手机号码已被注册，请核实！'});
            }
            return res.send({code: 500, msg: '用户信息已存在,请直接登录!'});
        }
        await UserInfo(data).save((error, response) => {
            if (error) {
                return res.send({code: 500, msg: '系统异常，用户信息注册失败！'});
            }
            return res.send(Object.assign({code: 500}, {userinfo: response}));
        });
    } catch (error) {
        console.log(`user register error,`, {error});
        res.end({error});
    }

});

module.exports = router;