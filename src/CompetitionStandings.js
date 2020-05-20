

import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

class CompetitionStandings extends Component{

    constructor(props){
        super(props);
        this.competition_uri = '/v2/competitions/' + props.match.params.id + '/standings';
        this.auth_token = process.env.REACT_APP_FOOTBALL_API_KEY;
        this.state = {
            error : null,
            isLoaded : false,
            competition: [],
            season: [],
            standings: []
        }
    }

    componentDidMount(){
        fetch(this.competition_uri, {headers: {'X-Auth-Token': this.auth_token}})
        .then(res => {
            if(res.status === 403){
                this.setState({error: {message: "Besplatni računi ne mogu vidjeti ovo natjecanje!"}, isLoaded: true});
                return;
            }else{
                return res.json();
            }
        })
        .then(
        (result) => {
            console.log(result);
            if(result && result.standings[0] && result.standings[0].table){
                this.setState({competition : result.competition
                    , isLoaded : true
                    , season : result.season
                    , standings : result.standings[0].table
                });

            }
        },
        (error) => {
            this.setState({error : error, isLoaded : true});
        })
    }

    render(){
        const { error, isLoaded, competition, season, standings } = this.state;
        if (error) {
            return (
                <Alert key={1} variant="info">
                    Ovo natjecanje ne mogu vidjeti besplatni računi!
                </Alert>
            );
        } else if (!isLoaded) {
            return(<div className="d-flex mt-5 text-success justify-content-center">
                <Spinner className="mx-auto" animation="border" />
                </div>);
        } else {
            return(
                <div className="w-75 m-5 mx-auto">
                    <Alert key={2} variant="success">
                        <Alert.Heading>{competition.name} {competition.area.name}</Alert.Heading>
                        <hr/>
                        <p>Početak: {season.startDate}</p> 
                        <p>Kraj: {season.endDate}</p>
                    </Alert>

                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ime tima</th>
                                <th>Broj bodova</th>
                                <th>Broj pobjeda</th>
                                <th>Ukupno utakmica</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((item) => ( 
                                <tr key={item.team.id}>
                                    <th>{item.position}</th>
                                    <th>{item.team.name}</th>
                                    <th>{item.points}</th>
                                    <th>{item.won}</th>
                                    <th>{item.playedGames}</th>
                                </tr>
                            ))}     
                        </tbody>
                    </Table>
                </div>
            );
        }
    }

}

export default CompetitionStandings;