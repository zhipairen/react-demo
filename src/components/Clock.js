/**
 * 定时器组件(每秒都刷新时间)
 * 生命周期的重点：一、挂载阶段一般会把组件的 state 的初始化工作放在 constructor 里面去做；
 * 在 componentWillMount 进行组件的启动工作，例如 Ajax 数据拉取、定时器的启动；
 * 组件从页面上销毁的时候，有时候需要一些数据的清理，例如定时器的清理，就会放在 componentWillUnmount 里面去做；
 * 有些组件的启动工作是依赖 DOM 的，例如动画的启动，就放在componentDidMount
 * 二、更新阶段:
 * shouldComponentUpdate(nextProps, nextState)：你可以通过这个方法控制组件是否重新渲染。如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
 * componentWillReceiveProps(nextProps)：组件从父组件接收到新的 props 之前调用。
 * componentWillUpdate()：组件开始重新渲染之前调用。
 * componentDidUpdate()：组件重新渲染并且把更改变更到真实的 DOM 以后调用。
 */

 /**
  * 用ref属性沟通dom(能不用ref就不用)
  * ref的属性值为函数，可在componentDidMount操作dom
  */

 /**
  * 使用自定义组件的时候，可以在其中嵌套 JSX 结构。
  * 嵌套的结构在组件内部都可以通过 props.children 获取到.
  */
import React, { Component } from 'react'

class Clock extends Component {
    constructor() {
        super()
        this.state = {
            date: new Date()
        }
    }

    componentWillMount() {
        this.timer = setInterval(() => {
            this.setState({ date: new Date() })
        }, 1000)
    }
    componentDidMount(){
        this.input.focus()
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        return (
            <div>
                <h1>
                    <p>现在的时间是:{this.state.date.toLocaleTimeString()}</p>
                </h1>
                  <input ref={(input) => this.input = input} />
            </div>
        )
    }
}
export default Clock