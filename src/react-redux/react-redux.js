/* Dumb 基本只做一件事情 —— 根据 props 进行渲染。
而 Smart 则是负责应用的逻辑、数据，把所有相关的 Dumb（Smart）组件组合起来，
通过 props 控制它们。
Smart 组件可以使用 Smart、Dumb 组件；
而 Dumb 组件最好只使用 Dumb 组件，否则它的复用性就会丧失。
Smart 和 Dumb 都可以复用，只是程度、场景不一样。
 */

// 把组件中的重复代码，提取到高级组件中
import React, { Component, PropTypes } from 'react'

function createStore(reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    dispatch({}) // 初始化 state
    return { getState, dispatch, subscribe }
}
// provider 提供store,将其存放在context中，供子组件共享
export class Provider extends Component {
    static  propTypes = {
        store: PropTypes.object,
        children: PropTypes.any
    }
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext(){
        return { store: this.props.store}
    }
    render(){
        return (
            <div>{this.props.children }</div>
        )
    }
}
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }
        constructor() {
            super()
            this.state = { allProps: {} }
        }
        componentWillMount() {
            const { store } = this.context
            this._updateProps()
            store.subscribe(() => this._updateProps())
        }
        _updateProps() {
            const { store } = this.context
            let stateProps = mapStateToProps
                ? mapStateToProps(store.getState(), this.props) : {} // 额外传入 props，让获取数据更加灵活方便
            let dispatchProps = mapDispatchToProps
                ? mapDispatchToProps(store.dispatch, this.props) : {}
            this.setSate({
                allProps: {// 整合普通的 props 和从 state 生成的 props
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }
        render() {
            return <WrappedComponent {...this.state.allProps} />

        }
    }
    return Connect
}

export default function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
  //获取funcs数组的最后一个方法
    const last = funcs[funcs.length - 1]
    //这里将funcs数组从头到倒数第二个重新放到了一个新的数组里，倒数第一个已经在上面被拿出来了
    const rest = funcs.slice(0, -1)
    //点睛之笔来了：
    //这里对rest数组进行了一次从右到左的数组包裹：
    //该函数在源码中的注释中给了一个简洁的表达：compose(f, g, h) is identical to doing * (...args) => f(g(h(...args))).
    return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
  }
  compose(m, g, h)
 f(g(h(...arges)))