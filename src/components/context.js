/**
 * 共享属性 context(危险)，所以一般利用第三方库redux来管理共享状态
 * 一个组件可以通过 getChildContext 方法返回一个对象，这个对象就是子树的 context，
 * 提供 context 的组件必须提供 childContextTypes 作为 context 的声明和验证。

 * 如果一个组件设置了 context，那么它的子组件都可以直接访问到里面的内容，
 * 它就像这个组件为根的子树的全局变量。任意深度的子组件都可以通过 contextTypes 来声明你想要的 context 里面的哪些状态，
 * 然后可以通过 this.context 访问到那些状态。

 * context 打破了组件和组件之间通过 props 传递数据的规范，极大地增强了组件之间的耦合性。
 * 而且，就如全局变量一样，context 里面的数据能被随意接触就能被随意修改，
 * 每个组件都能够改 context 里面的内容会导致程序的运行不可预料。
 */
import React, { Component } from 'react'

class Index extends Component {
    static childContextTypes = {
        themeColor: PropTypes.string
    }

    constructor() {
        super()
        this.state = { themeColor: 'red' }
    }

    getChildContext() {
        return { themeColor: this.state.themeColor }
    }

    render() {
        return (
            <div>
            react 中的 context属性
            </div>
        )
    }
}