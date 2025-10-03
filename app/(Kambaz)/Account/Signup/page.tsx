import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Signup</h1>
      <div style={{ maxWidth: "400px" }}>
        <FormControl id="wd-username" placeholder="username" className="mb-2" />
        <FormControl
          id="wd-password"
          placeholder="password"
          type="password"
          className="mb-2"
        />
        <Button
          id="wd-signup-btn"
          variant="primary"
          className="w-100 mb-2"
          as={Link}
          href="/Account/Profile"
        >
          Signup
        </Button>
        <Link
          id="wd-signin-link"
          href="/Account/Signin"
          className="text-primary text-decoration-none"
        >
          Signin
        </Link>
      </div>
    </div>
  );
}
