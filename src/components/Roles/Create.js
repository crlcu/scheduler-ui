import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Button, Icon, Input, Row } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../store/roles/actions'

import Widget from '../Shared/Widget'

class Create extends Component {
    handleSubmit(event) {
        event.preventDefault()

        this.props.actions.store({
            name:           this.refs.name.state.value,
            description:    this.refs.description.state.value
        })
    }

    render() {
        const { loading, validation } = this.props

        const footer = (
            <Button type="submit" className="green right" waves="light">
                <Icon left>done</Icon> Save
            </Button>
        )
        
        return (
            <div>
                <Helmet title={ "Scheduler | Roles | Create" } />

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Widget
                        footer={ footer }
                        loading={ loading }
                        title="Role details"
                    >
                        <Row>
                            <Input
                                defaultValue={ validation.old.name }
                                type="text"
                                name="name"
                                ref="name"
                                label="Name" s={12} error={ validation.errorFor('name') } autoFocus
                                validate
                            />

                            <Input
                                defaultValue={ validation.old.description }
                                type="text"
                                name="description"
                                ref="description"
                                label="Description" s={12} error={ validation.errorFor('description') }
                                validate
                            />
                        </Row>
                    </Widget>
                </form>
            </div>
        )
    }
}

// which props do we want to inject, given the global store state?
const mapStateToProps = state => ({
    loading:    state.roles.loading,
    validation: state.validation
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create)
