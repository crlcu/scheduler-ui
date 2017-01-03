import React, { Component } from 'react'

export default class Widget extends Component {
    render() {
        return (
            <div className={"widget " + this.props.className}>
                <div className="header indigo lighten-5">
                    <span className="title">{ this.props.title }</span>
                    { this.props.right ?
                        <div className="right">{this.props.right}</div> :
                        ''
                    }
                </div>
                <div className="content">
                    { this.props.children }
                </div>
                { this.props.footer }
            </div>
        )
    }
}
