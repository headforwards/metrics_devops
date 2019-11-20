import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link }from 'react-router-dom';
import Home from './pages/home'
import Epics from './pages/epics'
import Features from './pages/features'
import Stories from './pages/stories'
import History from './pages/history'
import PullRate from './pages/pull-rate'
import ScratchPad from './pages/scratch-pad'
import WeeklyProgress from './pages/weekly-progress'
import WaitingToDeploy from './pages/waiting'

import './App.css';



class App extends Component {

    render() {

    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/epics">Epics</Link>
                    </li>
                    <li>
                        <Link to="/features">Features</Link>
                    </li>
                    <li>
                        <Link to="/stories">Stories</Link>
                    </li>
                    <li>
                        <Link to="/history">History</Link>
                    </li>
                    <li>
                        <Link to="/pull-rate">Pull Rate</Link>
                    </li>
                    <li>
                        <Link to="/scratch-pad">Scratch Pad</Link>
                    </li>
                    <li>
                        <Link to="/weekly-progress">Weekly Progress</Link>
                    </li>
                    <li>
                        <Link to="/waiting">Waiting to Deploy</Link>
                    </li>
                </ul>

                <hr />

                <Route exact path="/" component={Home} />
                <Route path="/epics" component={Epics} />
                <Route path="/features" component={Features} />
                <Route path="/stories" component={Stories} />
                <Route path="/history" component={History} />
                <Route path="/pull-rate" component={PullRate} />
                <Route path="/scratch-pad" component={ScratchPad} />
                <Route path="/weekly-progress" component={WeeklyProgress} />
                <Route path="/waiting" component={WaitingToDeploy} />
            </div>
        </Router>
    );
  }
}


export default App;
