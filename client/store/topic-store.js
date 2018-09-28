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
    @observable topics
    @observable details
    @observable syncing

    constructor({ syncing = false, topics = [], details = [] } ={}) {
        this.syncing = syncing
        this.topics = topics.map(topic => new Topic(topic))
        this.details = details.map(topic => new Topic(topic))
    }

    addTopic(topic){
        this.topics.push(new Topic(topic))
    }

    @computed get detailMap(){
        return this.details.reduce((result,detail) => {
            result[detail.id] = detail
            return result
        },{})
    }
    //获取话题列表
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

    //获取话题详情
    @action getTopicDetail(id){
        return new Promise((resolve,reject) => {
            if(this.detailMap[id]){
              resolve(this.detailMap[id])  
            }else{
                get(`/api/topic/${id}`,{
                    mdrender:false
                }).then(resp => {
                    if(resp.success){
                        const topic = new Topic(resp.data)
                        this.details.push(topic)
                        resolve(topic)
                    }else{
                        reject()
                    }
                }).catch(reject)
            }
        })
    }

    toJson() {
        return {
            syncing: this.syncing,
            topics: this.topics
        }
    }
}