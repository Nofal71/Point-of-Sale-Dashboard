import React from 'react'
import { persistor, store } from '../Store/Store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const StoreProvider = ({ childeren }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {childeren}
            </PersistGate>
        </Provider>
    )
}

export default StoreProvider
