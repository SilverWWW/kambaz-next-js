"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../styles.css";

interface CourseNavigationProps {
  courseId: string;
}

export default function CourseNavigation({ courseId }: CourseNavigationProps) {
  const pathname = usePathname();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="list-group wd fs-5 rounded-0">
      {links.map((link) => {
        const isActive =
          pathname === `/Courses/${courseId}/${link}` ||
          (link === "Assignments" &&
            pathname.startsWith(`/Courses/${courseId}/Assignments/`));

        return (
          <Link
            key={link}
            href={`/Courses/${courseId}/${link}`}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
