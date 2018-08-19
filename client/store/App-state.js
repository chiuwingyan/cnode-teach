import {
    observable,
    computed,
    autorun,
    action,
} from 'mobx'

class AppState {
    @observable count = 0       
    @observable name = 'bb'
    @computed get msg(){
        return `${this.name} say count is ${this.count}`
    }
    @action add() {
        this.count += 1
    }
}

const appState = new AppState()

autorun(() => {
    console.log(appState.msg)
})



export default appState