import {
    API_URL,
    REDUCER_LOADING_KEY,
    REDUCER_LOGIN_KEY,
    ROUTE_LOGIN_KEY,
    ROUTE_HOME_KEY
} from '../config/type.config';
import { Toast } from 'antd-mobile';
import { history } from "../common";

export const getLoading = () => async (dispatch) => {
    try {
        const response = {
            type: REDUCER_LOADING_KEY,
            promise: client => client.post(`${API_URL}/loading`),
            afterSuccess: (result) => {
                if (result.data) history.push(`/${ROUTE_LOGIN_KEY}`);
            }
        };
        await dispatch(response);
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = (params) => async (dispatch) => {
    try {
        const response = {
            type: REDUCER_LOGIN_KEY,
            promise: client => client.post(`${API_URL}/login`, params),
            beforeReducer: (res, dispatch) => {
                if (res.data) {
                    const { auth, result } = res.data;
                    console.log(res.data);
                    if (auth && result) {
                        dispatch({
                            type: REDUCER_LOGIN_KEY,
                            result: Object.assign({ ...result }, { auth })
                        });
                        return history.push(`/${ROUTE_HOME_KEY}`);
                    }
                    return Toast.fail(res.data.msg);
                }
                Toast.fail('服务器访问异常！');
            }
        };
        await dispatch(response);
    } catch (error) {
        console.log(error);
    }
};
