
import { Link } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import React from 'react';
import Card from 'react-bootstrap/Card';

function CompetitionInfo(props){
        return(
            <Link style={{ textDecoration: 'none' }} to={'/competition/' + props.item.id + '/standings'}>
                <Row>
                <Col key={props.item.id}>
                    <Card className="m-3" bg="light" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{props.item.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.item.plan}</Card.Subtitle>
                        <Card.Text>{props.item.area.name}</Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
                </Row>
            </Link>
        );
}

export default CompetitionInfo;