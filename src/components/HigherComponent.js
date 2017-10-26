/**
 * 高阶组件就是一个函数，传给它一个组件，它返回一个新的组件。新的组件使用传入的组件作为子组件。
 * 高阶组件的作用是用于代码复用，可以把组件之间可复用的代码、逻辑抽离到高阶组件当中。
 * 新的组件和传入的组件通过 props 传递信息。
 */
import React, { Component } from 'react'

export default (WrappedComponent, name) => {
    class NewComponent extends Component {
        constructor() {
            super()
            this.state = { data: null }
        }
        componentWillMount() {
            let { data } = localStorage.getItem(name)
            try {
                this.setState({ data: JSON.parse(data) })
            } catch (error) {
                this.setState({ data })
            }
        }
        saveData(data) {
            try {
                // 尝试把它解析成 JSON 字符串
                localStorage.setItem(name, JSON.stringify(data))
            } catch (e) {
                // 如果出错了就当普通字符串保存
                localStorage.setItem(name, `${data}`)
            }
        }
        render() {
            return <WrappedComponent data={this.state.data} 
            saveData={this.saveData.bind(this)}
            // 这里是把其他的参数原封不动地传递给被包装的组件
            {...this.props}/>
        }
    }
    return NewComponent
}