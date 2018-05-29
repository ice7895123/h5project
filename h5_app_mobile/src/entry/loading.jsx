import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Spin} from 'antd';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as loginAction from '../actions/loginAction';
import * as routeAction from '../actions/routeAction';
import Routes from './routes';
import Login from './login';
import {
    ROUTE_HOME_KEY,
    ROUTE_LOGIN_KEY,
    ROUTE_LOGIN_TITLE,
    ROUTE_REGISTER_KEY,
    ROUTE_HOME_TITLE
} from '../config/type.config';
import LOGIN from '../images/favicon.ico';

@connect(
    state => ({...state.login}),
    dispatch => bindActionCreators({...loginAction, ...routeAction}, dispatch)
)
export default class Loading extends Component {

    async componentWillMount() {
        const {loading} = this.props;
        if (!loading) {
            setTimeout(async () => {
                await this.props.getLoading();
            }, 2000);
            return;
        }
        const {userinfo} = this.props;
        if (userinfo && userinfo.auth) {
            await this.props.setRoute({title: ROUTE_HOME_TITLE, key: ROUTE_HOME_KEY});
            return;
        }
        await this.props.setRoute({key: ROUTE_LOGIN_KEY, title: ROUTE_LOGIN_TITLE});
    }

    render() {
        const {loading} = this.props;
        if (loading) {
            return (
                <div>
                    <Router>
                        <Switch>
                            <Route exact path={`/${ROUTE_LOGIN_KEY}`} component={() => <Login/>}/>
                            <Route exact path={`/${ROUTE_REGISTER_KEY}`} component={() =>
                                <div style={{height: '100vh', width: '100%'}}>
                                    注册
                                </div>
                            }/>
                            <Route exact component={() => <Routes/>}/>
                        </Switch>
                    </Router>
                </div>
            )
        }

        return (
            <Spin tip="数据加载中..." size={'large'}>
                <div style={{height: '100vh', width: '100%', textAlign: 'center', lineHeight: '70vh'}}>
                    <img src={LOGIN} style={{height: '120px'}}/>
                </div>
            </Spin>
        )
    }
};

Loading.propTypes = {
    getLoading: PropTypes.func
};