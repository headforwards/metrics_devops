import React, { Component } from 'react';
import { countChildStories } from '../api/features'

class Feature extends Component {

    render() {

        let featureStyle = {color: 'black'};
        const childStories = countChildStories(this.props.workItem)
        
        if (this.props.workItem.fields["System.Tags"] && this.props.workItem.fields["System.Tags"].indexOf("Post Upgrade") !== -1) {
            featureStyle.color = 'lightGray'
        }

        if (childStories === 0 ) {
            featureStyle.fontWeight = 'bold';
        }
        
        return(           
            <div style={featureStyle}>{this.props.index+1} - {this.props.workItem["id"]} - {this.props.workItem.fields["System.Title"]} - {`${countChildStories(this.props.workItem)} stories`}</div>
            )
        

    }
}

export default Feature