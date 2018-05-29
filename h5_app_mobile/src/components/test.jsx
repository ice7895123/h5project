import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Toast} from 'antd-mobile';
import * as loginAction from "../actions/loginAction";
import {ROUTE_HOME_KEY, ROUTE_HOME_TITLE} from "../config/type.config";

@connect(
    state => ({...state.login, ...state.routes}),
    dispatch => bindActionCreators({...loginAction}, dispatch)
)
export default class Test extends Component {
    handleLoginTest = async () => {
        await this.props.loginUser({mobile: '13423737202'});
        const {userinfo = {}} = this.props;
        Toast.info(userinfo.mobile);
    }

    render() {
        const {routes = {title: ROUTE_HOME_TITLE, key: ROUTE_HOME_KEY}} = this.props;
        document.title = routes.title;
        return (
            <div style={{height: '100vh', width: '100%', padding: '5px'}}>
                <Button onClick={this.handleLoginTest}> Test！ </Button>
            </div>
        )
    }
}
