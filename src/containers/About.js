import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';

export default function About() {
  return (
    <Row>
      <Helmet title="About" />
      <Col md={6}>
        <h2>About the Detroit Ledger</h2>
        <p>
          The Detroit Ledger provides a picture of philanthropy in Detroit. We collect data on grants given to organizations in the city of Detroit, focusing on non-profits and civic projects that receive money from foundations. All of our data is available for free, online, in bulk, under a copyright-free license.
        </p>

        <h3>Our team</h3>
        <h5>Benjamin Chodoroff</h5>
        <q>I am a programmer who works with various free software projects. For fun, I build wireless networks so my neighbors and I can collaboratively control eachother's porch lights and share secret messages.</q>

        <h5>Matt Hampel</h5>
        <q>In 2012, I worked through Code for America with the City of Detroit to help build TextMyBus, a real-time bus arrival system for Detroit. My company, LocalData, is making tech tools for neighborhood organizations that allow groups to quickly collect and map important information. I’ve previously worked on technology projects at the University of Michigan and Chicago Tribune, among other places.</q>

        <h5>Jessica McInchak</h5>
        <q>As a researcher and technologist, my favorite projects to work on involve investigating how complex systems work, visualizing information, and making data more engaging and participatory.</q>

        <p>The Ledger’s research efforts have also been supported by our past Data Interns Sarah Breen, Molly Maher, and Colleen Marquis.</p>

        <h3>Transparency</h3>
        <p>
          Our goal is to make this project as transparent as possible. To that end, we're committed to sharing as many details as possible. Please peruse our project's planning and documentation: [TBD]
        </p>

        <h3>Contact us</h3>
        <p>
          You can always reach our team at hello@detroitledger.org with research inquiries, ideas, and tips.
        </p>
        <p>
          Or subscribe to our newsletter to hear about our project updates, new data and features on our site, and local nonprofit news.
        </p>
      </Col>
    </Row>
  );
}
