import React,{PureComponent} from 'react';
import Helmet from 'react-helmet';
import Container from './../layout/container';
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import marked from 'marked';
import SimpleMDE from 'react-simplemde-editor';
import Paper from '@material-ui/core/Paper'
import Reply from './reply';
import IconReply from '@material-ui/icons/Reply'
import { topicDetailStyle } from './style';
import { withStyles } from '@material-ui/core/styles'
import {
    observer,
    inject,
} from 'mobx-react'

@inject(stores => {
    return {
        appState: stores.appState,         //stores是一个对象，包括我们在Provider传的所有值
        topicStore: stores.TopicStore,
        user:stores.appState.user,
    }
}) @observer
class TopicDetail extends React.Component{
    constructor(){
        super();
        this.state={
            newReply:''
        }
    }
    componentDidMount(){
       const id = this._getId();
        this.props.topicStore.getTopicDetail(id);
    }
    // bootstrap(){
    //     const id = this._getId();
    //     return this.props.topicStore.getTopicDetail(id).then(() => {
    //         return true
    //     }).catch(() => {
    //         return false
    //     });
    // }
    _getId(){
        return this.props.match.params.id;
    }
    _gotoLogin(){
        this.props.history.push('/user/login');
    }
    handleNewReplyChange = (value) => {
        this.setState({
            newReply:value
        })
    }
    _gotoReply(){
        const topic = this.props.topicStore.detailMap[this._getId()]
        topic.doReply(this.state.newReply)
        .then(() => {
            this.setState({
                newReply:''
            })
        }).catch((err) =>{
            console.log(err)
        })
    }
    render(){
        const {
            classes,
            user
        } = this.props
        const topic = this.props.topicStore.detailMap[this._getId()]
        console.log('props', this.props)
        if(!topic){
            return(
                <Container>
                    <section className={classes.loadingContainer}>
                        <CircularProgress />
                    </section>
                    </Container>
            )
        }else{
            return (
                <div>
                    <Container>
                        <Helmet>
                            <title>{topic.title}</title>
                        </Helmet>
                        <header className={classes.header}>
                            <h3>{topic.title}</h3>
                        </header>
                        <section className={classes.body}>
                            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
                        </section>
                    </Container>
                    {   
                        topic.createReplies && topic.createReplies.length > 0 ?
                        (
                            <Paper elevation={4} className={classes.replies}>
                            <header className={classes.replyHeader}>
                                <span>我的最新回复</span>
                                <span>{`${topic.createReplies.length}条`}</span>
                            </header>
                            {
                                topic.createReplies.map((reply) => (
                                    <Reply 
                                    reply={Object.assign({},reply,{
                                        author:{
                                            avatar_url:user.info.avatar_url,
                                            loginname:user.info.loginname
                                        }
                                    })} key={reply.id}/>
                                ))
                            }
                                </Paper>
                        ):null
                    }
                    <Paper elevation={4} className={classes.replies}>
                        <header className={classes.replyHeader}>
                            <span>{`${topic.reply_count} 回复`}</span>
                            <span>{`最新回复 ${topic.last_reply_at}`}</span>
                        </header>
                            {
                                user.isLogin ? 
                                <section className={classes.replyEditor}>
                                    <SimpleMDE
                                    onChange={this.handleNewReplyChange}
                                    value={this.state.newReply}
                                    options={{
                                        toolbar:false,
                                        autoFocus:false,
                                        spellChecker:false,
                                        placeholder:'添加您的精彩回复',
                                    }}
                                    />
                                    <Button reised="true"
                                        variant="contained" color="secondary"
                                        className={classes.replyButton} 
                                        onClick={() => this._gotoReply()}>
                                        <IconReply />
                                        </Button>
                                </section>:null
                            }
                            {
                                !user.isLogin &&
                                <section className={classes.notLoginButton}>
                                    <Button
                                    reised="true"
                                    variant="contained" color="secondary"
                                    onClick={() => this._gotoLogin()}>
                                        登录并进行回复
                                    </Button>
                                </section>
                            }
                        <section>
                            {
                                topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
                            }
                        </section>
                    </Paper>
                </div>
            )
        }
        
    }
}

export default withStyles(topicDetailStyle)(TopicDetail)