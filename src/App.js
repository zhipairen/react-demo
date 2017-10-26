import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// 头部引入 Provider
import { Provider } from './react-redux/react-redux'
import CommentApp from './containers/CommentApp'
import commentsReducer from './reducers/comments'
import ReduxIndex from './react-redux/index'

const store = createStore(commentsReducer)
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello React,welcome to you</h2>
        </div>
        <div>
          <p>评论功能:</p>
          <Provider store={store}>
            <CommentApp />
          </Provider>
        </div>
        <div>
          <p>react-redux練習:</p>
          <Provider store={store}>
            <ReduxIndex />
          </Provider>
        </div>
      </div>
    );
  }
}

export default App;


