import classNames from 'classnames'
import React, { Component } from 'react'
import { Input, Pagination } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
//import { Button, Input, Pagination, ProgressBar } from 'react-materialize'

import * as actions from '../../store/tasks/actions'
import Widget from '../Shared/Widget'

class Search extends Component {
    componentDidMount() {
        this.props.actions.search()
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
            <Widget className={classNames({ loading: loading })} title={ 'Tasks' } footer={ footer }>
                <table className="bordered highlight condensed">
                    <caption>
                        <div className="file-path-wrapper">
                            <Input name="q" s={12} placeholder="Search ..." autoComplete="off" />
                        </div>
                    </caption>

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Average duration</th>
                            <th>Schedule</th>
                            <th width="150px">Next due</th>
                            <th width="120px">
                                <a href="/tasks" className="btn-floating waves-effect waves-light green right" title="Add">
                                    <i className="material-icons">add</i>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginator.data.map((task, i) =>
                            <TasksRow task={ task } key={ i } />
                        )}
                    </tbody>
                </table>
            </Widget>
        )
    }
}

class TasksRow extends React.Component {
    render() {
        const { task } = this.props

        return (
            <tr>
                <td>
                    <Link to={ "/tasks/" + task.id} title="View history">{ task.name }</Link>
                </td>
                <td>{ task['average_for_humans'] }</td>
                <td>
                    <span title={ task['cron_for_humans'] }>{ task['schedule'] }</span>
                </td>
                <td>{ task['next_due'] }</td>
                <td>
                    
                </td>
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
)(Search)
