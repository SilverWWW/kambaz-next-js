import Link from "next/link";
import { FormControl } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <div style={{ maxWidth: "400px" }}>
        <FormControl
          id="wd-username"
          placeholder="alice"
          defaultValue="alice"
          className="mb-2"
        />
        <FormControl
          id="wd-password"
          placeholder="123"
          type="password"
          defaultValue="123"
          className="mb-2"
        />
        <FormControl
          id="wd-first-name"
          placeholder="Alice"
          defaultValue="Alice"
          className="mb-2"
        />
        <FormControl
          id="wd-last-name"
          placeholder="Wonderland"
          defaultValue="Wonderland"
          className="mb-2"
        />
        <div className="position-relative mb-2">
          <FormControl
            id="wd-birthday"
            placeholder="mm/dd/yyyy"
            defaultValue="01/01/1990"
            className="pe-5"
          />
          <FaCalendarAlt className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
        </div>
        <FormControl
          id="wd-email"
          placeholder="alice@wonderland.com"
          defaultValue="alice@wonderland.com"
          className="mb-2"
        />
        <FormControl
          id="wd-role"
          placeholder="User"
          defaultValue="User"
          className="mb-2"
        />
        <Link
          id="wd-signout-btn"
          href="/Account/Signin"
          className="btn btn-danger w-100 text-decoration-none"
        >
          Signout
        </Link>
      </div>
    </div>
  );
}
