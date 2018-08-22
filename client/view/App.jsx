import React from 'react'
import {
    Link,
    Switch,
    Route,
    Redirect,
    withRouter
} from 'react-router-dom'
import Routes from 'config/router'
import {
    observer,
    inject,
} from 'mobx-react'
import TopList from 'view/topic-list/index'
import TopDetail from 'view/topic-detail/index'
import TestApi from 'view/test/api-test'

//@inject('appState') @observer
 export default class App extends React.Component {
    componentDidMount() {
        // do something here
    }
    // asyncBootstrap() {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             this.props.appState.count = 3
    //             resolve(true)
    //         })
    //     })
    // }
    componentWillReceiveProps(props){
        console.log(props)
    }
    componentDidUpdate(){
        console.log('update',this.props)
    }
    render(){
        return(
            <div className="app">
             
                    <Link to="/">首页</Link>
                    <Link to="/detail">详情页</Link>
                
                <Routes />
            </div>
        )
    }
}
