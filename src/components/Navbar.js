import React, { Component } from 'react'
import { Icon, Navbar } from 'react-materialize'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class TopNavbar extends Component {
    render() {
        return (
            <div className="navbar-fixed">
                <Navbar left>
                    <li><Link to="/"><Icon>home</Icon></Link></li>
                    <li><Link to="/tasks">Tasks <Icon right>content_paste</Icon></Link></li>
                    <li><Link to="/timeline">Timeline <Icon right>timeline</Icon></Link></li>
                </Navbar>
            </div>
        )
    }
}

// which props do we want to inject, given the global store state?
const mapStateToProps = state => {
    return state.routing
}

export default connect(
    mapStateToProps
)(TopNavbar)
