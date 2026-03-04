/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { RootState } from "../store";
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
  FormControl,
} from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );

  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);

  const [enrollments, setEnrollments] = useState<any[]>(db.enrollments);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  function isEnrolled(courseId: string) {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === (currentUser as any)?._id &&
        enrollment.course === courseId,
    );
  }

  function enroll(courseId: string) {
    const newEnrollment = {
      _id: new Date().getTime().toString(),
      user: (currentUser as any)?._id,
      course: courseId,
    };

    setEnrollments([...enrollments, newEnrollment]);
  }

  function unenroll(courseId: string) {
    const updated = enrollments.filter(
      (enrollment: any) =>
        !(
          enrollment.user === (currentUser as any)?._id &&
          enrollment.course === courseId
        ),
    );

    setEnrollments(updated);
  }

  let visibleCourses = courses;

  if (!showAllCourses) {
    visibleCourses = courses.filter((course: any) =>
      enrollments.some(
        (enrollment: any) =>
          enrollment.user === (currentUser as any)?._id &&
          enrollment.course === course._id,
      ),
    );
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-enrollments-toggle"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </button>
        <button
          className="btn btn-primary float-end me-2"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>

      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) =>
          setCourse({
            ...course,
            name: e.target.value,
          })
        }
      />

      <FormControl
        as="textarea"
        rows={3}
        value={course.description}
        onChange={(e) =>
          setCourse({
            ...course,
            description: e.target.value,
          })
        }
      />

      <hr />

      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>

      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4">
          {visibleCourses.map((course: any) => {
            const enrolled = isEnrolled(course._id);

            return (
              <Col key={course._id} style={{ width: "300px" }}>
                <Card>
                  <Link
                    href={`/courses/${course._id}/home`}
                    className="text-decoration-none text-dark"
                    onClick={(event) => {
                      if (!enrolled) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <CardImg
                      src={course.image || "/images/reactjs.jpg"}
                      height={160}
                      variant="top"
                    />

                    <CardBody>
                      <CardTitle>{course.name}</CardTitle>

                      <CardText>{course.description}</CardText>

                      <Button className="btn btn-primary">Go</Button>

                      {showAllCourses && (
                        <>
                          {enrolled && (
                            <button
                              className="btn btn-danger float-end"
                              onClick={(event) => {
                                event.preventDefault();
                                unenroll(course._id);
                              }}
                            >
                              Unenroll
                            </button>
                          )}

                          {!enrolled && (
                            <button
                              className="btn btn-success float-end"
                              onClick={(event) => {
                                event.preventDefault();
                                enroll(course._id);
                              }}
                            >
                              Enroll
                            </button>
                          )}
                        </>
                      )}

                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(deleteCourse(course._id));
                        }}
                        className="btn btn-danger float-end ms-2"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>

                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end"
                      >
                        Edit
                      </button>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
