import React, { Component, PropTypes} from 'react'
import Comment from './comment'

class CommentList extends Component {
  static defaultProps = {
    //默认属性
    comments: []
  }
  static propsTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  }
  handleDeleteCommont(index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }
  render() {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <Comment index={i} onDeleteComment={this.handleDeleteCommont.bind(this)} comment={comment} key={i} />
        )}
      </div>
    )
  }
}

export default CommentList