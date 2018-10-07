import React from 'react'

import {withStyles} from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import  Button  from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/ToolBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home'
import ButtonBase from '@material-ui/core/ButtonBase';
import { withRouter } from "react-router-dom"
const styles = {
    root:{
        width:'100%'
    },
    flex:{
        flex:1
    },
    btn:{
        marginRight:'10px'
    }
}

import {
    observer,
    inject,
} from 'mobx-react'

@inject(stores => {
    return {
        appState: stores.appState,         //stores是一个对象，包括我们在Provider传的所有值
    }
}) @observer
class MainAppBar extends React.Component{
    _createTopic(){
        console.log('topoic')
    }
    _login(){
        console.log('login')
    }
    createButtonClick(){
        // if (!this.props.appState.user.isLogin) {
        //     return
        // }
        this.props.history.push('/topic/create')        
    }
    loginButtonClick(){
        if(this.props.appState.user.isLogin){
            return
        }
        this.props.history.push('/user/login')
    }
    _toHome(){
        this.props.history.push('/list?tab=all')
    }
    render(){
        const { classes } = this.props
        const { user } = this.props.appState
        return(
            <div className={classes.root}>
                <AppBar position="fixed" title="Hello, Material-UI!">
                <ToolBar>
               <IconButton onClick={() => this._toHome()}>
                    <HomeIcon/>
                </IconButton> 
                <Typography  color="inherit" className={classes.flex}>
                    MyNode
                </Typography>
                        {/* <ButtonBase>test</ButtonBase> */}
                        <Button color="primary" variant="contained" className={classes.btn} onClick={() => this.createButtonClick()}>新建话题</Button>
                        <Button color="primary" variant="contained" onClick={() => this.loginButtonClick()}>
                        {
                                user.isLogin ? user.info.loginname : '登录'
                        }
                        </Button>
                {/* <button>
                    新建话题
                </button>
                <button>
                    登录
                </button>  */}
                </ToolBar>
                </AppBar>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(MainAppBar));