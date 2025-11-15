"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "../../../Assignments/reducer";
import * as client from "../../../Assignments/client";
import { Button, FormControl, FormLabel, FormGroup } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const assignmentId = searchParams.get("id");
  const isEditing = !!assignmentId;

  const [assignment, setAssignment] = useState({
    _id: "",
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableDate: "",
  });

  useEffect(() => {
    if (isEditing && assignmentId) {
      const fetchAssignment = async () => {
        const existingAssignment = await client.findAssignmentById(assignmentId);
        if (existingAssignment) {
          setAssignment({
            _id: existingAssignment._id,
            title: existingAssignment.title,
            description: existingAssignment.description,
            points: existingAssignment.points,
            dueDate: existingAssignment.dueDate
              ? existingAssignment.dueDate.slice(0, 16)
              : "",
            availableDate: existingAssignment.availableDate
              ? existingAssignment.availableDate.slice(0, 16)
              : "",
          });
        }
      };
      fetchAssignment();
    }
  }, [isEditing, assignmentId]);

  const handleSave = async () => {
    if (!assignment.title || !assignment.description) {
      alert("Please fill in all required fields");
      return;
    }

    if (isEditing) {
      const updatedAssignment = await client.updateAssignment({
        ...assignment,
        course: cid,
      });
      const newAssignments = assignments.map((a: any) =>
        a._id === updatedAssignment._id ? updatedAssignment : a
      );
      dispatch(setAssignments(newAssignments));
    } else {
      const newAssignment = await client.createAssignmentForCourse(cid as string, {
        ...assignment,
        course: cid,
      });
      dispatch(setAssignments([...assignments, newAssignment]));
    }

    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div className="wd-assignment-editor">
      <h2>{isEditing ? "Edit Assignment" : "Assignment Editor"}</h2>
      <div style={{ maxWidth: "400px" }}>
        <FormGroup className="mb-3">
          <FormLabel>Assignment Name *</FormLabel>
          <FormControl
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
            placeholder="Enter assignment name"
            id="wd-assignment-title"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Description *</FormLabel>
          <FormControl
            as="textarea"
            rows={4}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
            placeholder="Enter assignment description"
            id="wd-assignment-description"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Points</FormLabel>
          <FormControl
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                points: parseInt(e.target.value) || 0,
              })
            }
            placeholder="Enter points"
            id="wd-assignment-points"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Available From</FormLabel>
          <FormControl
            type="datetime-local"
            value={assignment.availableDate}
            onChange={(e) =>
              setAssignment({ ...assignment, availableDate: e.target.value })
            }
            id="wd-assignment-available-date"
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel>Due Date</FormLabel>
          <FormControl
            type="datetime-local"
            value={assignment.dueDate}
            onChange={(e) =>
              setAssignment({ ...assignment, dueDate: e.target.value })
            }
            id="wd-assignment-due-date"
          />
        </FormGroup>

        <div className="d-flex gap-2">
          <Button
            variant="success"
            onClick={handleSave}
            id="wd-save-assignment-btn"
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={handleCancel}
            id="wd-cancel-assignment-btn"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
