"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

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
    if (currentUser && (courses.length > 0 || enrollments.length > 0) && !isUserEnrolled()) {
      router.push("/Dashboard");
    }
  }, [currentUser, courses, enrollments, isUserEnrolled, router]);

  if (!currentUser) {
    return null;
  }

  if (courses.length === 0 && enrollments.length === 0) {
    return null;
  }

  if (!isUserEnrolled()) {
    return null;
  }

  return <>{children}</>;
}
