import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Button, Icon, Input, Row } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../store/roles/actions'

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
        const { loading, role } = this.props

        const footer = (
            <Button type="submit" className="green right" waves="light">
                <Icon left>done</Icon> Save
            </Button>
        )

        return (
            <div>
                <Helmet title={ "Scheduler | Roles | " + (role.name || '...') } />

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Widget
                        footer={ footer }
                        loading={ loading }
                        title="Role details"
                    >
                        <Row>
                            <Input type="text" name="name" ref="name" defaultValue={ role.name } label="Name" s={12} autoFocus />
                            <Input type="text" name="description" ref="description" defaultValue={ role.description } label="Description" s={12} />
                        </Row>
                    </Widget>
                </form>
            </div>
        )
    }
}

// which props do we want to inject, given the global store state?
const mapStateToProps = state => ( state.roles )

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit)
