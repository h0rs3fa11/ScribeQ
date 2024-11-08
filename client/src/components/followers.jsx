import React from "react";
import { ListGroup } from "react-bootstrap";

const Followers = () => {
  const following = [
    "Colton Berry",
    "Sasha Kuznetsov",
    "gk_",
    "Dragonfly Research",
  ];

  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <strong>Following</strong>
      </ListGroup.Item>
      {following.map((name, index) => (
        <ListGroup.Item key={index}>{name}</ListGroup.Item>
      ))}
      <ListGroup.Item className="text-muted">See all (28)</ListGroup.Item>
    </ListGroup>
  );
};

export default Followers;
