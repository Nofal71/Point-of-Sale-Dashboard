import React from 'react'
import { store } from '../Store/Store'
import { Provider } from 'react-redux'

const StoreProvider = ({ childeren }) => {
    return (
        <Provider store={store}>
            {childeren}
        </Provider>
    )
}

export default StoreProvider
