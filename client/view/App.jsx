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
import MainAppBar from './layout/app-bar'

@inject(stores => {
    return {
        appState: stores.appState,         //stores是一个对象，包括我们在Provider传的所有值
       // topicStore: stores.TopicStore
    }
}) @observer
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
    //  bootstrap() {
    //      return new Promise((resolve) => {
    //          setTimeout(() => {
    //              this.props.appState.count = 3
    //              resolve(true)
    //          })
    //      })
    //  }
    render(){
        return[
            <MainAppBar />,
            <Routes />
        ]
            
    }
}


export default withRouter(App)