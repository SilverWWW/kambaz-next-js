"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import "../styles.css";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();

  return (
    <div id="wd-account-navigation" className="list-group wd fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          href={`/Account/${link}`}
          id={`wd-account-${link.toLowerCase()}-link`}
          className={`list-group-item border-0 ${
            pathname.endsWith(link.toLowerCase()) ? "active" : "text-danger"
          }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
