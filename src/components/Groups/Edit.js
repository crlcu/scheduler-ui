import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Button, Icon, Input, Row } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../store/groups/actions'

import Widget from '../Shared/Widget'

class Edit extends Component {
    componentDidMount() {
        this.props.actions.edit(this.props.params.id)
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.actions.update(this.props.role.id, {
            name:           this.refs.name.state.value,
            description:    this.refs.description.state.value
        })
    }

    render() {
        const { group, loading, validation } = this.props

        const footer = (
            <Button type="submit" className="green right" waves="light">
                <Icon left>done</Icon> Save
            </Button>
        )

        return (
            <div>
                <Helmet title={ "Scheduler | Groups | " + (group.name || '...') } />

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Widget
                        footer={ footer }
                        loading={ loading }
                        title="Group details"
                    >
                        <Row>
                            <Input
                                defaultValue={ validation.old.name || group.name }
                                type="text"
                                name="name"
                                ref="name"
                                label="Name" s={12} error={ validation.errorFor('name') } autoFocus
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
    group:      state.groups.group,
    loading:    state.groups.loading,
    validation: state.validation
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit)
