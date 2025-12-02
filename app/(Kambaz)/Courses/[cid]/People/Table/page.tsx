"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Table, Button, Modal, FormControl, FormLabel, FormGroup } from "react-bootstrap";
import { FaUserCircle, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import * as client from "../../../client";
import * as usersClient from "../../../../Users/client";
import { RootState } from "../../../../store";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId?: string;
  username?: string;
  section?: string;
  role: string;
  lastActivity?: string;
  totalActivity?: string;
  email?: string;
  password?: string;
}

export default function PeopleTable() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "STUDENT",
    section: "",
  });

  const fetchUsers = useCallback(async () => {
    const enrolledUsers = await client.findUsersForCourse(cid as string);
    setUsers(enrolledUsers);
  }, [cid]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      role: "STUDENT",
      section: "",
    });
    setShowModal(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      username: user.username || "",
      email: user.email || "",
      password: "",
      role: user.role || "STUDENT",
      section: user.section || "",
    });
    setShowModal(true);
  };

  const handleSaveUser = async () => {
    try {
      if (editingUser) {
        await usersClient.updateUser({ ...editingUser, ...formData });
      } else {
        await usersClient.createUser(formData);
      }
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user. Please try again.");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await usersClient.deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div id="wd-people-table">
      {isFaculty && (
        <div className="mb-3">
          <Button variant="primary" onClick={handleCreateUser}>
            <FaPlus className="me-2" />
            Add User
          </Button>
        </div>
      )}
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId || user.username || ""}</td>
              <td className="wd-section">{user.section || ""}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity || ""}</td>
              <td className="wd-total-activity">{user.totalActivity || ""}</td>
              {isFaculty && (
                <td>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleEditUser(user)}
                    className="me-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-danger"
                  >
                    <FaTrash />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup className="mb-3">
            <FormLabel>First Name</FormLabel>
            <FormControl
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Last Name</FormLabel>
            <FormControl
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Username</FormLabel>
            <FormControl
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </FormGroup>
          {!editingUser && (
            <FormGroup className="mb-3">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </FormGroup>
          )}
          <FormGroup className="mb-3">
            <FormLabel>Role</FormLabel>
            <FormControl
              as="select"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="STUDENT">Student</option>
              <option value="TA">TA</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Admin</option>
            </FormControl>
          </FormGroup>
          <FormGroup className="mb-3">
            <FormLabel>Section</FormLabel>
            <FormControl
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
