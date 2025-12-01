import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface AssignmentItemProps {
  title: string;
  description: string;
  availableDate: string;
  dueDate: string;
  points: number;
  assignmentId: string;
  courseId: string;
  onDelete: (assignmentId: string) => void;
  isFaculty?: boolean;
}

export default function AssignmentItem({
  title,
  description,
  availableDate,
  dueDate,
  points,
  assignmentId,
  courseId,
  onDelete,
  isFaculty = false,
}: AssignmentItemProps) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    router.push(`/Courses/${courseId}/Assignments/Editor?id=${assignmentId}`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(assignmentId);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="wd-assignment-item border-start border-success border-4 p-3 mb-3 bg-white">
      <div className="d-flex align-items-start">
        <div className="d-flex align-items-center me-3">
          <BsGripVertical className="me-2 fs-4 text-muted" />
          {isFaculty && (
            <MdEdit
              className="fs-4 text-muted"
              style={{ cursor: "pointer" }}
              onClick={handleEdit}
              title="Edit Assignment"
            />
          )}
        </div>
        <div className="flex-fill">
          <Link
            href={`/Courses/${courseId}/Assignments/${assignmentId}`}
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
          {isFaculty && (
            <FaTrash
              className="text-danger fs-5 me-2"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteClick}
              title="Delete Assignment"
            />
          )}
          <BsThreeDotsVertical className="fs-4 text-muted" />
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the assignment "{title}"? This action
          cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
