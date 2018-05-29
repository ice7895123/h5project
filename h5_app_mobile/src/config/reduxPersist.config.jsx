import { persistentStoreBlacklist } from '../reducers';
const REDUX_PERSIST = {
    active: true, // 是否采用持久化策略
    storeConfig: persistentStoreBlacklist // 白名单，持久化数据
}

export default REDUX_PERSIST;