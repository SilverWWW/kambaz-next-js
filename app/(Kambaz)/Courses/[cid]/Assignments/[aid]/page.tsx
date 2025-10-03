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

export default function EditAssignment() {
  return (
    <div id="wd-edit-assignment">
      <h1>Edit Assignment</h1>

      <Form>
        <div className="mb-3">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl type="text" defaultValue="A1" id="wd-assignment-name" />
        </div>

        <div className="mb-3">
          <FormLabel>Assignment Description</FormLabel>
          <FormControl
            as="textarea"
            rows={8}
            defaultValue="Submit a link to the landing page of your Web application running on Vercel."
            id="wd-assignment-description"
          />
        </div>

        <div className="mb-3">
          <FormLabel>Points</FormLabel>
          <FormControl
            type="number"
            defaultValue="100"
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
            <FormCheck type="checkbox" label="Text Entry" id="wd-text-entry" />
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
                defaultValue="2024-05-13T23:59"
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
                  defaultValue="2024-05-06T00:00"
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
          <Button variant="secondary" size="lg">
            Cancel
          </Button>
          <Button variant="danger" size="lg">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
