import React,{ Component, PropTypes } from 'react'

export default class ComponentInput extends Component{
    static propTypes = {
        userName: PropTypes.any,
        onSubmit: PropTypes.func,
        OnUserNameInputBlur: PropTypes.func
    }
    static defaultProps = {
        userName: ''
    }
    constructor(props){
        super(props)
        this.state = {
            userName: props.userName,
            content: ''
        }
    }
    componentDidMount(){
        this.textarea.focus()
    }
    handleUserNameBlur (event){
        if(this.props.OnUserNameInputBlur){
            this.props.OnUserNameInputBlur(event.target.value)
        }
    }
    handleUserNameChange(event){
        this.setState({
            userName: event.target.value
        })
    }
    handleContentChange(event){
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit(){
        if(this.props.onSubmit){
            this.props.onSubmit({
                userName: this.state.userName,
                content: this.state.content,
                createdTime: +new Date()
            })
        }
        this.setState({ content: ''})
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