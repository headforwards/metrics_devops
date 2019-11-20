import React, { Component } from 'react';
import { countChildFeatures } from '../api/epics'

class Epic extends Component {

    render() {
        const childFeatures = countChildFeatures(this.props.workItem)
        if (childFeatures === 0 ) {
            return(
           
                <div><b>{this.props.index+1} - {this.props.workItem["id"]} - {this.props.workItem.fields["System.Title"]} - {`${countChildFeatures(this.props.workItem)} Features`}</b></div>
             ) 
        } else {
            return(
           
                <div>{this.props.index+1} - {this.props.workItem["id"]} - {this.props.workItem.fields["System.Title"]} - {`${countChildFeatures(this.props.workItem)} Features`}</div>
             )
        }

    }
}

export default Epic