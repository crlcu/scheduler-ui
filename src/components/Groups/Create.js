import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Button, Icon, Input, Row } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../../store/groups/actions'

import Widget from '../Shared/Widget'

class Create extends Component {
    constructor(props) {
        super(props)

        this.inputs = new Set()
    }

    componentDidMount() {
        this.props.actions.create()
    }

    handleSubmit(event) {
        event.preventDefault()

        console.log(this.formData)

        // this.props.actions.store({
        //     name:           this.refs.name.state.value
        // })
    }

    updateFormData(event) {
        if (event.target.type === 'checked') {
        }

        this.inputs.add({ name: event.target.value })

        console.log(this.inputs)

        // console.log(event.target.type)
        // console.log(event.target.checked)
        // console.log(event.target.name)
        // console.log(event.target.value)
    }

    render() {
        const { loading, roles, validation } = this.props

        const footer = (
            <Button type="submit" className="green right" waves="light">
                <Icon left>done</Icon> Save
            </Button>
        )
        
        return (
            <div>
                <Helmet title={ "Scheduler | Groups | Create" } />

                <form onChange={ this.updateFormData.bind(this) } onSubmit={ this.handleSubmit.bind(this) }>
                    <Widget
                        footer={ footer }
                        loading={ loading }
                        title="Group details"
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
                        </Row>

                        <Row>
                            {roles.map((role, i) =>
                                <Input key={ i } name="role" type="checkbox" value={ role.id } label={ role.description } />
                            )}
                        </Row>
                    </Widget>
                </form>
            </div>
        )
    }
}

// which props do we want to inject, given the global store state?
const mapStateToProps = state => ({
    loading:    state.groups.loading,
    roles:      state.groups.roles,
    validation: state.validation
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create)
