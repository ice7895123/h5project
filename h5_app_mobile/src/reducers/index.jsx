import { combineReducers } from 'redux';

import routeReducer from './routeReducer';
import loginReducer from './loginReducer';

export default combineReducers({
    routes: routeReducer,
    login: loginReducer
});

// 添加peresist白名单，以下这些reducer持久化
export const persistentStoreBlacklist = [
    'login',
];