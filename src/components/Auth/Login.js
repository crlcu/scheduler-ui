import React, { Component } from 'react'
import { browserHistory, withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../store/auth/actions'
import auth from '../../auth'

class Login extends Component {
    componentDidMount() {
        if (auth.loggedIn()) {
            // Redirect to tasks page
            browserHistory.push('/tasks')
        }

        //this.props.actions.login({ email: 'email', password: 'password' })
    }

    handleSubmit(event) {
        event.preventDefault()

        const email = this.refs.email.value
        const pass = this.refs.pass.value

        auth.login(email, pass, (loggedIn) => {
            if (!loggedIn) {
                return this.setState({ error: true })
            }

            const { location } = this.props

            if (location.state && location.state.nextPathname) {
                this.props.router.replace(location.state.nextPathname)
            } else {
                this.props.router.replace('/')
            }
        })
    }

    render() {
        const { error } = this.props
        
        return (
            <form onSubmit={this.handleSubmit}>
                <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
                <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
                <button type="submit">login</button>
                { error && (
                    <p>Bad login information</p>
                )}
            </form>
        )
    }
}

// which props do we want to inject, given the global store state?
const mapStateToProps = state => ( state.auth )

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login))
