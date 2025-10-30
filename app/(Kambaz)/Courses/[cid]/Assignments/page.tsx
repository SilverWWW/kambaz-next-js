"use client";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "../../Assignments/reducer";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentsHeader from "./AssignmentsHeader";
import AssignmentItem from "./AssignmentItem";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableDate: string;
}

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const handleDeleteAssignment = (assignmentId: string) => {
    dispatch(deleteAssignment(assignmentId));
  };

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
              description={assignment.description}
              availableDate={assignment.availableDate}
              dueDate={assignment.dueDate}
              points={assignment.points}
              assignmentId={assignment._id}
              courseId={cid as string}
              onDelete={handleDeleteAssignment}
            />
          ))}
      </div>
    </div>
  );
}
