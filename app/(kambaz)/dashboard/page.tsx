/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import * as db from "../database";

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
  const courses = db.courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4">
          {courses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/courses/${course._id}/home`}
                  className="text-decoration-none text-dark"
                >
                  <CardImg
                    src={course.image || "/images/reactjs.jpg"}
                    height={160}
                    variant="top"
                  />

                  <CardBody>
                    <CardTitle>{course.name}</CardTitle>

                    <CardText>{course.description}</CardText>

                    <Button>Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
