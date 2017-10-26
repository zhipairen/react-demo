/**
 * redux的reducer练习.
 */
import { combineReducer } from 'redux';
// combineReducers的简单实现
const combineReducers = reducers => {
  return (state = {}, action) =>{
    return Object.keys(reducers).reduce(
        (nextState, key) => {
          nextState[key] = reducers[key](state[key], action);
          return nextState;
        },
        {}
    );
  }
};
// eg1:典型基本结构
const initialState = {
  visibilityFilter: 'SHOW_ALL',
  todos: []
};
function counter(state = 1, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
//eg2: 提取工具函数(Extracting Utility Functions)
function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);//复制生成新state,es7解构 return {...oldObject,...newValues}
}
function updateItemArray(array, itemId, updateCallbackFun) {
  const updateItems = array.map(item => {
    if (item.id !== itemId) {
      return item
    }
     return updateCallbackFun(item)
  });
  return updateItems
}
//以上为两个提取出来的可重用的工具函数
function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_VISIBILITY': {
      return updateObject(state, { visibilityFilter: action.filter })
    }
    case 'ADD_TODO': {
      const newTodos = state.todos.concat({
        id: action.id,
        text: action.text,
        completed: false
      });
      return updateObject(state, { todos: newTodos })
    }
    case 'TOGGLE_TODO': {
      //处理数组id与选中action.id的匹配情况,修改匹配成功的状态
      const newTodos = updateItemArray(state.todos, action.id, todo => {
        return updateObject(todo, { completed: !todo.completed })
      });
      return updateObject(state, { todos: newTodos })
    }
    case 'EDIT_TODO': {
      const newTodos = updateItemArray(state, todos, action.id, todo => {
        return updateObject(todo, { text: action.text })
      });
      return updateObject(state, { todos: newTodos })
    }
    default:
      return state
  }
}
//eg3: 以切片组合reducer重新简化eg2
/*
* 处理switch case 减少样板代码
*/
function createReducer(initialState, handlers) {

}