import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import {TabBar} from 'antd-mobile';
import * as routeAction from '../actions/routeAction';
import {
    ROUTE_HOME_KEY,
    ROUTE_HOME_TITLE,
    ROUTE_SHOP_KEY,
    ROUTE_SHOP_TITLE,
    ROUTE_VIDEO_KEY,
    ROUTE_VIDEO_TITLE,
    ROUTE_DATA_KEY,
    ROUTE_DATA_TITLE,
    ROUTE_APP_KEY,
    ROUTE_APP_TITLE,
    ROUTE_USER_KEY,
    ROUTE_USER_TITLE
} from '../config/type.config';
import {Home, HomePage, Test} from '../components/index';

const {Item} = TabBar;
const TINT_COLOR = '#40a9ff';
const UNTINT_COLOR = '#949494';

@connect(
    state => ({...state.routes}),
    dispatch => bindActionCreators({...routeAction}, dispatch)
)
export default class Routes extends Component {
    // async componentWillMount() {
    //     await this.props.setRoute({title: ROUTE_HOME_TITLE, key: ROUTE_HOME_KEY});
    // }
    render() {
        const {routes = {key: ROUTE_HOME_KEY}} = this.props;
        return (
            <div style={{position: 'fixed', height: '100vh', width: '100%', top: 0}}>
                <div style={{height: '93vh', width: '100%'}}>
                    <Router>
                        <Switch>
                            {/*<Route exact path='/app' component={() => <Home/>}/>*/}
                            {/*首页模块*/}
                            <Route exact path={`/${ROUTE_HOME_KEY}`} component={() => <Home/>}/>
                            <Route exact path={`/${ROUTE_HOME_KEY}homepage`} component={() => <HomePage/>}/>
                            {/*返佣超市模块*/}
                            <Route exact path={`/${ROUTE_SHOP_KEY}`} component={Test}/>
                            <Route exact path={`/${ROUTE_SHOP_KEY}test`} component={Test}/>
                            {/*直播模块*/}
                            <Route exact path={`/${ROUTE_VIDEO_KEY}`} component={() => <Home/>}/>
                            <Route exact path={`/${ROUTE_VIDEO_KEY}home`} component={() => <Home/>}/>
                            {/*工具模块*/}
                            <Route exact path={`/${ROUTE_APP_KEY}`} component={() => <Home/>}/>
                            <Route exact path={`/${ROUTE_APP_KEY}home`} component={() => <Home/>}/>
                            {/*资料口子模块*/}
                            <Route exact path={`/${ROUTE_DATA_KEY}`} component={() => <Home/>}/>
                            <Route exact path={`/${ROUTE_DATA_KEY}home`} component={() => <Home/>}/>
                            {/*个人信息模块*/}
                            <Route exact path={`/${ROUTE_USER_KEY}`} component={Test}/>
                            <Route exact path={`/${ROUTE_USER_KEY}test`} component={Test}/>
                        </Switch>
                    </Router>
                </div>

                <div style={{position: 'fixed', height: '7vh', width: '100%'}}>
                    <TabBar
                        unselectedTintColor={UNTINT_COLOR}
                        tintColor={TINT_COLOR}
                        barTintColor='white'
                    >
                        <Item
                            title={ROUTE_HOME_TITLE}
                            key={ROUTE_HOME_KEY}
                            selected={(routes.key).indexOf(ROUTE_HOME_KEY) > -1 || typeof routes.key === 'undefined'}
                            icon={<Icon type='home' style={{fontSize: 22, color: UNTINT_COLOR}}/>}
                            selectedIcon={<Icon type='home' style={{fontSize: 22, color: TINT_COLOR}}/>}
                            onPress={async () => {
                                await this.props.setRoute({title: ROUTE_HOME_TITLE, key: ROUTE_HOME_KEY});
                            }}
                        >
                        </Item>
                        <Item
                            title={ROUTE_SHOP_TITLE}
                            key={ROUTE_SHOP_KEY}
                            icon={<Icon type='shop' style={{fontSize: 22, color: UNTINT_COLOR}}/>}
                            selectedIcon={<Icon type='shop' style={{fontSize: 22, color: TINT_COLOR}}/>}
                            selected={(routes.key).indexOf(ROUTE_SHOP_KEY) > -1}
                            onPress={async () => {
                                await this.props.setRoute({title: ROUTE_SHOP_TITLE, key: ROUTE_SHOP_KEY});
                            }}
                        >
                        </Item>
                        <Item
                            title={ROUTE_VIDEO_TITLE}
                            key={ROUTE_VIDEO_KEY}
                            icon={<Icon type='video-camera' style={{fontSize: 22, color: UNTINT_COLOR}}/>}
                            selectedIcon={<Icon type='video-camera' style={{fontSize: 22, color: TINT_COLOR}}/>}
                            selected={(routes.key).indexOf(ROUTE_VIDEO_KEY) > -1}
                            onPress={async () => {
                                await this.props.setRoute({title: ROUTE_VIDEO_TITLE, key: ROUTE_VIDEO_KEY});
                            }}
                        >
                        </Item>
                        <Item
                            title={ROUTE_APP_TITLE}
                            key={ROUTE_APP_KEY}
                            icon={<Icon type='appstore' style={{fontSize: 22, color: UNTINT_COLOR}}/>}
                            selectedIcon={<Icon type='appstore' style={{fontSize: 22, color: TINT_COLOR}}/>}
                            selected={(routes.key).indexOf(ROUTE_APP_KEY) > -1}
                            onPress={async () => {
                                await this.props.setRoute({title: ROUTE_APP_TITLE, key: ROUTE_APP_KEY});
                            }}
                        >
                        </Item>
                        <Item
                            title={ROUTE_DATA_TITLE}
                            key={ROUTE_DATA_KEY}
                            icon={<Icon type='profile' style={{fontSize: 22, color: UNTINT_COLOR}}/>}
                            selectedIcon={<Icon type='profile' style={{fontSize: 22, color: TINT_COLOR}}/>}
                            selected={(routes.key).indexOf(ROUTE_DATA_KEY) > -1}
                            onPress={async () => {
                                await this.props.setRoute({title: ROUTE_DATA_TITLE, key: ROUTE_DATA_KEY});
                            }}
                        >
                        </Item>
                        <Item
                            title={ROUTE_USER_TITLE}
                            key={ROUTE_USER_KEY}
                            icon={<Icon type='user' style={{fontSize: 22, color: UNTINT_COLOR}}/>}
                            selectedIcon={<Icon type='user' style={{fontSize: 22, color: TINT_COLOR}}/>}
                            selected={(routes.key).indexOf(ROUTE_USER_KEY) > -1}
                            onPress={async () => {
                                await this.props.setRoute({title: ROUTE_USER_TITLE, key: ROUTE_USER_KEY});
                            }}
                        >
                        </Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}

Routes.propTypes = {
    setRoute: PropTypes.func
};