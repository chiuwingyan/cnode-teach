import React,{PureComponent} from 'react';
import Helmet from 'react-helmet';
import Container from './../layout/container';
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

    }

    render(){
        const {
            classes,
        } = this.props
        const topic = this.props.topicStore.topics[0]
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

export default withStyles(topicDetailStyle)(TopicDetail)