import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h1>Signin</h1>
      <div style={{ maxWidth: "400px" }}>
        <FormControl id="wd-username" placeholder="username" className="mb-2" />
        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
        />
        <Link
          id="wd-signin-btn"
          href="/Account/Profile"
          className="btn btn-primary w-100 mb-2 text-decoration-none"
        >
          Signin
        </Link>
        <Link
          id="wd-signup-link"
          href="/Account/Signup"
          className="text-primary text-decoration-none"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
