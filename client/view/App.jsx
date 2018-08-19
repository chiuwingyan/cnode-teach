import React from 'react'
import {
    Link,
} from 'react-router-dom'
import Routes from 'config/router'
import {
    observer,
    inject,
} from 'mobx-react'


@inject('appState') @observer
export default class App extends React.Component {

    asyncBootstrap() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.props.appState.count = 3
                resolve(true)
            })
        })
    }

    render(){
        return[
            <div key="link">
                <Link to="/">首页</Link>
                <Link to="/detail">详情页</Link>
            </div>,
            <Routes key="route"/>
        ]
    }
}