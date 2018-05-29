import axios from 'axios';
import { Toast } from "antd-mobile/lib/index";

function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }
        const { promise, beforeReducer, afterSuccess, ...rest } = action;
        if (!action.promise) {
            if (afterSuccess && typeof afterSuccess === 'function') {
                afterSuccess();
            }
            return next(action);
        }
        if (beforeReducer) {
            return promise(axios).then((result) => {
                beforeReducer(result, dispatch, getState);
            }).catch(error => {
                Toast.info('beforeReducer,模块加载失败，请联系客服人员');
            })
        }
        const onFulfilled = result => {
            next({ ...rest, result });
            if (afterSuccess) {
                afterSuccess(result, dispatch, getState);
            }
        };
        const onRejected = (error) => {
            Toast.offline('网络异常，请检查网络！');
            next({ ...rest, error });
        };
        return promise(axios).then(onFulfilled, onRejected).catch(error => {
            Toast.info('模块加载失败，请联系客服人员');
            onRejected(error)
        });
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;