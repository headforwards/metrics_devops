import React, { Component } from 'react';

class StoryCounter extends Component {

    render() {
        return(
          <div> <b>{`There are ${this.props.workItems.length} stories on the backlog.`}</b> </div>
        )
    }
}

export default StoryCounter