import React,{PureComponent} from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios'
import {
    observer,
    inject,
} from 'mobx-react'
import Helmet from 'react-helmet'
import queryString from 'query-string'
import { hashHistory } from 'react-router'
import { withRouter } from "react-router-dom"
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Container from 'view/layout/container'
import List from '@material-ui/core/List'
import ListItem from './list-item'
import CircularProgress from '@material-ui/core/CircularProgress'
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
        // const query = queryString.parse(this.props.location.search);
        // const { tab } = query
        // return this.props.topicStore.fetchTopics(tab || 'all').then(() => {
        //     return true;
        // }).catch(() => {
        //     return false;
        // })
    }
     bootstrap() {
            const query = queryString.parse(this.props.location.search);
            const { tab } = query
    //      axios({
    //          method: 'get',
    //          url:'https://127.0.0.1:3333/api/topics',
    //          params:{
    //              mdrender: false,
    //              tab: 'all'
    //          },
    //      }).then((resp) => {
    //          console.log('resp1', resp)

    //      }).catch((err) => {
    //         console.log('err',err)
    //  })
            return this.props.topicStore.fetchTopics(tab || 'all').then(() => {
                    return true;
                }).catch(() => {
                   return false;
                })
            
        
    }
     componentWillReceiveProps(nextProps){
        //  if(nextProps.location.query.tab != this.props.location.query.tab){
        //      console.log('no')
        //  }

     }
    _getTab(){          //获取参数
        const {
            location
        } = this.props
        const {tab} = queryString.parse(location.search);
        return tab;
    }
    _fetchList(tab){
        this.props.topicStore.fetchTopics(tab)
    }
    _changeTab = (e,tabs) => {      //切换tab事件
        // this.setState({
        //     tabIndex:index
        // })
        //this.props.history.push("/some/Path");
        // console.log('tab',tab)
        // const data ={tab:tab};
        // const path ={
        //     pathname:'/list',
        //     query:data
        // }
        this.props.history.push({
            pathname:'/list',
            search: `?tab=${tabs}`    //react-router4已经不再支持query持久化，因此要用这种方式进行传参
        });
      //  debugger;
        this._fetchList(tabs)
    }
    _clickItem(topic){
        this.props.history.push({
            pathname: `/detail/${topic.id}`,
        });
    }
    render(){
        const {
            topicStore,
            location
        } = this.props
        const tab = this._getTab();
      // console.log('props',this.props)
        const topicList = topicStore.topics
        const { createTopics } = topicStore
        const { user } = this.props.appState
        if (!topicList){
            return (
                <Container>
                    <section>
                        <CircularProgress color="accent" />
                    </section>
                </Container>
            )
        }else{
            return (
                <Container>

                    <Helmet>
                        <title>this is topic list</title>
                        <meta name="description" content="This is description" />
                    </Helmet>
                    <Tabs value={tab} onChange={this._changeTab}>
                        {
                            Object.keys(tabs).map(t => (
                                <Tab label={tabs[t]} value={t} key={t}></Tab>
                            ))
                        }
                    </Tabs>
                    <List style={{background:'#dfdfdf'}}>
                        {
                            createTopics.map( topic => {
                                topic = Object.assign({},topic,{
                                    author:user.info
                                })
                                return (
                                    <ListItem onClick={() => this._clickItem(topic)} topic={topic} key={topic.id} />
                            )})
                            
                        }
                    </List>
                    <List>
                        {
                            topicList.map(topic => <ListItem onClick={() => this._clickItem(topic)} topic={topic} key={topic.id} />)
                        }
                    </List>

                </Container>
            )
        }        
    }
}

export default withRouter(TopicList)