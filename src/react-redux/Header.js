import React, { Component, PropTypes } from 'react'
import { connect } from './react-redux'
class Header extends Component {
    //从祖先组件的context里面获取store
    // static contextTypes = {
    //     store: PropTypes.object
    // }
    //只关心 props
    static propTypes = {
        themeColor: PropTypes.string    
    }
    constructor(){
        super()
        this.state = { themeColor: ''}
    }
    componentWillMount(){
        this._updateThemeColor()
    }
    _updateThemeColor(){
        const { store } = this.context
        const state = store.getState()
        this.setState({ themeColor: state.themeColor })
    }
    render() {
        return (
            <h1 style={{color: this.state.themeColor}}>React.js 小书</h1>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        themeColor: state.themeColor
    }
}

Header = connect(mapStateToProps)(Header)
export default Header