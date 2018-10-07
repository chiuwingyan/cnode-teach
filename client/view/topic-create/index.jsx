import React from 'react'
import SimpleMDE from 'react-simplemde-editor'

import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import IconReply from '@material-ui/icons/Reply'
import SnackBar from '@material-ui/core/Snackbar'
import {withStyles } from '@material-ui/core/styles'
import { withRouter } from "react-router-dom"

import Container from '../layout/container'
import createStyles from './styles'
import {tabs} from '../../util/variable-define'
import {
    observer,
    inject,
} from 'mobx-react'

@inject(stores => {
    return {
        topicStore: stores.TopicStore,
    }
}) @observer
class TopicCreate extends React.Component {
    constructor(){
        super()
        this.state={
            title:'',
            content:'',
            tab:'dev',
            message:'',
            open:false
        }
    }

    handleTitleChange(e){
        this.setState({
            title:e.target.value
        })
    }
    handleChangeTab(e){
        this.setState({
            tab:e.currentTarget.value
        })
    }
    handleContentChange = (value) => {
        this.setState({
            content:value
        })
    }
    handleClose = () => {
        this.setState({
            open:false
        })
    }
    hadleCreate(){
        const {
            tab,title,content
        } = this.state
        if(!title){
            this.showMessage('title必须填写')
            return
        }
        if(!content){
            this.showMessage('内容必须填写')
            return
        }
        return this.props.topicStore.createTopic(title,tab,content)
        .then(() => {
            this.props.history.push('/list?tab=all');
        })
        .catch((err) => {
            this.showMessage(err.message)
        })
    }
    showMessage(message){
        this.setState({
            open:true,
            message,
        })
    }
    render(){
        const { classes } = this.props
        const {message,open} = this.state
        return(
            <Container>
                <SnackBar 
                anchorOrigin={{
                    vertical:'top',
                    horizontal:'center'
                }}
                message={message}
                open={open}
                onRequestClose={this.handleClose}
                />
                <div className={classes.root}>
                    <TextField
                    className={classes.title}
                    label="标题"
                    value={this.state.title}
                        onChange={(e) => this.handleTitleChange(e)}
                        fullWidth/>
                    
                <SimpleMDE
                    onChange={this.handleContentChange}
                    value={this.state.content}
                    option={{
                        toolbar:false,
                        spellChecker:false,
                        placeholder:'发表你的精彩意见'
                    }}/>
                    <div>
                        {
                            Object.keys(tabs).map((tab) => {
                                if(tab !== 'all' && tab !== 'good'){
                                    return(
                                        <span className={classes.selectItem} key={tab}>
                                            <Radio
                                            value={tab}
                                            checked={tab === this.state.tab}
                                                onChange={(e) => this.handleChangeTab(e)}/>
                                                {tabs[tab]}
                                        </span>
                                    )
                                }
                            })
                        }
                    </div>
                    <Button fab='true' color="primary" onClick={() => this.hadleCreate()} className={classes.replyButton}>
                        <IconReply />
                        </Button>
                </div>
                </Container>
        )
    }
}

export default withRouter(withStyles(createStyles)(TopicCreate))