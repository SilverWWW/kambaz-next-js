import Link from "next/link";

interface CourseNavigationProps {
  courseId: string;
}

export default function CourseNavigation({ courseId }: CourseNavigationProps) {
  return (
    <div id="wd-courses-navigation">
      <Link href={`/Courses/${courseId}/Home`} id="wd-course-home-link">
        Home
      </Link>
      <br />
      <Link href={`/Courses/${courseId}/Modules`} id="wd-course-modules-link">
        Modules
      </Link>
      <br />
      <Link href={`/Courses/${courseId}/Piazza`} id="wd-course-piazza-link">
        Piazza
      </Link>
      <br />
      <Link href={`/Courses/${courseId}/Zoom`} id="wd-course-zoom-link">
        Zoom
      </Link>
      <br />
      <Link
        href={`/Courses/${courseId}/Assignments`}
        id="wd-course-quizzes-link"
      >
        Assignments
      </Link>
      <br />
      <Link
        href={`/Courses/${courseId}/Quizzes`}
        id="wd-course-assignments-link"
      >
        Quizzes
      </Link>
      <br />
      <Link href={`/Courses/${courseId}/Grades`} id="wd-course-grades-link">
        Grades
      </Link>
      <br />
      <Link
        href={`/Courses/${courseId}/People/Table`}
        id="wd-course-people-link"
      >
        People
      </Link>
      <br />
    </div>
  );
}
