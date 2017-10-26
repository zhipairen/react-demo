/**
 * 父组件 CommentApp 只需要通过 props 给子组件 CommentInput 传入一个回调函数。
 * 当用户点击发布按钮的时候，CommentInput 调用 props 中的回调函数并且将 state 传入该函数即可。
 */
import React, { Component, PropTypes } from 'react'
import wrapWithLoadData from '../components/HigherComponent'
class CommentInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    data: PropTypes.any,
    saveData: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      userName: props.userName || '',
      content: '',
    }
  }
  //  componentWillMount(){
  //   console.log(`容器类组件:`,this.props.children)
  //   this._getLocalUsername();//挂载前从本地获取用户名
  // }
  componentDidMount() {
    this.textarea.focus()
  }
  // _saveUsername(username){
  //   localStorage.setItem('userName',username)
  // }
  // _getLocalUsername(){
  //   let userName = localStorage.getItem('userName')
  //   if(userName){
  //     this.setState({userName})
  //   }
  // }
  handleUserNameChange(e) {
    this.setState({
      userName: e.target.value
    })
  }
  handleContentChange(e) {


    
    this.setState({
      content: e.target.value
    })
  }
  handleUserNameBlur(e) {
    // this._saveUsername(e.target.value)
    this.props.saveData(e.target.value)
  }
  handleSubmit() {
    if (this.props.onSubmit) {
      const { userName, content } = this.state
      this.props.onSubmit({ userName, content, createdTime: +new Date() })
    }
    this.setState({ content: '' })
  }

  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name' style={{ color: this.props.color }}>用户名：</span>
          <div className='comment-field-input'>
            <input value={this.state.userName} onBlur={this.handleUserNameBlur.bind(this)} onChange={this.handleUserNameChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field'>
          {this.props.children}
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea ref={(textarea) => this.textarea = textarea} value={this.state.content} onChange={this.handleContentChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}
CommentInput = wrapWithLoadData(CommentInput, 'userName')
export default CommentInput