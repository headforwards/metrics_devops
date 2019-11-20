import React, { Component } from 'react';
import getLatestBacklogData from '../api/history'
import '../App.css';
import 'react-datepicker/dist/react-datepicker.css';
import {AreaChart, Area, CartesianGrid, XAxis, YAxis, Legend, Tooltip} from 'recharts'

class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storyData: []
        }
        this.updateStoryData = this.updateStoryData.bind(this)
    }

    updateStoryData = (stories) => {
        this.setState({
            storyData: stories,
        })
    }

    handleButtonClick = () => {
        getLatestBacklogData()
        .then((graphingData) => {
            this.updateStoryData(graphingData)
        })
    }
    render() {

    return (
        <div className="App">
        <h1>History</h1>

                <button
                    onClick={() => this.handleButtonClick()} >Get All Stories
                </button>
                <label> * Fetches stories since the first week of March</label>
                <AreaChart width={800} height={600} data={this.state.storyData}>
                    <CartesianGrid stroke="#CCC" />
                    <XAxis dataKey="date" angle={90} tickMargin={40} height={100} />
                    <YAxis />
                    <Area type="monotone" dataKey="preUpgrade" stroke="#FFCCCC" fill="#FFCCCC" stackId="2" />
                    <Area type="monotone" dataKey="forecastStories" stroke="#CC0000" fill="#CC0000" stackId="2" />
                    <Area type="monotone" dataKey="completedStories" stroke="#a3a3a3" fill="#EEEEEE" stackId="1" />
                    <Area type="monotone" dataKey="postUpgrade" stroke="#CCCCFF" fill="#CCCCFF" stackId="1" />
                    
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={120} layout={'horizontal'}/>
                </AreaChart>
      </div>
    );
  }
}

export default History;