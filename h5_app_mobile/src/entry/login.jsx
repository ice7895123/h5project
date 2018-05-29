import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { InputNumber, Input } from '../common';
import * as loginAction from '../actions/loginAction';
import * as routeAction from '../actions/routeAction';
import {
    BUTTON_LOGIN,
    ROUTE_REGISTER_TITLE,
    PLACEHOLDER_LOGIN_CODE,
    PLACEHOLDER_LOGIN_PASSWORD,
    ROUTE_LOGIN_TITLE,
    ROUTE_REGISTER_KEY,
    LOGIN_ERROR_MSG
} from '../config/type.config';
import LOGIN from '../images/favicon.ico';

@connect(
    state => ({ ...state.login }),
    dispatch => bindActionCreators({ ...routeAction, ...loginAction }, dispatch)
)
export default class Login extends Component {

    state = {
        usercode: null,
        password: null
    }

    handleLogin = () => {
        const { usercode, password } = this.state;
        if (usercode && password) return this.props.loginUser({ usercode, password });
        Toast.info(LOGIN_ERROR_MSG);
    }
    handleChangeValue = (key, value) => {
        this.setState({ [key]: value });
    }

    render() {
        document.title = ROUTE_LOGIN_TITLE;
        return (
            <WingBlank style={{ lineHeight: '30vh' }}>
                <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>
                    <img src={LOGIN} style={{ width: '100px', height: '100px' }} />
                </div>
                <Input
                    value={this.state.usercode}
                    maxLength={11}
                    placeholder={PLACEHOLDER_LOGIN_CODE}
                    onChange={value => this.handleChangeValue('usercode', value)}
                />
                <WhiteSpace size='lg' />
                <Input
                    type='password'
                    value={this.state.password}
                    placeholder={PLACEHOLDER_LOGIN_PASSWORD}
                    onChange={value => this.handleChangeValue('password', value)}
                />
                <WhiteSpace size='lg' />
                <Button type="primary" onClick={this.handleLogin}>{`${BUTTON_LOGIN}`}</Button>
                <WhiteSpace size='lg' />
                <div style={{ textAlign: 'right', height: '30px', lineHeight: '30px' }}>
                    <a onClick={() => this.props.setRoute({
                        key: ROUTE_REGISTER_KEY,
                        title: ROUTE_REGISTER_TITLE
                    })}>{ROUTE_REGISTER_TITLE}</a>
                </div>
            </WingBlank>
        );
    }
};

Login.propTypes = {
    loginUser: PropTypes.func
};