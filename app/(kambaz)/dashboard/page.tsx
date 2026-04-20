/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCourses, addNewCourse } from "../courses/reducer";
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
  const [allCourses, setAllCourses] = useState<any[]>([]);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const getCourseImage = (course: any) => {
    // Map course names to appropriate images
    const imageMap: { [key: string]: string } = {
      "CS1234 React JS": "/images/reactjs.jpg",
      "CS3200 Intro to Databases": "/images/database.jpg",
      "CS4100 Artificial Intelligence": "/images/AI.jpg",
      "CS3540 Intro to C++": "/images/c++.jpg",
      "CS3000 Data Structures": "/images/dsa.jpg",
      "CS2000 Calculus": "/images/calc.jpg",
      "CS3500 OOP": "/images/oop.jpg",
      "CS4500 Software Dev": "/images/software.jpg",
      "CS1000 Econ": "/images/eco.jpg",
    };

    return course.image || imageMap[course.name] || "/images/reactjs.jpg";
  };

  const getImageForNewCourse = (courseName: string) => {
    const name = courseName.toLowerCase();
    if (name.includes("react") || name.includes("javascript"))
      return "/images/reactjs.jpg";
    if (name.includes("database") || name.includes("sql"))
      return "/images/database.jpg";
    if (
      name.includes("ai") ||
      name.includes("artificial") ||
      name.includes("intelligence")
    )
      return "/images/AI.jpg";
    if (name.includes("c++") || name.includes("cpp")) return "/images/c++.jpg";
    if (name.includes("data structure") || name.includes("algorithm"))
      return "/images/dsa.jpg";
    if (name.includes("calculus") || name.includes("math"))
      return "/images/calc.jpg";
    if (name.includes("oop") || name.includes("object"))
      return "/images/oop.jpg";
    if (name.includes("software") || name.includes("engineering"))
      return "/images/software.jpg";
    if (name.includes("econ") || name.includes("economy"))
      return "/images/eco.jpg";
    return "/images/reactjs.jpg"; // default
  };

  const fetchDashboardData = useCallback(async () => {
    try {
      const [myCourses, everyCourse, myEnrollments] = await Promise.all([
        client.findMyCourses(),
        client.fetchAllCourses(),
        client.findMyEnrollments(),
      ]);
      dispatch(setCourses(myCourses));
      setAllCourses(everyCourse);
      setEnrollments(myEnrollments);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const onAddNewCourse = async () => {
    try {
      const courseWithImage = {
        name: course.name?.trim() || "New Course",
        number: course.number?.trim() || "New Number",
        startDate: course.startDate || "2023-09-10",
        endDate: course.endDate || "2023-12-15",
        image: getImageForNewCourse(course.name),
        description: course.description?.trim() || "New Description",
      };

      const createdCourse = await client.createCourse(courseWithImage);
      dispatch(addNewCourse(createdCourse));
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
      console.error("Failed to add course", error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
      setEnrollments(
        enrollments.filter((enrollment: any) => enrollment.course !== courseId),
      );
    } catch (error) {
      console.error("Failed to delete course", error);
    }
  };

  const onUpdateCourse = async () => {
    // Ensure course has appropriate image
    const courseWithImage = {
      ...course,
      image: getImageForNewCourse(course.name),
    };

    await client.updateCourse(courseWithImage);
    dispatch(
      setCourses(
        courses.map((c) => {
          if (c._id === courseWithImage._id) {
            return courseWithImage;
          } else {
            return c;
          }
        }),
      ),
    );
  };

  const isEnrolled = (courseId: string) =>
    enrollments.some((enrollment: any) => enrollment.course === courseId);

  const role = (currentUser as any)?.role || "STUDENT";
  const isFaculty = role === "FACULTY" || role === "ADMIN";
  const availableCourses = allCourses.filter(
    (candidate: any) => !isEnrolled(candidate._id),
  );

  const userId = currentUser
    ? (currentUser as any)._id || (currentUser as any).id
    : undefined;

  const onEnroll = async (courseId: string) => {
    try {
      const enrollment = await client.enrollIntoCourse(userId, courseId);
      setEnrollments([...enrollments, enrollment]);
    } catch (error) {
      console.error(error);
    }
  };

  const onUnenroll = async (courseId: string) => {
    try {
      await client.unenrollFromCourse(userId, courseId);
      setEnrollments(
        enrollments.filter((enrollment: any) => enrollment.course !== courseId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [currentUser, fetchDashboardData]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h5>
        New Course
        {isFaculty && (
          <>
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
          </>
        )}
      </h5>

      {isFaculty && <br />}

      {isFaculty && (
        <>
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
        </>
      )}

      <h2 id="wd-dashboard-published">
        {isFaculty ? "My Courses" : "Enrolled Courses"} ({courses.length})
      </h2>

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
                    src={getCourseImage(course)}
                    height={160}
                    variant="top"
                  />

                  <CardBody>
                    <CardTitle>{course.name}</CardTitle>
                    <CardText>{course.description}</CardText>
                  </CardBody>
                </Link>

                <CardBody>
                  <Button className="btn btn-primary me-2">Go</Button>

                  {isEnrolled(course._id) ? (
                    <button
                      className="btn btn-warning me-2"
                      onClick={(event) => {
                        event.preventDefault();
                        onUnenroll(course._id);
                      }}
                      disabled={!userId}
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
                      disabled={!userId}
                    >
                      Enroll
                    </button>
                  )}

                  {isFaculty && (
                    <>
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
                          setCourse({
                            ...course,
                            image: getImageForNewCourse(course.name),
                          });
                        }}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {availableCourses.length > 0 && (
        <>
          <hr />
          <h2>
            {isFaculty ? "Available Courses To Join" : "Available Courses"} (
            {availableCourses.length})
          </h2>
          <div className="text-muted mb-3">
            {isFaculty
              ? "Faculty can enroll in an existing course to manage its content and quizzes."
              : "Students only see enrolled courses above. Enroll below to add courses to the dashboard."}
          </div>
          <Row xs={1} md={4} className="g-4">
            {availableCourses.map((course: any) => (
              <Col key={course._id} style={{ width: "300px" }}>
                <Card>
                  <CardImg
                    src={getCourseImage(course)}
                    height={160}
                    variant="top"
                  />
                  <CardBody>
                    <CardTitle>{course.name}</CardTitle>
                    <CardText>{course.description}</CardText>
                    <button
                      className="btn btn-success"
                      onClick={() => onEnroll(course._id)}
                      disabled={!userId}
                    >
                      Enroll
                    </button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}
