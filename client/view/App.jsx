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


@inject('appState') @observer
 class App extends React.Component {
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
     bootstrap() {
         return new Promise((resolve) => {
             setTimeout(() => {
                 this.props.appState.count = 3
                 resolve(true)
             })
         })
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


export default withRouter(App)