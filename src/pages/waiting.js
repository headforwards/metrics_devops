import React, { Component } from 'react';
import Timeline from 'react-calendar-timeline/lib'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import * as storyQueries from '../api/story-queries'
import * as itemHistoryTimeline from '../api/item-history-timeline'
import * as itemHistory from '../api/item-history'

import {workItem} from '../api/__mocks__/workItemHistoryIncomplete'

import '../App.css';


class WaitingToDeploy extends Component {
    
    constructor(props) {
        super(props)
        // const groups = this.getGroups()
        // const items = this.getItems()
        const defaultTimeStart = moment('2018-05-01').startOf('month').toDate()
        const defaultTimeEnd = moment('2019-01-01').endOf('month').toDate()
        this.state = {
            groups: [],
            items: [],
            defaultTimeStart,
            defaultTimeEnd
        }
    }

    componentDidMount() {
        // storyQueries.getStoriesModifiedRecently()
        const statePeriods = storyQueries.getStoriesFromQuarter()
        .then(storyQueries.getWorkItemIdsFromResponse)
        .then(itemHistory.fetchMultipleWorkItemHistories)
        .then(histories => {
            return  histories.map(workItemHistory => {
                return itemHistory.getStatePeriodsData(workItemHistory)
            })
        }).then(periods => {
            return periods
        })
        
    }

    

    render() {    


return (
    <div className="App">
    <h1>Waiting…</h1>
              <p>Nothing to see here yet</p>
    </div>
    );  
  }
}

export default WaitingToDeploy;