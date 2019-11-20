import React, {Component} from 'react'
import DatePicker from 'react-datepicker'

import moment from 'moment'
import {getPulledStoriesBetweenDates, getPulledStoryCountsByWeek} from '../api/pull-stories'
import {getWeeklyStoryCompletionRate} from '../api/story-queries'

import 'react-datepicker/dist/react-datepicker.css';

class PullRate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate : moment(),
            pulledStories: [],
            historicalPulledStories: []
        }
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        })
    }

    handleButtonClick() {
        const aWeekPrior = moment(this.state.startDate).subtract(7,'days').format("YYYY-MM-DD");
        const ourDate = moment(this.state.startDate).format("YYYY-MM-DD");
        getPulledStoriesBetweenDates(aWeekPrior,ourDate)
        .then(pulledStories => {
            this.setState({pulledStories: pulledStories.storyIds})
        })
        
        getPulledStoryCountsByWeek('2018-03-05')
        .then(historicalPulledResult => {
            this.setState({historicalPulledStories: historicalPulledResult})
        })
        getWeeklyStoryCompletionRate()
        .then((completedResult) => {
            let counts = []
            completedResult.forEach((week, index) => {
                let diff = 0
                if(index>0){
                    diff = week.completedStories - completedResult[index-1].completedStories
                }
                counts.push(diff)
            })
            this.setState({historicalCompletedStoryCounts: counts})
        })
    }
    render() {
        const {pulledStories, historicalPulledStories, historicalCompletedStoryCounts} = this.state
        
        
        return(
            <div className="App">
            <h1>Pull Rate</h1>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleDateChange}
                    dateFormat="YYYY-MM-DD" />
                <button
                    onClick={() => this.handleButtonClick()} >Go!</button>
                <p>{`There were ${pulledStories.length} stories pulled off the backlog this week`}</p>
                <p>{`They are: ${pulledStories}`}</p>

                <div>Over all time the stories pulled each week have been:
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Stories pulled off backlog</th>
                                <th>Pulled Stories</th>
                                <th>Stories moved to completed</th>
                                
                            </tr>
                        </thead>
                        <tbody>  
                            {historicalPulledStories.map((week, index) =>
                                <tr key={week.date}>
                                    <td>{week.date}</td>
                                    <td>{week.storyIds.length}</td>
                                    <td>{week.storyIds.join(', ')}</td>                                    
                                    <td>{historicalCompletedStoryCounts[index]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
        )
    }
}

export default PullRate