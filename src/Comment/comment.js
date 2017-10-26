import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
    static propTypes = {
        //组件参数验证
        comment: PropTypes.object.isRequired,
        onDeleteComment: PropTypes.func,
        index: PropTypes.number
    }
    constructor() {
        super()
        this.state = {
            timeString: ''
        }
    }
    componentWillMount() {
        this._updateTimestring();
        this.timer = setInterval(() => {
            this._updateTimestring();
        }, 5000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    _updateTimestring() {
        const createdtime = this.props.comment.createdTime
        const duration = (+Date.now() - createdtime) / 1000
        console.log('duration', +Date.now(), createdtime)
        this.setState({
            timeString: duration > 60
                ? `${Math.round(duration / 60)} 分钟前`
                : `${Math.round(Math.max(duration, 1))} 秒前`
        })
    }
    _getProcessedContent(content) {
        //转义(xxs攻击)
        return content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }
    handleDeleteComment() {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index)
        }
    }
    render() {
        const comment = this.props.comment
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span className='comment-username'>{comment.userName} </span>：
            </div>
                <p dangerouslySetInnerHTML={{ __html: this._getProcessedContent(comment.content) }} />
                <span className='comment-createdtime'>
                    {this.state.timeString}
                </span>
                <span className='comment-delete' onClick={this.handleDeleteComment.bind(this)}>
                    删除
        </span>
            </div>
        )
    }
}
export default Comment