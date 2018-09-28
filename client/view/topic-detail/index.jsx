import React,{PureComponent} from 'react';
import Helmet from 'react-helmet';
import Container from './../layout/container';
import CircularProgress from '@material-ui/core/CircularProgress'
import marked from 'marked';
import Paper from '@material-ui/core/Paper'
import { topicDetailStyle } from './style';
import { withStyles } from '@material-ui/core/styles'
import {
    observer,
    inject,
} from 'mobx-react'

@inject(stores => {
    return {
        appState: stores.appState,         //stores是一个对象，包括我们在Provider传的所有值
        topicStore: stores.TopicStore
    }
}) @observer
class TopicDetail extends React.Component{
    componentDidMount(){
       const id = this._getId();
        this.props.topicStore.getTopicDetail(id);
    }
    _getId(){
        return this.props.match.params.id;
    }
    render(){
        const {
            classes,
        } = this.props
        const topic = this.props.topicStore.detailMap[this._getId()]
        if(!topic){
            return(
                <Container>
                    <section className={classes.loadingContainer}>
                        <CircularProgress color="accent"/>
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
                    <Paper elevation={4} className={classes.replies}>
                        <header className={classes.replyHeader}>
                            <span>{`${topic.reply_count} 回复`}</span>
                            <span>{`最新回复 ${topic.last_reply_at}`}</span>
                        </header>
                        <section>
                            {
                                // topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
                            }
                        </section>
                    </Paper>
                </div>
            )
        }
        
    }
}

export default withStyles(topicDetailStyle)(TopicDetail)