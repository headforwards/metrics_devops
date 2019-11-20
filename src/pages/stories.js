import React, { Component } from 'react';
import { fetchStoryBacklog } from '../api/stories';
import DatePicker from 'react-datepicker'
import Story from '../components/Story'
import StoryCounter from '../components/StoryCounter'
import moment from 'moment'
import '../App.css';
import 'react-datepicker/dist/react-datepicker.css';


class Stories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            backlogWorkItems: [],
            pulledWorkItems: []
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleButtonClick() {
        fetchStoryBacklog(this.state.startDate)
            .then(data => this.setState({ backlogWorkItems: data.backlogData }));
    }
    render() {
        const { backlogWorkItems } = this.state;

    return (
        <div className="App">
        <h1>Stories</h1>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDateChange}
                dateFormat="YYYY-MM-DD" />
            <button
                onClick={() => this.handleButtonClick()} >Go!</button>
            
            <StoryCounter workItems={backlogWorkItems} />

                {backlogWorkItems.map((workItem, index) =>
                    <div key={workItem["id"] }>
                      <Story workItem={workItem} index={index} />
                    </div>
                )}
                      
      </div>
    );
  }
}

export default Stories;
