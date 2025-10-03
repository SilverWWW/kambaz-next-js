"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaUser, FaHistory, FaQuestionCircle } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function KambazNavigation() {
  const pathname = usePathname();

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
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
              pathname === "/Account" ? "text-danger" : "text-white"
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
      <ListGroupItem
        className={`border-0 text-center ${
          pathname === "/Courses" ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Courses"
          id="wd-courses-link"
          className={`text-decoration-none ${
            pathname === "/Courses" ? "text-danger" : "text-white"
          }`}
        >
          <BiBook
            className={`fs-1 ${
              pathname === "/Courses" ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Courses
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          pathname === "/Groups" ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Groups"
          id="wd-groups-link"
          className={`text-decoration-none ${
            pathname === "/Groups" ? "text-danger" : "text-white"
          }`}
        >
          <MdGroups
            className={`fs-1 ${
              pathname === "/Groups" ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Groups
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          pathname === "/Calendar" ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Calendar"
          id="wd-calendar-link"
          className={`text-decoration-none ${
            pathname === "/Calendar" ? "text-danger" : "text-white"
          }`}
        >
          <IoCalendarOutline
            className={`fs-1 ${
              pathname === "/Calendar" ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Calendar
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          pathname === "/Inbox" ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Inbox"
          id="wd-inbox-link"
          className={`text-decoration-none ${
            pathname === "/Inbox" ? "text-danger" : "text-white"
          }`}
        >
          <FaInbox
            className={`fs-1 ${
              pathname === "/Inbox" ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Inbox
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          pathname === "/History" ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/History"
          id="wd-history-link"
          className={`text-decoration-none ${
            pathname === "/History" ? "text-danger" : "text-white"
          }`}
        >
          <FaHistory
            className={`fs-1 ${
              pathname === "/History" ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          History
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          pathname === "/Commons" ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Commons"
          id="wd-commons-link"
          className={`text-decoration-none ${
            pathname === "/Commons" ? "text-danger" : "text-white"
          }`}
        >
          <LiaCogSolid
            className={`fs-1 ${
              pathname === "/Commons" ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Commons
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={`border-0 text-center ${
          pathname === "/Help" ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/Help"
          id="wd-help-link"
          className={`text-decoration-none ${
            pathname === "/Help" ? "text-danger" : "text-white"
          }`}
        >
          <FaQuestionCircle
            className={`fs-1 ${
              pathname === "/Help" ? "text-danger" : "text-danger"
            }`}
          />
          <br />
          Help
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
