import React,{PureComponent} from 'react';
import {
    observer,
    inject,
} from 'mobx-react'

@inject('appState') @observer
export default class TopicDetail extends React.Component{


    render(){
        return [
            <div key="detail">this is topic detail</div>,
        ]
    }
}