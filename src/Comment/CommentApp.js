/**
 *  -> constructor()
    -> componentWillMount()
    -> render()
    // 然后构造 DOM 元素插入页面
    -> componentDidMount()
    // ...
    // 即将从页面中删除
    -> componentWillUnmount()
    // 从页面中删除
 */

import React, { Component, PropTypes} from 'react'
import './comment.css'
import wrapWithLoadData from '../components/HigherComponent'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import Clock from '../components/Clock'

class CommentApp extends Component {
    static propTypes = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {
            comments: props.data || [],
            Phone: ''
        }
    }
    // componentWillMount() {
    //     this._getComment()
    // }
    // _getComment() {
    //     let comments = localStorage.getItem('comments')
    //     if (comments) {
    //         this.setState({ comments: JSON.parse(comments) })
    //     }
    // }
    // _saveComment(comments) {
    //     localStorage.setItem('comments', JSON.stringify(comments))
    // }
    handleShowOrHide() {
        this.setState({
            isShowClock: !this.state.isShowClock
        })
    }
    handlePhoneChange(e) {
        this.setState({ Phone: e.target.value })
    }
    handleSubmitComment(comment) {
        console.log({ ...comment, Phone: this.state.Phone })
        if (!comment) return
        if (!comment.userName) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
            const comments = this.state.comments
        comments.push(comment)
        this.setState({comments})
        this.props.saveData(comments)
        /**
         * 利用函数参数不行
          this.setState((prevState) =>{
             return {
                 comments: prevState.comments.push(comment)
             }
         })
         */

    }
    handleDeleteComment(index) {
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
         this.props.saveData(comments)
    }
    render() {
        return (
            <div className="wrapper">
                <CommentInput color='red'
                    onSubmit={this.handleSubmitComment.bind(this)}>
                    <span className='comment-field-name'>手机号：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.Phone} onChange={this.handlePhoneChange.bind(this)} />
                    </div>
                </CommentInput>
                <CommentList
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)} />
                {this.state.isShowClock ? <Clock /> : null}
                <button onClick={this.handleShowOrHide.bind(this)}>
                    显示或隐藏时钟
                </button>
            </div>
        )
    }
}
CommentApp = wrapWithLoadData(CommentApp, 'comments')
export default CommentApp