import React, { Component } from 'react';
import fetchEpics  from '../api/epics';
import DatePicker from 'react-datepicker'
import Epic from '../components/Epic'
import moment from 'moment'

import '../App.css';
import 'react-datepicker/dist/react-datepicker.css';

class Epics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            workItems: [],
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleButtonClick() {
        fetchEpics(this.state.startDate)
            .then(data => this.setState({ workItems: data.backlogData }));
    }
    render() {
        const { workItems } = this.state;

    return (
        <div className="App">
        <h1>Epics</h1>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDateChange}
                dateFormat="YYYY-MM-DD" />
            <button
                onClick={() => this.handleButtonClick()} >Go!</button>
            
                {workItems.map((workItem, index) =>
                    <div key={workItem["id"] }>
                        <Epic workItem={workItem} index={index} />
                    </div>
                )}
                      
      </div>
    );
  }
}

export default Epics;