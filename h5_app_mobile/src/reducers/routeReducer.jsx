import {
    REDUCER_ROUTE_KEY
} from '../config/type.config';

const routeReducer = (state = {}, action) => {
    const {result = {}, type} = action;
    switch (type) {
        case REDUCER_ROUTE_KEY:
            return {...state, routes: result};
        default:
            return {...state};
    }
};

export default routeReducer;