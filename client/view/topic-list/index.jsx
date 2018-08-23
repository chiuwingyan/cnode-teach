import React,{PureComponent} from 'react';
import {
    observer,
    inject,
} from 'mobx-react'

@inject('appState') @observer
export default class TopicList extends React.Component{
    
    componentDidMount() {
        // do something here
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
        return [
            <div key="test">test {this.props.appState.msg}</div>,
        ]
    }
}