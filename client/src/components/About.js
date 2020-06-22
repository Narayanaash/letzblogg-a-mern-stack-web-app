import React from "react";
import { Row, Col, Container } from "reactstrap";

const About = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <img className="pt-2" src="/about.png" alt="" width="95%" />
        </Col>
        <Col className="text-justify">
          <span style={{ fontSize: "32px", fontWeight: "600" }}>About: </span>
          <p>
            Letzblogg is a hero can be anyone. Even a man knowing something as
            simple and reassuring as putting a coat around a young boy shoulders
            to let him know the world hadn’t ended. You fight like a younger
            man, there’s nothing held back. It’s admirable, but mistaken. When
            their enemies were at the gates the Romans would suspend democracy
            and appoint one man to protect the city.
          </p>
          <p>
            Collaboratively administrate empowered markets via plug-and-play
            networks. Dynamically procrastinate B2C users after installed base
            benefits. Dramatically visualize customer directed convergence
            without revolutionary ROI.
          </p>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
