import React, { Component } from 'react';
import * as storyQueries from '../api/story-queries'

import '../App.css';


class ScratchPad extends Component {
    
    componentDidMount() {

        storyQueries.countCompletedStories('2018-12-11')        
        .then((result) => {
            console.log('Huay')
        })
    }

    render() {

        return (
            <div className="App">
            <h1>Scratch Pad</h1>
                        
        </div>
        );
  }
}

export default ScratchPad;