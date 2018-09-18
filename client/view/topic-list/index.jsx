import React,{PureComponent} from 'react';
// import ReactDOM from 'react-dom';

import {
    observer,
    inject,
} from 'mobx-react'
import Helmet from 'react-helmet'
import { withRouter } from "react-router-dom";
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Container from 'view/layout/container'
import List from '@material-ui/core/List'
import ListItem from './list-item'
import { tabs } from '../../util/variable-define'
 @inject(stores => {
     return {
         appState: stores.appState,         //stores是一个对象，包括我们在Provider传的所有值
         topicStore: stores.TopicStore
     }
 }) @observer
class TopicList extends React.Component{
    constructor(){
        super()
        this.state={
            tabIndex:0
        }
    }
    componentDidMount() {
        // do something here
        this.props.topicStore.fetchTopics()
    }
    _changeTab = (e,index) => {
        this.setState({
            tabIndex:index
        })
    }
    _clickItem(){
        console.log('click')
    }
    render(){
        const {
            topicStore,
        } = this.props
        
       console.log('props', this.props)
        const topicList = topicStore.topics

        return (
            <Container>
          
                <Helmet>
                    <title>this is topic list</title>
                    <meta name="description" content="This is description"/>
                </Helmet>
            <Tabs value={} onChange={this._changeTab}>
            {
                Object.keys(tabs).map( tab =>(
                    <Tab label={tabs[tab]} value={tab}></Tab>
                ))
            }
            </Tabs>
            <List>
                {
                        topicList.map(topic => <ListItem onClick={() => this._clickItem()} topic={topic} key={topic.id}/>)
                }
            </List>
               
            </Container>
        )
           
        
    }
}

export default withRouter(TopicList)