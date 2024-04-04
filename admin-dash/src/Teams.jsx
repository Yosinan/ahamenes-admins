import React, { useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
import { Carousel, Card, Row, Col } from "react-bootstrap";


const teamData = [
    {
        id: 1,
        name: "John Doe",
        photo: "https://via.placeholder.com/150",
        role: "Developer",
    },
    {
        id: 2,
        name: "Jane Smith",
        photo: "https://via.placeholder.com/150",
        role: "Designer",
    },
    {
        id: 3,
        name: "Alice Johnson",
        photo: "https://via.placeholder.com/150",
        role: "Manager",
    },
];

const Teams = () => {
  return (
    <div className="container">
        <Row>
            <Col>
                <div>
                    <h2>leaders</h2>
                    <Carousel>
                        {teamData.map((teamMember) => (
                            <Carousel.Item key={teamMember.id}>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Img
                                        variant="top"
                                        src={teamMember.photo}
                                        alt={teamMember.name}
                                    />
                                    <Card.Body>
                                        <Card.Title>{teamMember.name}</Card.Title>
                                        <Card.Text>{teamMember.role}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </Col>
            <Col>
                {" "}
                <div>
                    <h2>Members</h2>
                    <Carousel>
                        {teamData.map((teamMember) => (
                            <Carousel.Item key={teamMember.id}>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Img
                                        variant="top"
                                        src={teamMember.photo}
                                        alt={teamMember.name}
                                    />
                                    <Card.Body>
                                        <Card.Title>{teamMember.name}</Card.Title>
                                        <Card.Text>{teamMember.role}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </Col>
            <Col>
                {" "}
                <div>
                    <h2>Founders</h2>
                    <Carousel>
                        {teamData.map((teamMember) => (
                            <Carousel.Item key={teamMember.id}>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Img
                                        variant="top"
                                        src={teamMember.photo}
                                        alt={teamMember.name}
                                    />
                                    <Card.Body>
                                        <Card.Title>{teamMember.name}</Card.Title>
                                        <Card.Text>{teamMember.role}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default Teams