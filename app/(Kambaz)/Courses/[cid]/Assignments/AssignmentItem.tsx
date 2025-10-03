import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Link from "next/link";

interface AssignmentItemProps {
  title: string;
  description: string;
  availableDate: string;
  dueDate: string;
  points: number;
  assignmentId: string;
}

export default function AssignmentItem({
  title,
  description,
  availableDate,
  dueDate,
  points,
  assignmentId,
}: AssignmentItemProps) {
  return (
    <div className="wd-assignment-item border-start border-success border-4 p-3 mb-3 bg-white">
      <div className="d-flex align-items-start">
        <div className="d-flex align-items-center me-3">
          <BsGripVertical className="me-2 fs-4 text-muted" />
          <MdEdit className="fs-4 text-muted" />
        </div>
        <div className="flex-fill">
          <Link
            href={`/Courses/1234/Assignments/${assignmentId}`}
            className="text-decoration-none"
          >
            <h5 className="mb-1 fw-bold text-dark">{title}</h5>
          </Link>
          <div className="text-muted small">
            {description} | Not available until {availableDate} | Due {dueDate}{" "}
            | {points} pts
          </div>
        </div>
        <div className="d-flex align-items-center">
          <FaCheckCircle className="text-success fs-5 me-2" />
          <BsThreeDotsVertical className="fs-4 text-muted" />
        </div>
      </div>
    </div>
  );
}
