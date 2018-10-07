import React from 'react'
import {
    inject,
    observer,
} from 'mobx-react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Typographt from '@material-ui/core/Typography'
import { withRouter } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles'

import UserWrapper from './user'
import infoStyles from './styles/user-info-style'



const TopicItem = (({ topic, onClick }) => {
    return (
        <ListItem button onClick={onClick}>
            <Avatar src={topic.author.avatar_url} />
            <ListItemText
                primary={topic.title}
                secondary={`最新回复:${topic.last_reply_at}`} />
        </ListItem>
    )

}
)
@inject((stores) => {
    return {
        user:stores.appState.user,
        appState:stores.appState
    }
}) @observer
class UserInfo extends React.Component{
    componentWillMount(){
        if(!this.props.user.isLogin){
            this.props.history.replace('/user/login')
        }else{
            this.props.appState.getUserDetail()
            this.props.appState.getUserCollection()
        }
    }

    _clickItem(topic) {
        this.props.history.push({
            pathname: `/detail/${topic.id}`,
        });
    }
    render(){
        const {classes} = this.props
        const topic = this.props.appState.user.detail.recentTopics
        const replies = this.props.appState.user.detail.recentReplies
        const collections = this.props.appState.user.collections.list
        return(
            <UserWrapper>
            <div className={classes.root}>
                <Grid container spacing={16} align="stretch">
                    <Grid item xs={12} md={4}>
                    <Paper elevation={2}>
                        <Typographt className={classes.partTitle}>
                            <span>最近发布的话题</span>
                        </Typographt>
                        <List>
                            {
                                topic.length >0 ?
                                topic.map(topic => 
                                <TopicItem 
                                topic={topic} 
                                key={topic.id}
                                onClick={() => this._clickItem(topic)}/>):
                                            <Typographt align="center">
                                                最近没有发布过话题
                                            </Typographt>
                            }
                            </List>
                        </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper elevation={2}>
                                <Typographt className={classes.partTitle}>
                                    <span>新的回复</span>
                                </Typographt>
                                <List>
                                    {/* {
                                        replies.length > 0 ?
                                            replies.map(topic => 
                                            <TopicItem 
                                                topic={topic} 
                                                key={topic.id} 
                                                onClick={() => this._clickItem(topic)}/>) :
                                            <Typographt align="center">
                                                最近没有回复
                                            </Typographt>
                                    } */}
                                </List>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper elevation={2}>
                                <Typographt className={classes.partTitle}>
                                    <span>收藏的话题</span>
                                </Typographt>
                                <List>
                                    {
                                        this.props.user.collections.list.length > 0 ?
                                            this.props.user.collections.list.map(topic => {
                                                return (<TopicItem topic={topic} key={topic.id} onClick={() => this._clickItem(topic)} />)
                                            } 
                                        ):
                                            <Typographt align="center">
                                                最近没有收藏的话题
                                            </Typographt>
                                    }
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>    

            </div>
                </UserWrapper>
        )
    }
}

export default withRouter(withStyles(infoStyles)(UserInfo))
