import classNames from 'classnames'
import React, { Component } from 'react'
import { ProgressBar, Row } from 'react-materialize'

export default class Widget extends Component {
    render() {
        const { children, className, footer, loading, right, title } = this.props
        let footerHtml = ''

        if (footer) {
            footerHtml = (
                <div className="footer indigo lighten-5">
                    <Row>
                        { footer }
                    </Row>
                </div>
            )
        }
        return (
            <div className={"widget " + classNames({ loading: loading }) + ' ' + className}>
                <div className="header indigo lighten-5">
                    <span className="title">{ title }</span>
                    { right ?
                        <div className="right">{ right }</div> :
                        ''
                    }
                </div>
                <div className="content">
                    { loading ?
                        <ProgressBar /> :
                        children
                    }
                </div>
                { loading ?
                    '' :
                    footerHtml
                }
            </div>
        )
    }
}
