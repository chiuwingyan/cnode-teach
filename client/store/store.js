import AppStateClass from './App-state'

export const AppState = AppStateClass

export default {
    AppState,
}


//此函数专门用于SSR，
export const createStoreMap = () => {
    return {
        appState: new AppState(),
    }
}
