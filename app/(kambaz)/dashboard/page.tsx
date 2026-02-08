"use client";

import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (9)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4">
          <Col style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/1234/home"
                className="text-decoration-none text-dark"
              >
                <CardImg src="/images/reactjs.jpg" height={160} />
                <CardBody>
                  <CardTitle>CS1234 React JS</CardTitle>
                  <CardText>Full Stack software developer</CardText>
                  <Button>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/3200/home"
                className="text-decoration-none text-dark"
              >
                <CardImg src="/images/database.jpg" height={160} />
                <CardBody>
                  <CardTitle>CS3200 Intro to Databases</CardTitle>
                  <CardText>Database design</CardText>
                  <Button>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/4100/home"
                className="text-decoration-none text-dark"
              >
                <CardImg src="/images/AI.jpg" height={160} />
                <CardBody>
                  <CardTitle>CS4100 Artificial Intelligence</CardTitle>
                  <CardText>AI systems</CardText>
                  <Button>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/3540/home"
                className="text-decoration-none text-dark"
              >
                <CardImg src="/images/c++.jpg" height={160} />
                <CardBody>
                  <CardTitle>CS3540 Intro to C++</CardTitle>
                  <CardText>C++ programming</CardText>
                  <Button>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/3000/home"
                className="text-decoration-none text-dark"
              >
                <CardImg src="/images/dsa.jpg" height={160} />
                <CardBody>
                  <CardTitle>CS3000 Data Structures</CardTitle>
                  <CardText>Algorithms & Data Structures</CardText>
                  <Button>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/2000/home"
                className="text-decoration-none text-dark"
              >
                <CardImg src="/images/calc.jpg" height={160} />
                <CardBody>
                  <CardTitle>CS2000 Calculus</CardTitle>
                  <CardText>Calculus for CS</CardText>
                  <Button>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/3500/home"
                className="text-decoration-none text-dark"
              >
                <CardImg src="/images/oop.jpg" height={160} />
                <CardBody>
                  <CardTitle>CS3500 OOP</CardTitle>
                  <CardText>Object Oriented Programming</CardText>
                  <Button>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/4500/home"
                className="text-decoration-none text-dark"
              >
                <CardImg src="/images/software.jpg" height={160} />
                <CardBody>
                  <CardTitle>CS4500 Software Dev</CardTitle>
                  <CardText>Software Engineering</CardText>
                  <Button>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col style={{ width: "300px" }}>
            <Card>
              <Link
                href="/courses/1000/home"
                className="text-decoration-none text-dark"
              >
                <CardImg src="/images/eco.jpg" height={160} />
                <CardBody>
                  <CardTitle>CS1000 Econ</CardTitle>
                  <CardText>CS Job Market</CardText>
                  <Button>Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
