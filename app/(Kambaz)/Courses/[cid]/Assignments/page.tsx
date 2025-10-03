import AssignmentsControls from "./AssignmentsControls";
import AssignmentsHeader from "./AssignmentsHeader";
import AssignmentItem from "./AssignmentItem";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentsControls />
      <AssignmentsHeader />
      <div className="wd-assignments-list">
        <AssignmentItem
          title="A1 - ENV + HTML"
          description="Multiple Modules"
          availableDate="May 6 at 12:00am"
          dueDate="May 13 at 11:59pm"
          points={100}
          assignmentId="A1"
        />
        <AssignmentItem
          title="A2 - CSS + BOOTSTRAP"
          description="Multiple Modules"
          availableDate="May 13 at 12:00am"
          dueDate="May 20 at 11:59pm"
          points={100}
          assignmentId="A2"
        />
        <AssignmentItem
          title="A3 - JAVASCRIPT + REACT"
          description="Multiple Modules"
          availableDate="May 20 at 12:00am"
          dueDate="May 27 at 11:59pm"
          points={100}
          assignmentId="A3"
        />
      </div>
    </div>
  );
}
