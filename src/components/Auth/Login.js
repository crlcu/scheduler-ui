import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Button, Card, Col, Input, ProgressBar, Row } from 'react-materialize'
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
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.actions.login({
            email:      this.refs.email.state.value,
            password:   this.refs.password.state.value
        })
    }

    render() {
        const { error, loading } = this.props
        
        return (
            <Row>
                <Helmet title={ "Scheduler | Login" } />

                <form className="col offset-s1 s10 offset-m2 m8 offset-l4 l4" onSubmit={this.handleSubmit.bind(this)}>
                    <Card className="card-panel z-depth-1">
                        <Row>
                            <Input type="email" name="email" ref="email" label="Email" s={12} autoFocus validate error={ error.message } />
                            <Input type="password" name="password" ref="password" label="Password" s={12} />
                            
                            { loading && (
                                <Row><Col s={ 12 }><ProgressBar /></Col></Row>
                            )}

                            <Button type="submit" className="green col s12" waves='light'>Login</Button>
                        </Row>
                    </Card>
                </form>
            </Row>
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
