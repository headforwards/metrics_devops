import React, { Component } from 'react';
import {countChildStories} from '../api/features'

class FeatureCounter extends Component {

    render() {
        let featuresWithNoStories = 0
        let countOfStories = 0
        this.props.workItems.forEach((workItem => {
            const children = countChildStories(workItem)
            countOfStories+=children
            if( children === 0 ) {
                featuresWithNoStories++
            }
        }))
        const averageStoriesPerFeature = countOfStories / (this.props.workItems.length - featuresWithNoStories)

        
        
        return(
          <div>
            <h2>
                {`There are ${featuresWithNoStories} features with no stories`}
            </h2>
            <h3>
                {`There are ${this.props.workItems.length - featuresWithNoStories} features with stories,  and ${countOfStories} stories between them, giving an average of ${averageStoriesPerFeature} stories per feature.`}
            </h3>
          </div>

        )
    }
}

export default FeatureCounter