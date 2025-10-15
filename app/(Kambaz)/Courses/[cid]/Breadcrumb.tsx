"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();

  const getSectionName = (path: string) => {
    const segments = path.split("/");
    const courseIndex = segments.findIndex((segment) => segment === "Courses");

    if (courseIndex !== -1 && segments.length > courseIndex + 3) {
      const section = segments[courseIndex + 3];

      if (section === "Assignments" && segments.length > courseIndex + 4) {
        return "Assignments";
      }

      return section || "Home";
    }

    return "Home";
  };

  return (
    <span>
      Course {course?.name} &gt; {getSectionName(pathname)}
    </span>
  );
}
