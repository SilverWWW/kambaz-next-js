"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { setEnrollments } from "../Enrollments/reducer";
import * as client from "../Courses/client";
import * as enrollmentsClient from "../Enrollments/client";
import { RootState } from "../store";

interface Course {
  _id: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  description?: string;
}

interface Enrollment {
  user: string;
  course: string;
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = useCallback(async () => {
    if (!currentUser) {
      dispatch(setCourses([]));
      return;
    }
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error: any) {
      if (error.response?.status === 401) {
        dispatch(setCourses([]));
      } else {
        console.error(error);
      }
    }
  }, [currentUser, dispatch]);

  const fetchEnrollments = useCallback(async () => {
    if (!currentUser) {
      dispatch(setEnrollments([]));
      return;
    }
    try {
      const enrollments = await enrollmentsClient.findEnrollmentsForUser("current");
      dispatch(setEnrollments(enrollments));
    } catch (error: any) {
      if (error.response?.status === 401) {
        dispatch(setEnrollments([]));
      } else {
        console.error(error);
      }
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [fetchCourses, fetchEnrollments]);

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
      if (c._id === course._id) {
        return course;
      } else {
        return c;
      }
    })));
  };

  const isUserEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    return enrollments.some(
      (enrollment: Enrollment) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  const handleEnrollToggle = async (courseId: string) => {
    if (!currentUser) return;

    if (isUserEnrolled(courseId)) {
      await enrollmentsClient.unenrollUserFromCourse(currentUser._id, courseId);
      dispatch(setEnrollments(
        enrollments.filter(
          (e: Enrollment) => !(e.user === currentUser._id && e.course === courseId)
        )
      ));
    } else {
      const newEnrollment = await enrollmentsClient.enrollUserInCourse(currentUser._id, courseId);
      dispatch(setEnrollments([...enrollments, newEnrollment]));
    }
  };

  const getFilteredCourses = () => {
    if (!currentUser) return courses;
    if (showAllCourses) return courses;
    return courses;
  };

  const hashStringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };
  return (
    <div className="p-4" id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {currentUser && (
          <Button
            variant="primary"
            onClick={() => setShowAllCourses(!showAllCourses)}
            id="wd-enrollments-btn"
          >
            {showAllCourses ? "My Courses" : "Enrollments"}
          </Button>
        )}
      </div>
      <hr />
      {currentUser && currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              {" "}
              Add{" "}
            </button>
            <button
              className="btn btn-warning float-end me-2"
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
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Published Courses"} (
        {getFilteredCourses().length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {getFilteredCourses().map((course: Course) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <div
                  style={{
                    backgroundColor: hashStringToColor(course.name),
                    height: "160px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {course.name}
                </div>
                <CardBody className="card-body">
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name}
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {course.description}
                  </CardText>

                  {/* Course Actions */}
                  <div className="d-flex flex-column gap-2">
                    {/* Navigation Button - Only if enrolled or faculty */}
                    {isUserEnrolled(course._id) ||
                    (currentUser && currentUser.role === "FACULTY") ? (
                      <Link
                        href={`/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none"
                      >
                        <Button variant="primary" className="w-100">
                          Go
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="secondary" className="w-100" disabled>
                        Not Enrolled
                      </Button>
                    )}

                    {/* Enrollment Controls - Only in enrollments view */}
                    {showAllCourses && currentUser && (
                      <Button
                        variant={
                          isUserEnrolled(course._id) ? "danger" : "success"
                        }
                        onClick={() => handleEnrollToggle(course._id)}
                        className="w-100"
                        id={`wd-${
                          isUserEnrolled(course._id) ? "unenroll" : "enroll"
                        }-course-${course._id}`}
                      >
                        {isUserEnrolled(course._id) ? "Unenroll" : "Enroll"}
                      </Button>
                    )}

                    {/* Faculty Controls */}
                    {currentUser && currentUser.role === "FACULTY" && (
                      <div className="d-flex gap-1">
                        <Button
                          id="wd-edit-course-click"
                          onClick={() => setCourse(course)}
                          className="btn btn-warning flex-fill"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(course._id);
                          }}
                          className="btn btn-danger flex-fill"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
