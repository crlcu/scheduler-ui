import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../store/auth/actions'

class Logout extends Component {
    componentDidMount() {
        this.props.actions.logout()
    }

    render() {
        return null
    }
}

// which props do we want to inject, given the global store state?
const mapStateToProps = state => ( state.auth )

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout)
