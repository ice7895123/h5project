import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Button, Toast} from 'antd-mobile';
import {history} from '../common';
import {ROUTE_HOME_KEY, ROUTE_HOME_TITLE} from "../config/type.config";

@connect(
    state => ({...state.routes, ...state.login}),
    dispatch => bindActionCreators({}, dispatch)
)
export default class Home extends Component {
    handleHomeTest = () => {
        history.push(`/${ROUTE_HOME_KEY}homepage`);
        Toast.info('该按钮只有神才知道用处！');
    }

    render() {
        const {routes = {title: ROUTE_HOME_TITLE, key: ROUTE_HOME_KEY}, userinfo} = this.props;
        console.log({userinfo, routes});
        document.title = routes.title || '';
        return (
            <div style={{height: '100vh', width: '100%', padding: '5px'}}>
                <Button onClick={this.handleHomeTest}> 点击有惊喜！ </Button>
            </div>
        )
    }
}
