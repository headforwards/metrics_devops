import React, { Component } from 'react';
import getFeatureBacklog from '../api/features';
import DatePicker from 'react-datepicker'
import Feature from '../components/Feature'
import moment from 'moment'
import '../App.css';
import 'react-datepicker/dist/react-datepicker.css';
import FeatureCounter from '../components/FeatureCounter';

class Features extends Component {
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
        getFeatureBacklog(this.state.startDate)
            .then(data => this.setState({ workItems: data.backlogData }));
    }
    render() {
        const { workItems } = this.state;

    return (
        <div className="App">
        <h1>Features</h1>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDateChange}
                dateFormat="YYYY-MM-DD" />
            <button
                onClick={() => this.handleButtonClick()} >Go!</button>
            <FeatureCounter workItems={workItems} />
                {workItems.map((workItem, index) =>
                    <div key={workItem["id"] }>
                    <Feature workItem={workItem} index={index} />
                    </div>
                )}
                      
      </div>
    );
  }
}

export default Features;