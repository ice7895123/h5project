import React from 'react';
import ReactDOM from 'react-dom';
import '../style/antd-3.5.1.css';
import 'antd-mobile/dist/antd-mobile.css';
import '../style/app.less';
import {Provider} from 'react-redux';
import store from '../store/store';
import Loading from './loading';
ReactDOM.render(<Provider store={store}><Loading /></Provider>, document.getElementById('root'));
