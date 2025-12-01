"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "../styles.css";

export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();

  return (
    <div id="wd-account-navigation" className="list-group wd fs-5 rounded-0">
      {links.map((link) => {
        const linkPath = `/Account/${link}`;
        const isActive =
          pathname === linkPath ||
          pathname.toLowerCase().endsWith(link.toLowerCase());
        return (
          <Link
            key={link}
            href={linkPath}
            id={`wd-account-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          href="/Account/Users"
          id="wd-account-users-link"
          className={`list-group-item border-0 ${
            pathname.endsWith("Users") ? "active" : "text-danger"
          }`}
        >
          Users
        </Link>
      )}
    </div>
  );
}
