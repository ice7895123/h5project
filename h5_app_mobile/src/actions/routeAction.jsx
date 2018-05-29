import {
    REDUCER_ROUTE_KEY,
    ROUTE_HOME_KEY,
    ROUTE_HOME_TITLE
} from '../config/type.config';
import {history} from '../common';

const changeRoutes = (response = {title: ROUTE_HOME_TITLE, key: ROUTE_HOME_KEY}) => ({
    type: REDUCER_ROUTE_KEY,
    result: response,
    afterSuccess: () => {
        history.push(`/${response.key}`);
    }
});

export const setRoute = (param) => async (dispatch) => {
    try {
        await dispatch(changeRoutes(param));
    } catch (error) {
        console.log(error);
    }
};
