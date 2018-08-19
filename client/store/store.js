import AppStateClass from './app-state'

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
