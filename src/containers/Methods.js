import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';

export default function Methods() {
  return (
    <Row>
      <Helmet title="Data & Methods" />
      <Col md={6}>
        <h2>Data & Methods</h2>
        <p>
          The Ledger collects data, presents it in an easily digestible format, and talks with individuals and organizations working in the nonprofit sector.
        </p>

        <h3>Use our data</h3>
        <p>
          All of the Ledger's data is available for free for any use.
        </p>
        <p>
        Our data is made available under the Open Database License. Any rights in individual contents of the database are licensed under the Database Contents License.
        </p>
        <p>
        You can download Excel-compatible CSV exports of all grants and all organizations. Detailed field descriptions are provided in our data dictionary.
        </p>
        <p>
        We also offer a data API with endpoints for organizations, grants, NTEE codes, and broader stats. Learn how to access through our API docs.
        </p>
        <p>
        Please contact us at hello@detroitledger.org if we can provide additional information, data in other formats, or technical assistance.
        </p>

        <h3>Our methods</h3>
        <h5>Data collection</h5>
        <p>
        We collect data about philanthropic and public grants awarded to organizations based in Detroit from 2010 onward. We include a handful of multi-year grants beginning prior to 2010 and relevant suburban organizations who are implementing grant-funded projects in the City.
        </p>
        <p>
        Beyond grant data, we curate nonprofit news related to our organizations, provide baseline statistics from the IRS like annual revenue and expenses, and collect data about board member relationships and terms.    
        </p>
        <p>
        We’re building this database by utilizing public record IRS Form 990s for tax-exempt organizations, scraping foundation and government agency websites, importing bulk funding records from federal data portals like USAspending.gov, and scouring popular news sources. We know our data benefits from human moderators and welcome new data, corrections, and suggestions at hello@detroitledger.org.
        </p>
        <p>
        We code our data to offer many search keys to our end-users. These attributes include: organization name and any known former names; National Taxonomy of Exempt Entities (NTEE) classifications; grant start date and length; award amount; and several other categories as applicable. Each grant has a direct source link to follow for funder-specific details or a static citation.
        </p>
        <p>
        If our data source does not specify the end date of a grant, we record that grant as active for a single fiscal year. We also note all award purposes, project descriptions, and re-granting details connected to individual grants whenever possible, but this type of qualitative information is unfortunately one of the most inconsistently reported amongst our sources.
        </p>

        <h5>Interviews</h5>
        <p>
        Alongside data collection, we also reach out to foundation representatives, funders, nonprofit staffers, community experts, and others doing work relevant to philanthropy in the city. We conducted our first short series of public interviews in 2013 to learn more about the funding landscape in Detroit as we were launching our website. We took away important lessons from those conversations, and built on them through another round of interviews and case studies in 2014. You can find our field notes from these conversations below; all have been approved by our attendees and the original transcriptions have been edited for clarity, to add detail, and to correct errors. 
        </p>
        <p>
        More recently, our team has presented the project at conferences and community workshops to gather ideas. As our project continues to grow, we need your feedback. If you’d like to share your perspective about grantmaking and philanthropy in Detroit or contribute data or other resources to our project, please get in touch at hello@detroitledger.org.
        </p>
        <h5>Field notes</h5>
        <ul>2014
          <li>Allie Gross, Detroit Charter Data</li>
          <li>Patrick Cooper-McCann, PhD Candidate, U of M</li>
          <li>Mike Medow, Allied Media Projects</li>
          <li>Gabriell Turner, Detroit Digital Steward</li>
        </ul>
        <ul>2013
          <li>Richard Murphy, Michigan Suburbs Alliance</li>
          <li>Keith Hernandez and Ellen Chung, Community Planning and Development, City of Detroit</li>
          <li>Jennifer Riker Fahenstock, M.M. Fisher Foundation</li>
          <li>Peri Weisberg, United Way for Southeastern Michigan</li>
        </ul>
      </Col>
    </Row>
  );
}