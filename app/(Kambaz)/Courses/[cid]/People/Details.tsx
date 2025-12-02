"use client";

import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../Account/client";

export default function PeopleDetails({
  uid,
  position,
  onClose,
  fetchUsers,
}: {
  uid: string | null;
  position: { top: number; left: number };
  onClose: () => void;
  fetchUsers: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) return;
      const user = await client.findUserById(uid);
      setUser(user);
      setName(`${user.firstName || ""} ${user.lastName || ""}`.trim());
    };
    if (uid) fetchUser();
  }, [uid]);

  const deleteUser = async (userId: string) => {
    await client.deleteUser(userId);
    fetchUsers();
    onClose();
  };

  const saveUser = async () => {
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ") || "";
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    fetchUsers();
    onClose();
  };

  if (!uid) return null;

  return (
    <div
      className="wd-people-details position-fixed bg-white p-4 shadow rounded border"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1050,
        minWidth: "300px",
        maxWidth: "400px",
      }}
    >
      <button
        onClick={onClose}
        className="btn position-absolute end-0 top-0 wd-close-details border-0 bg-transparent"
        style={{ margin: "5px" }}
      >
        <IoCloseSharp className="fs-5" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
            style={{ cursor: "pointer" }}
          />
        )}
        {editing && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
            style={{ cursor: "pointer" }}
          />
        )}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)} style={{ cursor: "pointer" }}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {editing && (
          <FormControl
            className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      <b>Roles:</b>{" "}
      {!editing ? (
        <span className="wd-roles">{user.role}</span>
      ) : (
        <select
          className="form-select d-inline-block w-auto ms-2"
          value={user.role || "STUDENT"}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </select>
      )}{" "}
      <br />
      <b>Email:</b>{" "}
      {!editing ? (
        <span className="wd-email">{user.email || ""}</span>
      ) : (
        <FormControl
          type="email"
          className="d-inline-block w-auto ms-2"
          defaultValue={user.email || ""}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      )}{" "}
      <br />
      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
      <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}

