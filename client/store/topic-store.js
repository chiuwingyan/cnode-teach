import {
    observable,
    computed,
    toJS,
    action,
    extendObservable
} from 'mobx'
import {get} from '../util/fetch'
class Topic{
    constructor(data){
        extendObservable(this, data)    //其实也是把该值变成该实例下的observe,extendObservable来扩展对象
    }
    @observable syncing = false
}

export default class TopicStore {
    constructor({ syncing, topics } = { syncing: false, topics: [] }) {
        this.syncing = syncing
        this.topics = topics.map(topic => new Topic(topic))
    }
    @observable topics
    @observable syncing
    addTopic(topic){
        this.topics.push(new Topic(topic))
    }
    @action fetchTopics(tab){
        return new Promise((resolve,reject) => {
            this.syncing = true
            this.topics= []
            get('/api/topics',{
                mdrender:false,
                tab:tab
            }).then(resp => {
                if(resp.success){
                    resp.data.forEach(topic => {
                        this.addTopic(topic)
                    })
                    resolve()
                }else{
                    reject()
                }
            }).catch(err => {
                reject(err)
                this.syncing = false
            })
        })
    }
    toJson() {
        return {
            syncing: this.syncing,
            topics: this.topics
        }
    }
}