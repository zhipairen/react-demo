import React, { Component, PropTypes } from 'react'

import Header from 'Header'
import Content from 'Content'
import 'index.css'

//創建一個store庫
// function createStore(reducer) {
//     let state = null
//     const listeners = []
//     const subscribe = (listener) => listeners.push(listener)
//     const getState = () => state
//     const dispatch = (action) => {
//         state = reducer(state, action)
//         listeners.forEach((listener) => listener())
//     }
//     dispatch({}) // 初始化 state
//     return { getState, dispatch, subscribe }
// }

// const themeReducer = (state, action) => {
//     if (!state) return {
//         themeColor: 'red'
//     }
//     switch (action.type) {
//         case 'CHANGE_COLOR':
//             return { ...state, themeColor: action.themeColor }
//         default:
//             return state
//     }
// }


class ReduxIndex extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}
export default ReduxIndex