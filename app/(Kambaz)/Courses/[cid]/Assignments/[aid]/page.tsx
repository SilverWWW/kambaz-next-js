"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Button,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments } from "../../../Assignments/reducer";
import * as client from "../../../Assignments/client";

export default function EditAssignment() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableDate: "",
  });

  useEffect(() => {
    const fetchAssignment = async () => {
      const assignment = await client.findAssignmentById(aid as string);
      if (assignment) {
        setFormData({
          title: assignment.title,
          description: assignment.description,
          points: assignment.points,
          dueDate: assignment.dueDate ? assignment.dueDate.slice(0, 16) : "",
          availableDate: assignment.availableDate
            ? assignment.availableDate.slice(0, 16)
            : "",
        });
      }
    };
    if (aid) {
      fetchAssignment();
    }
  }, [aid]);

  const handleSave = async () => {
    try {
      await client.updateAssignment({
        _id: aid as string,
        ...formData,
        course: cid,
      });
      const updatedAssignments = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(updatedAssignments));
      router.push(`/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Failed to save assignment. Please try again.");
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.role !== "FACULTY") {
      router.push(`/Courses/${cid}/Assignments`);
    }
  }, [currentUser, router, cid]);

  if (!currentUser || currentUser.role !== "FACULTY") {
    return null;
  }

  return (
    <div id="wd-edit-assignment">
      <h1>Edit Assignment</h1>
      <div style={{ maxWidth: "600px" }}>
        <Form>
          <div className="mb-3">
            <FormLabel>Assignment Name</FormLabel>
            <FormControl
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              id="wd-assignment-name"
            />
          </div>

          <div className="mb-3">
            <FormLabel>Assignment Description</FormLabel>
            <FormControl
              as="textarea"
              rows={8}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              id="wd-assignment-description"
            />
          </div>

          <div className="mb-3">
            <FormLabel>Points</FormLabel>
            <FormControl
              type="number"
              value={formData.points}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  points: parseInt(e.target.value) || 0,
                })
              }
              id="wd-assignment-points"
            />
          </div>

          <div className="mb-3">
            <FormLabel>Assignment Group</FormLabel>
            <FormSelect defaultValue="ASSIGNMENTS" id="wd-assignment-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </FormSelect>
          </div>

          <div className="mb-3">
            <FormLabel>Display Grade as</FormLabel>
            <FormSelect defaultValue="Percentage" id="wd-display-grade">
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
            </FormSelect>
          </div>

          <div className="mb-3">
            <FormLabel>Submission Type</FormLabel>
            <FormSelect defaultValue="Online" id="wd-submission-type">
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </FormSelect>
          </div>

          <div className="mb-3">
            <FormLabel>Online Entry Options</FormLabel>
            <div>
              <FormCheck
                type="checkbox"
                label="Text Entry"
                id="wd-text-entry"
              />
              <FormCheck
                type="checkbox"
                label="Website URL"
                defaultChecked
                id="wd-website-url"
              />
              <FormCheck
                type="checkbox"
                label="Media Recordings"
                id="wd-media-recordings"
              />
              <FormCheck
                type="checkbox"
                label="Student Annotation"
                id="wd-student-annotation"
              />
              <FormCheck
                type="checkbox"
                label="File Uploads"
                id="wd-file-uploads"
              />
            </div>
          </div>

          <div className="mb-3">
            <FormLabel>Assign</FormLabel>

            <div className="mb-3">
              <FormLabel>Assign to</FormLabel>
              <InputGroup>
                <FormControl
                  type="text"
                  defaultValue="Everyone"
                  id="wd-assign-to"
                />
                <Button variant="outline-secondary">
                  <FaTimes />
                </Button>
              </InputGroup>
            </div>

            <div className="mb-3">
              <FormLabel>Due</FormLabel>
              <InputGroup>
                <FormControl
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  id="wd-due-date"
                />
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
              </InputGroup>
            </div>

            <Row>
              <Col md={6}>
                <FormLabel>Available from</FormLabel>
                <InputGroup>
                  <FormControl
                    type="datetime-local"
                    value={formData.availableDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableDate: e.target.value,
                      })
                    }
                    id="wd-available-from"
                  />
                  <span className="input-group-text">
                    <FaCalendarAlt />
                  </span>
                </InputGroup>
              </Col>
              <Col md={6}>
                <FormLabel>Until</FormLabel>
                <InputGroup>
                  <FormControl type="datetime-local" id="wd-available-until" />
                  <span className="input-group-text">
                    <FaCalendarAlt />
                  </span>
                </InputGroup>
              </Col>
            </Row>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Link href={`/Courses/${cid}/Assignments`}>
              <Button variant="secondary" size="lg">
                Cancel
              </Button>
            </Link>
            <Button variant="danger" size="lg" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
