/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { RootState } from "../store";
import * as client from "../courses/client";

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
  const [enrollments, setEnrollments] = useState<any[]>([]);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchDashboardData = async () => {
    try {
      const [allCourses, myEnrollments] = await Promise.all([
        client.fetchAllCourses(),
        client.findMyEnrollments(),
      ]);
      dispatch(setCourses(allCourses));
      setEnrollments(myEnrollments);
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    try {
      await client.createCourse(course);

      await fetchDashboardData();

      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    setEnrollments(
      enrollments.filter((enrollment: any) => enrollment.course !== courseId),
    );
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        }),
      ),
    );
  };

  const isEnrolled = (courseId: string) =>
    enrollments.some((enrollment: any) => enrollment.course === courseId);

  const onEnroll = async (courseId: string) => {
    try {
      const enrollment = await client.enrollInCourse(courseId);
      setEnrollments([...enrollments, enrollment]);
    } catch (error) {
      console.error(error);
    }
  };

  const onUnenroll = async (courseId: string) => {
    try {
      await client.unenrollFromCourse(courseId);
      setEnrollments(
        enrollments.filter((enrollment: any) => enrollment.course !== courseId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [currentUser]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h5>
        New Course
        <button
          className="btn btn-primary"
          id="wd-add-new-course-click"
          onClick={onAddNewCourse}
        >
          Add
        </button>
        <button
          className="btn btn-warning"
          onClick={onUpdateCourse}
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

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>

      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4">
          {courses.map((course: any) => (
            <Col key={course._id} style={{ width: "300px" }}>
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

                    <Button className="btn btn-primary me-2">Go</Button>

                    {isEnrolled(course._id) ? (
                      <button
                        className="btn btn-warning me-2"
                        onClick={(event) => {
                          event.preventDefault();
                          onUnenroll(course._id);
                        }}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        className="btn btn-success me-2"
                        onClick={(event) => {
                          event.preventDefault();
                          onEnroll(course._id);
                        }}
                      >
                        Enroll
                      </button>
                    )}

                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        onDeleteCourse(course._id);
                      }}
                      className="btn btn-danger me-2"
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
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
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
