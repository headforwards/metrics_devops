import React, { Component } from 'react';

class Story extends Component {

    render() {
        return(
           <div> {this.props.index+1} - {this.props.workItem["id"]} - {this.props.workItem.fields["System.Title"]} </div>
        )
    }
}

export default Story