import React from 'react'

import {withStyles} from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import  Button  from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/ToolBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home'
import ButtonBase from '@material-ui/core/ButtonBase';

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
class MainAppBar extends React.Component{
    _createTopic(){
        console.log('topoic')
    }
    _login(){
        console.log('login')
    }
    render(){
        const { classes } = this.props
        return(
            <div className={classes.root}>
                <AppBar position="fixed" title="Hello, Material-UI!">
                <ToolBar>
               {/* <IconButton > */}
                    <HomeIcon />
                {/* </IconButton>  */}
                <Typography  color="inherit" className={classes.flex}>
                    MyNode
                </Typography>
                        {/* <ButtonBase>test</ButtonBase> */}
                        <Button color="primary" variant="contained" className={classes.btn}>新建话题</Button>
                        <Button color="primary" variant="contained">登录</Button>
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

export default withStyles(styles) (MainAppBar);