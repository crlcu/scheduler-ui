import classNames from 'classnames'
import React, { Component } from 'react'
import { Input, Pagination } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
//import { Button, Input, Pagination, ProgressBar } from 'react-materialize'

import * as actions from '../../store/tasks/actions'
import Widget from '../Shared/Widget'

class History extends Component {
    componentDidMount() {
        console.log(this.props.id)

        this.props.actions.history(this.props.id)
    }

    render() {
        const { actions, loading, paginator } = this.props

        const footer = (
            <div className="footer indigo lighten-5">
                <Pagination
                    items={ Math.ceil(paginator.total / paginator.per_page) }
                    activePage={ paginator.current_page }
                    maxButtons={ 5 }
                    href={ 'test' }
                    onSelect={ actions.search }
                />
            </div>
        )

        return (
            <Widget className={classNames({ loading: loading })} title={ 'History' } footer={ footer }>
                <table className="bordered highlight condensed">
                    <caption>
                        <div className="file-path-wrapper">
                            <Input name="q" s={12} placeholder="Search ..." autoComplete="off" />
                        </div>
                    </caption>

                    <thead>
                        <tr>
                            <th></th>
                            <th>Result</th>
                            <th>Started at</th>
                            <th>Done at</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginator.data.map((row, i) =>
                            <Row row={ row } key={ i } />
                        )}
                    </tbody>
                </table>
            </Widget>
        )
    }
}

class Row extends React.Component {
    render() {
        const { row } = this.props

        return (
            <tr>
                <td></td>
                <td>{ row.id }</td>
                <td>{ row.created_at }</td>
                <td>{ row.updated_at }</td>
                <td>{ row.duration_for_humans }</td>
            </tr>
        )
    }
}

// which props do we want to inject, given the global store state?
const mapStateToProps = state => {
    return {
        paginator:  state.tasks.paginator,
        loading:    state.tasks.loading

    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(History)
