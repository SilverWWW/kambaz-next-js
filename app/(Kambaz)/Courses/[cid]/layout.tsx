"use client";
import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import CourseProtection from "./CourseProtection";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <CourseProtection courseId={cid as string}>
      <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify
            className="me-4 fs-4 mb-1"
            onClick={() => setSidebarVisible(!sidebarVisible)}
            style={{ cursor: "pointer" }}
          />
          <Breadcrumb course={course} />
        </h2>
        <hr />
        <div className="d-flex">
          <div className={sidebarVisible ? "d-none d-md-block" : "d-none"}>
            <CourseNavigation courseId={cid} />
          </div>
          <div className="flex-fill">{children}</div>
        </div>
      </div>
    </CourseProtection>
  );
}
