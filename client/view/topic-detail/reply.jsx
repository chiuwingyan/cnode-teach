import React from 'react'
import marked from 'marked'

import Avatar from '@material-ui/core/Avatar'
import dateFormat from 'dateformat'
import { withStyles } from '@material-ui/core/styles'

import {replyStyle} from './style'

const Reply =({reply,classes}) => {
    return(
        <div className={classes.root}>
            <div className={classes.left}>
                <Avatar src={reply.author.avatar_url} />
            </div>
            <div className={classes.right}>
                <span>{`${reply.author.loginname} ${dateFormat(reply.create_at,'yy-mm-dd')}`}</span>
                <p dangerouslySetInnerHTML={{__html:marked(reply.content)}}></p>
            </div>
        </div>
    )
}

export default withStyles(replyStyle)(Reply)