import classNames from 'classnames'
import React, { Component } from 'react'
import { Icon, Input, Modal } from 'react-materialize'
import Pagination from 'react-js-pagination'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as actions from '../../store/tasks/history/actions'
import Widget from '../Shared/Widget'

class History extends Component {
    componentDidMount() {
        this.props.actions.search({ page: this.props.location.query.page })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.query.page !== nextProps.location.query.page) {
            this.props.actions.search({ page: nextProps.location.query.page })
        }
    }

    handleSearch(value) {
        this.props.actions.search({ search: value })
    }

    watchChange(e) {
        const value = e.target.value

        clearTimeout(this.typingTimer)
        this.typingTimer = setTimeout(() => this.handleSearch(value), 800)
    }

    render() {
        const { actions, loading, paginator, task } = this.props

        const footer = (
            <div className="footer indigo lighten-5">
                <div className="row">
                    <div className="left">
                        { paginator.last_page > 1 && (
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
                        )}
                    </div>
                    <div className="right">
                        <Link 
                            className="btn waves-effect waves-light red"
                            to={"/tasks/" + task.id + "/executions/clear"}
                        >
                            <Icon left>delete</Icon> Clear all
                        </Link>
                    </div>
                </div>
            </div>
        )
        
        return (
            <Widget className={classNames({ loading: loading })} title={ 'History' } footer={ footer }>
                <table className="bordered highlight condensed">
                    <caption>
                        <div className="file-path-wrapper">
                            <Input
                                autoComplete="off"
                                autoFocus
                                name="q" s={12}
                                onChange={ this.watchChange.bind(this) }
                                placeholder="Search ..."
                            />
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
                            <Row row={ row } task={ task } key={ i } />
                        )}
                    </tbody>
                </table>
            </Widget>
        )
    }
}

class Row extends React.Component {
    render() {
        const { row, task } = this.props

        return (
            <tr>
                <td></td>
                <td>
                    <Modal
                        header={ task.name }
                        fixedFooter
                        trigger={
                            <Link to="#modal" dangerouslySetInnerHTML={{ __html: row.result_preview }} />
                        }
                    >
                        <div dangerouslySetInnerHTML={{ __html: row.result.replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
                    </Modal>
                </td>
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
        loading:    state.tasks_history.loading,
        location:   state.routing.locationBeforeTransitions,
        paginator:  state.tasks_history.paginator,
        task:       state.tasks.task
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(History)
