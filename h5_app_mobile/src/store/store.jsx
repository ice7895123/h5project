
import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createMemoryHistory';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage';

//引入middleware
import { promiseMiddleware } from '../middleware';
import rootReducer from '../reducers';
import ReduxPersistConfig from '../config/reduxPersist.config';


const history = createHistory();
const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composeEnhancerWare = ReduxPersistConfig.active ?
    composeEnhancers(applyMiddleware(promiseMiddleware, middleware), persistState(ReduxPersistConfig.storeConfig.blacklist)) :
    composeEnhancers(applyMiddleware(promiseMiddleware, middleware));

const store = createStore(rootReducer, {}, composeEnhancerWare);

export default store;