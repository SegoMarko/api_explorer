import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Competition from './CompetitionStandings';
import CompetitionsList from './CompetitionsList';

// token = a0c71ce39cb34c31b380ad82c4eeecb4
// uri = http://api.football-data.org/v2/competitions/
class App extends Component {

  constructor(props){
    super(props);
    this.competitions_uri = 'http://api.football-data.org/v2/competitions/';
    this.auth_token = process.env.FOOTBALL_API_KEY;
    this.state = {
      error : null,
      isLoaded : false,
      data: []
    }
  }

  render () {

    return(
    <div className="api_explorer">
      <Router>
        <div>
          <Route exact path='/' component={CompetitionsList}/>
          <Route exact path='/competition/:id/standings' component={Competition}/>
        </div>
      </Router>
    </div>
    );

  }
}

export default App;
