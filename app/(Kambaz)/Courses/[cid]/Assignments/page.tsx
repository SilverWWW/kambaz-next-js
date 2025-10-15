"use client";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentsHeader from "./AssignmentsHeader";
import AssignmentItem from "./AssignmentItem";

interface Assignment {
  _id: string;
  title: string;
  course: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments">
      <AssignmentsControls />
      <AssignmentsHeader />
      <div className="wd-assignments-list">
        {assignments
          .filter((assignment: Assignment) => assignment.course === cid)
          .map((assignment: Assignment) => (
            <AssignmentItem
              key={assignment._id}
              title={assignment.title}
              description="Multiple Modules"
              availableDate="May 6 at 12:00am"
              dueDate="May 13 at 11:59pm"
              points={100}
              assignmentId={assignment._id}
              courseId={cid as string}
            />
          ))}
      </div>
    </div>
  );
}
