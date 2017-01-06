import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Button, Icon, Input } from 'react-materialize'
import Pagination from 'react-js-pagination'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as actions from '../../store/roles/actions'
import {Separator} from '../Shared/Util'
import Widget from '../Shared/Widget'

class Search extends Component {
    constructor(props) {
        super(props)

        this.typingTimer = undefined
    }

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
        const { actions, loading, paginator, search } = this.props

        const footer = (
            <div className="footer indigo lighten-5">
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
        )

        return (
            <Widget
                footer={ footer }
                loading={ loading }
                title={ 'Roles' }
            >
                <Helmet title="Scheduler | Roles" />

                <table className="bordered highlight condensed">
                    <caption>
                        <div className="file-path-wrapper">
                            <Input
                                autoComplete="off"
                                autoFocus
                                defaultValue={ search }
                                name="q" s={12}
                                onChange={ this.watchChange.bind(this) }
                                placeholder="Search ..."
                            />
                        </div>
                    </caption>

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Groups with this role</th>
                            <th width="100px">
                                <Link className="btn-floating waves-effect waves-light green right" to="/roles/create">
                                    <Icon>add</Icon>
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginator.data.map((row, i) =>
                            <Row actions={ actions } row={ row } key={ i } />
                        )}
                    </tbody>
                </table>
            </Widget>
        )
    }
}

class Row extends React.Component {
    remove(id) {
        if (confirm('Are you sure?')) {
            this.props.actions.remove(id)
        }
    }

    render() {
        const { row } = this.props

        return (
            <tr>
                <td>{ row.name }</td>
                <td>{ row.description }</td>
                <td>{ row.groups.length }</td>
                <td>
                    <Button floating className='red' waves='light' icon='delete' onClick={ () => { this.remove(row.id) } } />
                    
                    <Separator />
                    
                    <Link className="btn-floating waves-effect waves-light blue" to={ "/roles/" + row.id + "/edit" }>
                        <Icon>edit</Icon>
                    </Link>
                </td>
            </tr>
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
)(Search)
