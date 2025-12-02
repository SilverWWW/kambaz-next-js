"use client";
import { useParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments } from "../../Assignments/reducer";
import * as client from "../../Assignments/client";
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
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchAssignments = useCallback(async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  }, [cid, dispatch]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      await client.deleteAssignment(assignmentId);
      await fetchAssignments();
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const isFaculty = currentUser && currentUser.role === "FACULTY";

  return (
    <div id="wd-assignments">
      {isFaculty && <AssignmentsControls />}
      <AssignmentsHeader />
      <div className="wd-assignments-list">
        {assignments
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
              isFaculty={isFaculty}
            />
          ))}
      </div>
    </div>
  );
}
