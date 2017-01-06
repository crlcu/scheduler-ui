import React, { Component } from 'react'
import { Icon, Dropdown, Navbar } from 'react-materialize'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class TopNavbar extends Component {
    render() {
        const { user } = this.props

        console.log(user)
        
        return (
            <div className="navbar-fixed">
                <Navbar left>
                    <li><Link to="/"><Icon>home</Icon></Link></li>
                    <li><Link to="/tasks">Tasks <Icon right>content_paste</Icon></Link></li>
                    <li><Link to="/timeline">Timeline <Icon right>timeline</Icon></Link></li>

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
