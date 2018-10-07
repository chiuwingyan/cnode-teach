import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import {withStyles} from '@material-ui/core/styles'

import UserIcon from '@material-ui/icons/AccountCircle'

import Container from '../layout/container';
import userStyles from './styles/user-style'

import {
    observer,
    inject,
} from 'mobx-react'

@inject(stores => {
    return {
        appState: stores.appState,         //stores是一个对象，包括我们在Provider传的所有值
        user: stores.appState.user,
    }
}) @observer
class User extends React.Component{
    // constructor(props){
    // //    super()
    // //     console.log('props',props)
    // }
    render(){
        const { classes } = this.props
        const {
            isLogin,
            info
        }= this.props.user
        return(
            <Container>
                <div className={classes.avatar}>
                <div className={classes.bg} />
                {
                    info.avatar_url?
                    <Avatar className={classes.avatarImg} src={info.avatar_url} />:
                    <Avatar className={classes.avatarImg}>
                        <UserIcon />
                    </Avatar>
                }
                <span className={classes.userName}>{info.loginname || '未登录'}</span>
                </div>
                    {this.props.children}
                </Container>
        )
    }
}

export default withStyles(userStyles)(User)