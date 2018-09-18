import AppState from './App-state'
import TopicStore from './topic-store'

export {
    AppState,
    TopicStore,
}
export default {
    AppState,
    TopicStore,

}


//此函数专门用于SSR，
export const createStoreMap = () => {
    return {
        appState: new AppState(),
        TopicStore: new TopicStore()
    }
}
