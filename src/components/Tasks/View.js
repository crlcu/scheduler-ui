import Highlight from'react-syntax-highlight'
import React, { Component } from 'react'
import { Icon, ProgressBar } from 'react-materialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as actions from '../../store/tasks/actions'

import History from './History'
import {Separator} from '../Shared/Util'
import Widget from '../Shared/Widget'

import 'highlight.js/styles/foundation.css'

class View extends Component {
    componentDidMount() {
        this.props.actions.view(this.props.params.id)
    }

    render() {
        const { loading, task } = this.props

        const footer = (
            <div className="footer indigo lighten-5">
                <Link 
                    className="btn-floating waves-effect waves-light red"
                    to={"/tasks/" + task.id + "/delete"} 
                    onClick={ () => { return confirm("Ok?") } }
                >
                    <Icon>delete</Icon>
                </Link>
                <Separator />
                <Link 
                    className="btn-floating waves-effect waves-light blue"
                    to={"/tasks/" + task.id + "/edit"}
                >
                    <Icon>edit</Icon>
                </Link>
                <Separator>|</Separator>
                <Link 
                    className="btn-floating waves-effect waves-light amber lighten-3"
                    to={"/tasks/" + task.id + "/notifications"}
                >
                    <Icon>notifications</Icon>
                </Link>

                <Link 
                    className="btn waves-effect waves-light green right"
                    to={"/tasks/" + task.id + "/run"}
                >
                    <Icon left>launch</Icon> Run now
                </Link>
            </div>
        )

        const code = task.command || 'loading'

        return (
            <div>
                <Widget
                    footer={ footer }
                    loading={ loading }
                    right={"Average time " + task.average_for_humans}
                    title={ task.name }   
                >
                    <Highlight lang="bash" value={ code } />
                </Widget>

                { task.id && !loading ?
                    <History id={ task.id } /> :
                    <div>
                        Loading history
                        <ProgressBar />
                    </div>
                }
            </div>
        )
    }
}

// which props do we want to inject, given the global store state?
const mapStateToProps = state => ( state.tasks )

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View)
