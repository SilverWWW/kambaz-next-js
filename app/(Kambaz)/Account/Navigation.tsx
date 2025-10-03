"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function AccountNavigation() {
  const pathname = usePathname();

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black"
      style={{ width: 110 }}
      id="wd-account-navigation"
    >
      <ListGroupItem className="bg-black border-0 text-center">
        <div className="bg-black p-2 mb-3">
          <div
            className="bg-danger text-white rounded d-flex align-items-center justify-content-center"
            style={{ width: "60px", height: "60px", margin: "0 auto" }}
          >
            <span className="fs-1 fw-bold">N</span>
          </div>
          <div className="text-white small mt-1">LUX VERITAS VIRTUS</div>
        </div>
      </ListGroupItem>

      <ListGroupItem className="border-0 text-center">
        <Link
          href="/Account/Signin"
          id="wd-signin-link"
          className={`text-decoration-none ${
            pathname === "/Account/Signin" ? "text-danger" : "text-dark"
          }`}
        >
          Signin
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 text-center">
        <Link
          href="/Account/Signup"
          id="wd-signup-link"
          className={`text-decoration-none ${
            pathname === "/Account/Signup" ? "text-danger" : "text-danger"
          }`}
        >
          Signup
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 text-center">
        <Link
          href="/Account/Profile"
          id="wd-profile-link"
          className={`text-decoration-none ${
            pathname === "/Account/Profile" ? "text-danger" : "text-danger"
          }`}
        >
          Profile
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${
          pathname === "/Account" ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Account"
          id="wd-account-link"
          className={`text-decoration-none ${
            pathname === "/Account" ? "text-danger" : "text-white"
          }`}
        >
          <FaUser
            className={`fs-1 ${
              pathname === "/Account" ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Account
        </Link>
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${
          pathname === "/Dashboard" ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Dashboard"
          id="wd-dashboard-link"
          className={`text-decoration-none ${
            pathname === "/Dashboard" ? "text-danger" : "text-white"
          }`}
        >
          <AiOutlineDashboard
            className={`fs-1 ${
              pathname === "/Dashboard" ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
