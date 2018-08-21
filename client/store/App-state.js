import {
    observable,
    computed,
    autorun,
    action,
} from 'mobx'

export default class AppState {
    constructor({count,name} = {count:0,name:'bb'}){
        this.count=count
        this.name=name
    }
    @observable count       
    @observable name 
    @computed get msg(){
        return `${this.name} say count is ${this.count}`
    }
    @action add() {
        this.count += 1
    }
    @action changeName(name){
        this.name = name
    }

    //此方法用于ssr服务端渲染时调用，获取当前服务端渲染时的store状态，注入到客户端，使得服务端和客户端的store可以同步
    toJson(){
        return {
            count:this.count,
            name:this.name
        }
    }

}

