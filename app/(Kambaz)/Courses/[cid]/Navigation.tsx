"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles.css";

interface CourseNavigationProps {
  courseId: string;
}

export default function CourseNavigation({ courseId }: CourseNavigationProps) {
  const pathname = usePathname();

  return (
    <div id="wd-courses-navigation" className="list-group wd fs-5 rounded-0">
      <Link
        href={`/Courses/${courseId}/Home`}
        id="wd-course-home-link"
        className={`list-group-item border-0 ${
          pathname === `/Courses/${courseId}/Home` ? "active" : "text-danger"
        }`}
      >
        Home
      </Link>
      <Link
        href={`/Courses/${courseId}/Modules`}
        id="wd-course-modules-link"
        className={`list-group-item border-0 ${
          pathname === `/Courses/${courseId}/Modules` ? "active" : "text-danger"
        }`}
      >
        Modules
      </Link>
      <Link
        href={`/Courses/${courseId}/Piazza`}
        id="wd-course-piazza-link"
        className={`list-group-item border-0 ${
          pathname === `/Courses/${courseId}/Piazza` ? "active" : "text-danger"
        }`}
      >
        Piazza
      </Link>
      <Link
        href={`/Courses/${courseId}/Zoom`}
        id="wd-course-zoom-link"
        className={`list-group-item border-0 ${
          pathname === `/Courses/${courseId}/Zoom` ? "active" : "text-danger"
        }`}
      >
        Zoom
      </Link>
      <Link
        href={`/Courses/${courseId}/Assignments`}
        id="wd-course-assignments-link"
        className={`list-group-item border-0 ${
          pathname === `/Courses/${courseId}/Assignments`
            ? "active"
            : "text-danger"
        }`}
      >
        Assignments
      </Link>
      <Link
        href={`/Courses/${courseId}/Quizzes`}
        id="wd-course-quizzes-link"
        className={`list-group-item border-0 ${
          pathname === `/Courses/${courseId}/Quizzes` ? "active" : "text-danger"
        }`}
      >
        Quizzes
      </Link>
      <Link
        href={`/Courses/${courseId}/Grades`}
        id="wd-course-grades-link"
        className={`list-group-item border-0 ${
          pathname === `/Courses/${courseId}/Grades` ? "active" : "text-danger"
        }`}
      >
        Grades
      </Link>
      <Link
        href={`/Courses/${courseId}/People`}
        id="wd-course-people-link"
        className={`list-group-item border-0 ${
          pathname === `/Courses/${courseId}/People` ? "active" : "text-danger"
        }`}
      >
        People
      </Link>
    </div>
  );
}
