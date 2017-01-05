import React, { Component } from 'react'
import { Icon, Input } from 'react-materialize'
import Pagination from 'react-js-pagination'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as actions from '../../store/tasks/actions'
import Widget from '../Shared/Widget'

class Search extends Component {
    componentDidMount() {
        this.props.actions.search({ page: this.props.location.query.page })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.query.page !== nextProps.location.query.page) {
            this.props.actions.search({ page: nextProps.location.query.page })
        }
    }

    render() {
        const { actions, loading, paginator } = this.props

        const footer = (
            <div className="footer indigo lighten-5">
                <Pagination
                    activePage={ paginator.current_page }
                    itemsCountPerPage={ parseInt(paginator.per_page || 0, 10) }
                    totalItemsCount={ parseInt(paginator.total || 0, 10) }
                    pageRangeDisplayed={5}

                    onChange={ actions.changePage }

                    prevPageText={ <Icon>chevron_left</Icon> }
                    nextPageText={ <Icon>chevron_right</Icon> }
                    firstPageText={ <Icon>chevron_left</Icon> }
                    lastPageText={ <Icon>chevron_right</Icon> }
                />
            </div>
        )

        return (
            <Widget
                footer={ footer }
                loading={ loading }
                title={ 'Tasks' }
            >
                <table className="bordered highlight condensed">
                    <caption>
                        <div className="file-path-wrapper">
                            <Input
                                autoComplete="off"
                                onChange={ this.handleChange }
                                name="q" s={12}
                                placeholder="Search ..."
                            />
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
        loading:    state.tasks.loading,
        paginator:  state.tasks.paginator
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)
