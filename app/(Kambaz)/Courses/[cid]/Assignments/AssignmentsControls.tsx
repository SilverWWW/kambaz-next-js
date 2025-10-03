import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function AssignmentsControls() {
  return (
    <div
      id="wd-assignments-controls"
      className="d-flex justify-content-between align-items-center mb-4"
    >
      <div className="flex-fill me-3">
        <InputGroup>
          <span className="input-group-text">
            <FaSearch />
          </span>
          <FormControl
            placeholder="Search for Assignment"
            id="wd-assignment-search"
          />
        </InputGroup>
      </div>
      <div className="d-flex gap-2">
        <Button variant="secondary" size="lg" className="text-nowrap">
          <FaPlus className="me-2" />
          Group
        </Button>
        <Button variant="danger" size="lg" className="text-nowrap">
          <FaPlus className="me-2" />
          Assignment
        </Button>
      </div>
    </div>
  );
}
