import {
    REDUCER_LOADING_KEY,
    REDUCER_LOGIN_KEY
} from '../config/type.config';

const loginReducer = (state = {}, action) => {
    const {result = {}, type} = action;
    switch (type) {
        case REDUCER_LOADING_KEY:
            return {...state, loading: result.data};
        case REDUCER_LOGIN_KEY:
            return {...state, userinfo: result};
        default:
            return {...state};

    }
};

export default loginReducer;