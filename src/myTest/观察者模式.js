//利用观察者模式，监控数据变化
/* 
*创建一个状态库
*@param state 初始状态(可选参数)
* reduce 纯函数( 只需要初始化和计算新的state)，不能有任何dom,ajax
*/
function createStore(reduce) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = reduce(state, action) //覆盖原对象
        listeners.forEach(listener => listener())
    }
    dispatch({}) //初始化 state
    return { getState, dispatch, subscribe }
}
function reduce (state, action){
    if (!state) return {
    themeName: 'Red Theme',
    themeColor: 'red'
  }
  switch (action.type) {
    case 'UPATE_THEME_NAME':
      return { ...state, themeName: action.themeName }
    case 'UPATE_THEME_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}
/* 
* 练习写一个 观察者模式
* EventEmitter 模块
* on(eventName, func)：监听 eventName 事件，事件触发的时候调用 func 函数。
* emit(eventName, arg1, arg2, arg3...)：触发 eventName 事件，并且把参数 arg1, arg2, arg3... 传给事件处理函数。
* off(eventName, func)：停止监听某个事件。
* 核心：将事件存放在对象里，并将该事件的回调函数存放在数组里，作为 event[eventName] = [func1, func2,...]
*/
class EventEmitter {
    constructor() {
        this.events = {}
    }
    on(eventName, func) {
        const callbacks = this.events[eventName] || []
        callbacks.push(func)
        this.events[eventName] = callbacks
    }
    emit(eventName, ...args) {
        if (!this.events[eventName]) return
        const funcArr = this.events[eventName]
        funcArr.map(func => func(...args))
    }
    off(eventName, func) {
        if (!this.events[eventName]) return
        const funcArr = this.events[eventName]
        const index = funcArr.indexOf(func)
        if (index !== -1) {
            funcArr.splice(index, 1)
        }
    }
}
// 共享结构对象(浅复制，不修改原对象，还可以覆盖、拓展对象属性，新建一个新对象)
const newObj = {
    ...oldObj,
    key: value
}
// redux 套路
// 定一个 reducer
function reducer (state, action) {
  /* 初始化 state 和 switch case */
}

// 生成 store
const store = createStore(reducer)

// 监听数据变化重新渲染页面
store.subscribe(() => renderApp(store.getState()))

// 首次渲染页面
renderApp(store.getState()) 

// 后面可以随意 dispatch 了，页面自动更新
store.dispatch(...)