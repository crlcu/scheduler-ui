import React, { Component } from 'react'

export class Separator extends Component {
    render() {
        return (
            <div className="separator" style={ { display: 'inline-block', margin: '0 5px' } }>
                { this.props.children }
            </div>
        )
    }
}
