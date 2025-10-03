import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";

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
        <Button
          id="wd-signin-btn"
          variant="primary"
          className="w-100 mb-2"
          as={Link}
          href="/Account/Profile"
        >
          Signin
        </Button>
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
