"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
import * as coursesClient from "../../Courses/client";
import * as enrollmentsClient from "../../Enrollments/client";
import { setCourses } from "../../Courses/reducer";
import { setEnrollments } from "../../Enrollments/reducer";

interface CourseProtectionProps {
  children: React.ReactNode;
  courseId: string;
}

export default function CourseProtection({
  children,
  courseId,
}: CourseProtectionProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchCourses = useCallback(async () => {
    if (!currentUser) return;
    try {
      const courses = await coursesClient.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error: any) {
      if (error.response?.status !== 401) {
        console.error(error);
      }
      dispatch(setCourses([]));
    }
  }, [currentUser, dispatch]);

  const fetchEnrollments = useCallback(async () => {
    if (!currentUser) return;
    try {
      const enrollments = await enrollmentsClient.findEnrollmentsForUser("current");
      dispatch(setEnrollments(enrollments));
    } catch (error: any) {
      if (error.response?.status !== 401) {
        console.error(error);
      }
      dispatch(setEnrollments([]));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      if (courses.length === 0 && enrollments.length === 0) {
        await Promise.all([fetchCourses(), fetchEnrollments()]);
      } else if (courses.length === 0) {
        await fetchCourses();
      } else if (enrollments.length === 0) {
        await fetchEnrollments();
      }
      setLoading(false);
    };

    loadData();
  }, [currentUser, courses.length, enrollments.length, fetchCourses, fetchEnrollments]);

  const isUserEnrolled = useCallback(() => {
    if (!currentUser) return false;
    const isInCourses = courses.some((course: any) => course._id === courseId);
    const isInEnrollments = enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
    return isInCourses || isInEnrollments;
  }, [currentUser, courses, enrollments, courseId]);

  useEffect(() => {
    if (!loading && currentUser && (courses.length > 0 || enrollments.length > 0) && !isUserEnrolled()) {
      router.push("/Dashboard");
    }
  }, [loading, currentUser, courses, enrollments, isUserEnrolled, router]);

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isUserEnrolled()) {
    return null;
  }

  return <>{children}</>;
}
