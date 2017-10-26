/**
 * setState接受对象参数或函数参数，调用setState时，react并不会
 * 马上修改state,而是把这个对象放到一个更新队列里面，
 * 稍后才会从队列当中把新的状态提取出来合并到 state 当中，
 * 然后再触发组件更新。
 * 如果接受函数参数，可以使用该结果进行运算操作，再返回一个对象更新state
 */
 handleClickOnLikeButton () {
    this.setState({ count: 0 }) // => this.state.count 还是 undefined
    this.setState({ count: this.state.count + 1}) // => undefined + 1 = NaN
    this.setState({ count: this.state.count + 2}) // => NaN + 2 = NaN
  }

  handleClickOnLikeButton2 () {
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    // 最后的结果是 this.state.count 为 3
  }