import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import queryString from 'query-string'
import UserWrapper from './user'
import loginStyles from './styles/login-style'

import { withRouter, Redirect } from "react-router-dom"
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
class UserLogin extends React.Component {
    constructor(){
        super()
        this.state = {
            accesstoken:'',
            helpText:''
        }
    }

    getFrom(location) {
        location = location || this.props.location
        const query = queryString.parse(location.search)
        return query.from || '/user/info'
    }

    componentWillMount(){
        if(this.props.user.isLogin){
            this.props.history.replace('/user/info');
        }
    }
    handleInput(event){  
        this.setState({
            accesstoken:event.target.value.trim(),
        })
    }
    handleLogin(){
        if (!this.state.accesstoken){
            return this.setState({
                helpText:'必须填写'
            })
        }
        this.setState({
            helpText:''
        })
        return this.props.appState.login(this.state.accesstoken).catch((error) => {
                console.log(error)
            })
    }
    render(){
        const {classes} = this.props;
        const from = this.getFrom()
        const {isLogin} = this.props.user

        if (isLogin && this.props.user.info.loginname){
            return <Redirect to={from} />
        }

        return (
            <UserWrapper>
                <div className={classes.root}>
                    <TextField
                    label="请输入Cnode AccessToken"
                    placeholder="请输入Cnode AccessToken"
                    required
                    helperText={this.state.helpText}
                    value={this.state.accesstoken}
                    onChange={(e) => this.handleInput(e)}
                    className={classes.input}/>
                    <Button 
                        reised="true"
                        variant="contained" color="secondary"
                        onClick={() => this.handleLogin()}
                        className={classes.loginButton}>
                        登录
                    </Button>
                </div>
            </UserWrapper>
        )
    }
}

export default withRouter(withStyles(loginStyles)(UserLogin))