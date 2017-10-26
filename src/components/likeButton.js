import React, { Component } from 'react';

class LikeButton extends Component{
    static defaultProps = {
        linedText: '取消',
        unlikedText: '点赞'
    }
    constructor(){
        super()
        this.state = { isLiked: false}
    }

    handleClickBtn(){
        this.setState((prevState)=>{
            return {
                isLiked: !prevState.isLiked
            }
        })
    }

    render(){
        return (
           <button onClick={this.handleClickBtn.bind(this)}>
               { this.state.isLiked
               ?this.props.linedText
               :this.props.unlikedText}
           </button> 
        )
    }
}
//函数式组件，只接受props,无状态组件
const LIkeButton2 = (props) => {
    const handleClickBtn=(event)=>{props.isLiked = !props.isLiked};
    return (
        <button onClick={handleClickBtn}>
           { this.props.isLiked
               ?this.props.linedText
               :this.props.unlikedText}
        </button>
    )
}