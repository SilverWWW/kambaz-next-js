"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
  const router = useRouter();

  const isUserEnrolled = () => {
    if (!currentUser) return false;
    if (currentUser.role === "FACULTY") return true;
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  useEffect(() => {
    if (currentUser && !isUserEnrolled()) {
      router.push("/Dashboard");
    }
  }, [currentUser, courseId, enrollments]);

  if (!currentUser) {
    return null;
  }

  if (!isUserEnrolled()) {
    return null;
  }

  return <>{children}</>;
}
