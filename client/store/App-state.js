import {
    observable,
    computed,
    autorun,
    toJS,
    action,
} from 'mobx'
import login from '../view/user/login';
import { post,get } from '../util/fetch'
export default class AppState {
    @observable user = {
        isLogin:false,
        info:{},
        detail:{
            recentTopics:[],
            recentReplies:[],
            syncing:false,
        },
        collections:{
            list:[],
            syncing:false,
        }
    }
    // @observable count = 0
    init({user}){
        if(user){
            this.user.isLogin = user.isLogin
            this.user.info = user.info
        }
    }
    @action login(accessToken){
       
        return new Promise((resolve,reject) => {
            post('/api/user/login',{
                accessToken
            }).then((resp) => {
                if (resp.success){
                    this.user.isLogin = true
                    this.user.info = resp.data
                    resolve()
                }else{
                    reject(resp)
                }
            }).catch(reject)
        })
    }
    @action getUserDetail(){
        console.log('loginname', this.user.info)
        this.user.detail.syncing = true;
        return new Promise((resolve,reject) => {
            get(`/api/user/${this.user.info.loginname}`)
            .then((resp) => {
                if(resp.success){
                    this.user.detail.recentTopics = resp.data.recent_topics
                    this.user.detail.recentReplies = resp.data.recent_replies
                    resolve()
                }else{
                    reject()
                }
                this.user.detail.syncing = false
            }).catch((err) => {
                this.user.detail.syncing = false
                reject(err)
            })
        })
    }
    @action getUserCollection() {
        this.user.collections.syncing = true;
        return new Promise((resolve, reject) => {
            get(`/api/topic_collect/${this.user.info.loginname}`)
                .then((resp) => {
                    if (resp.success) {
                        this.user.collections.list = resp.data
                        resolve()
                    } else {
                        reject()
                    }
                    this.user.collections.syncing = false
                }).catch((err) => {
                    this.user.collections.syncing = false
                    reject(err)
                })
        })
    }
    toJson(){
        return{
            user: toJS(this.user)
        }
    }

}

