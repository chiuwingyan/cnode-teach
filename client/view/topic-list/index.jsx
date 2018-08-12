import React,{PureComponent} from 'react';
import {
    observer,
    inject,
} from 'mobx-react'

@inject('appState') @observer
export default class TopicList extends React.Component{

    render(){
        return [
            <div key="key">{this.props.appState.count}</div>,
        ]
    }
}