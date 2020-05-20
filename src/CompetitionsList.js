
import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FormControl from 'react-bootstrap/FormControl';
import { Container, Row } from 'react-bootstrap';
import CompetitionInfo from './CompetitionInfo';
import Spinner from 'react-bootstrap/Spinner';

class CompetitionsList extends Component{

    constructor(props){
        super(props);
        this.competitions_uri = '/v2/competitions/';
        this.auth_token = process.env.REACT_APP_FOOTBALL_API_KEY;
        this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
        this.filterValue = this.filterValue.bind(this);
        this.state = {
            error : null,
            isLoaded : false,
            data: [],
            searchValue: '',
            filterValue: '',
            currentFilter: 'Natjecanje'
        }
    }

    componentDidMount(){
        fetch(this.competitions_uri, {headers: {'X-Auth-Token': this.auth_token}})
        .then(res => res.json())
        .then(
        (result) => {
            console.log(result);
            this.setState({data : result.competitions, isLoaded : true});
        },
        (error) => {
            this.setState({error : {message: "Trenutno nedostupno!"}, isLoaded : true});
            console.log(error);
        })
    }

    handleSearchValueChange(event){
        this.setState({searchValue: event.target.value});
    }

    handleFilterValueChange(event){
        console.log("filter value: " + event.target.value);
        this.setState({filterValue:  event.target.value, currentFilter: event.target.textContent});
    }

    filterValue(competition){
        let value='';
        if(this.state.searchValue.length < 2){
            return true;
        }else if(this.state.filterValue === '1'){
            value = competition.area.name;
        }else{
            value = competition.name;
        }
        return value.toLowerCase()
                    .includes(this.state.searchValue.toLowerCase());
    }

    render(){
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Pogreška: {error.message}</div>;
        } else if (!isLoaded) {
            return(<div className="d-flex mt-5 text-success justify-content-center">
                <Spinner className="mx-auto" animation="border" />
                </div>);
        } else {
            return (
                <div>
                <InputGroup className="w-50 mx-auto mb-3 ml-5 mr-5 mt-3">
                    <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title={this.state.currentFilter}
                    id="input-group-dropdown-1"
                    >
                    <Dropdown.Item as="button" onClick={this.handleFilterValueChange} value='1'>Regija</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.handleFilterValueChange} value='2'>Natjecanje</Dropdown.Item>
                    </DropdownButton>
                    <FormControl aria-describedby="basic-addon1" placeholder="Pretražite" onChange={this.handleSearchValueChange}/>
                </InputGroup>
                <Container fluid="md">
                    <Row className="justify-content-md-center">
                        {data.filter(competition => this.filterValue(competition))
                        .map(item => <CompetitionInfo key={item.id} item={item}/>)}
                    </Row>
                </Container>
                </div>
            );
        }
    }

}

export default CompetitionsList;