import React, { Component } from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'

import {
    observer,
    inject,
} from 'mobx-react'
import TopList from 'view/topic-list/index'
import TopDetail from 'view/topic-detail/index'
import UserLogin from 'view/user/login'
import UserInfo from 'view/user/info'
import TopicCreate from 'view/topic-create/index'
import { withRouter } from "react-router-dom"
const PrivateRoute = ({isLogin,component:Component,...rest}) => (
    <Route 
    {...rest}
        render={
            (props) => (isLogin ?
            <Component {...props} /> :
            <Redirect
                to={{
                    pathname: '/user/login',
                    search: `?from=${rest.path}`,
                }} />
            ) } /> )
        
const InjectedPrivateRoute = withRouter(inject((stores) => {
    return {
        isLogin:stores.appState.user.isLogin || false
    }
})(observer(PrivateRoute)))

export default ()=>[
    <Route  path="/" render={() => <Redirect to="/list?tab=all" />} exact key="home" />,
    <Route path="/list" component={TopList} key="toplist" />,
    <Route path="/detail/:id" component={TopDetail} key="topdetail" />,
    <Route path="/user/login" component={UserLogin} key="UserLogin" />,
    <Route path="/user/info" component={UserInfo} key="UserInfo" />,
    // <Route path="/topic/create" component={TopicCreate} key="TopicCreate" />,
    <InjectedPrivateRoute path="/topic/create" component={TopicCreate} key="TopicCreate"/>
]