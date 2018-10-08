import {
    observable,
    computed,
    toJS,
    action,
    extendObservable
} from 'mobx'
import {get,post} from '../util/fetch'
class Topic{    //这个类用于保存topic或者detail的每一项，每一项封装成topic这样的对象，每一个属性都是observe的
    constructor(data){
        extendObservable(this, data)    //其实也是把该值的所有属性变成该实例下的observe,extendObservable来扩展对象
    }
    @observable syncing = false
    @observable createReplies = []    //保存每一个文章详情对象的我的回复的内容
    @action doReply(content){       //回复操作，获取文章详情ID，直接this.id即可，因为每一项都是文章详情的实例
        return new Promise((resolve,reject) => {
            post(`/api/topic/${this.id}/replies?needAccessToken=true`,{
                content
            })
            .then((resp) => {
                if(resp.success){
                    this.createReplies.push({
                        id: resp.reply_id,
                        content,
                        create_at:Date.now(),
                    })
                    resolve()
                }else{
                    reject(resp)
                }

            }).catch(reject)
        })
    }
}

export default class TopicStore {
    @observable topics
    @observable details
    @observable syncing
    @observable createTopics = []       //我创建的话题
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
      //console.log('tab',tab)
        return new Promise((resolve,reject) => {
           // console.log('syncing', this.syncing)
            this.syncing = true
            this.topics= []
            get('https://cnodejs.org/api/v1/topics',{
                mdrender:false,
                tab:tab
            }).then(resp => {
               // console.log('resp',resp)
                if(resp.success){
                    resp.data.forEach(topic => {
                     //   console.log('topic',topic)
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
                get(`https://cnodejs.org/api/v1/topic/${id}`,{
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

    //创建话题
    @action createTopic(title,tab,content){
        return new Promise((resolve,reject) => {
            post('/api/topics?needAccessToken=true',{
                title,tab,content
            }).then((resp)=>{
                if(resp.success){
                    const topic = {
                        title,
                        tab,
                        content,
                        id:resp.topic_id,
                        create_at:Date.now(),
                    }
                    this.createTopics.push(new Topic(topic))
                    resolve()
                }else{
                    reject()
                }
            }).catch(reject)
        })
    }

    toJson() {
        return {
            syncing: this.syncing,
            topics: toJS(this.topics),
            details:toJS(this.details)
        }
    }
}