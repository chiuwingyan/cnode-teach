import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import dateFormat from 'dateformat';
import {
    topicPrimaryStyle,
    topicSecondaryStyles} from './style.js'
const Primary = ({classes,topic}) => {
   // console.log('props',classes)
    return(
        <div className={classes.root}>
            <span className={classes.tab}>{topic.tab}</span>
            <span className={classes.title}>{topic.title}</span>
        </div>
    )
}


const Secondary = ({classes,topic}) =>(
    <span className={classes.root}>
        <span className={classes.username}>{topic.author.loginname}</span>
        <span className={classes.count}>
            <span className={classes.accentColor}>{topic.reply_count || 0}</span>
            <span>/</span>
            <span>{topic.visit_count || 0} </span>
        </span>
        <span>创建时间：{dateFormat(topic.create_at,'yy年mm月dd日')}</span>
    </span> 
)
const StyledPrimary = withStyles(topicPrimaryStyle)(Primary);  
const StyledSecondary = withStyles(topicSecondaryStyles)(Secondary);  

const TopicListItem = ({onClick,topic}) =>(
    <ListItem button onClick={onClick}>
        <ListItemAvatar>
            <Avatar src={topic.author.avatar_url}/>
        </ListItemAvatar>
        <ListItemText 
            primary={<StyledPrimary topic={topic}/>} 
            secondary={<StyledSecondary topic={topic}/>}/>
    </ListItem>
)

export default TopicListItem;