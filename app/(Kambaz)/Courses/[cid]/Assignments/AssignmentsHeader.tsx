import { BsChevronDown, BsPlus, BsThreeDotsVertical } from "react-icons/bs";

export default function AssignmentsHeader() {
  return (
    <div className="wd-assignments-header border border-secondary rounded p-3 mb-3 bg-light">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <BsChevronDown className="me-2 fs-5" />
          <h4 className="mb-0 fw-bold">ASSIGNMENTS</h4>
        </div>
        <div className="d-flex align-items-center">
          <span className="text-muted me-3">40% of Total</span>
          <BsPlus className="me-2 fs-4 text-muted" />
          <BsThreeDotsVertical className="fs-4 text-muted" />
        </div>
      </div>
    </div>
  );
}
