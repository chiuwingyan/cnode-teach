import React,{PureComponent} from 'react';
// import ReactDOM from 'react-dom';

import {
    observer,
    inject,
} from 'mobx-react'
import Helmet from 'react-helmet'

import {Input} from 'material-ui'
import Button from '@material-ui/core/Button'
@inject('appState') @observer
export default class TopicList extends React.Component{
    
    componentDidMount() {
        // do something here
    }


    render(){
        return (
            <div>
                <Helmet>
                    <title>this is topic list</title>
                    <meta name="description" content="This is description"/>
                </Helmet>
            <div key="test">test {this.props.appState.msg}</div> 
                {/* <Button color="primary" >Default</Button> */}
                <Input />
            </div>
        )
           
        
    }
}