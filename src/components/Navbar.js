import React, { Component } from 'react'
import { Icon, Dropdown, Navbar } from 'react-materialize'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class TopNavbar extends Component {
    render() {
        const { user } = this.props
        
        return (
            <div className="navbar-fixed">
                <Navbar left>
                    <li><Link to="/"><Icon>home</Icon></Link></li>
                    <li><Link to="/tasks">Tasks <Icon right>content_paste</Icon></Link></li>

                    { user.roles.indexOf('has-timeline') >= 0 && (
                        <li><Link to="/timeline">Timeline <Icon right>timeline</Icon></Link></li>
                    )}

                    { user.roles.indexOf('manage-roles') >= 0 && (
                        <li><Link to="/roles">Roles <Icon right>settings_input_composite</Icon></Link></li>
                    )}

                    { user.roles.indexOf('manage-groups') >= 0 && (
                        <li><Link to="/groups">Groups <Icon right>group</Icon></Link></li>
                    )}

                    { user.roles.indexOf('manage-users') >= 0 && (
                        <li><Link to="/users">Users <Icon right>person</Icon></Link></li>
                    )}

                    <li className="right">
                        <Dropdown trigger={ <Link>{ user.name } <Icon right>arrow_drop_down</Icon></Link> } style={{ marginTop: '65px' }}>
                            <li><Link to="/logout">Logout</Link></li>
                        </Dropdown>
                    </li>
                </Navbar>
            </div>
        )
    }
}

// which props do we want to inject, given the global store state?
const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(
    mapStateToProps
)(TopNavbar)
