import 'babel-core';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import server from './server';
import bluebird from 'bluebird';

dotenv.config();

const app = express();
const { DB_URL } = process.env;

mongoose.Promise = bluebird;

mongoose.connect(
    DB_URL, //数据库地址
    // { user: process.env.DB_USER, pass: process.env.DB_PASSWORD },   // 数据库用户名和密码
    {
        auto_reconnect: true,
        keepAlive: 1,
        connectTimeoutMS: 30000,
        reconnectTries: 30,
        reconnectInterval: 3000
    },
    err => {
        if (!err) {
            return console.log('连接数据库成功!');
        }
        console.log(err);
        process.exit(0);
    }
);

global.mongoose = mongoose;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', server);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.listen(process.env.SERVER_PROT, (error) => {
    if (error) {
        console.log({ error });
    } else {
        console.log(`启动成功，端口号:${process.env.SERVER_PROT}`)
    }
})