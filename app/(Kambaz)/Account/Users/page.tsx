"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "../../Courses/[cid]/People/Table";
import * as client from "../client";

export default function Users() {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();

  const filterUsersByRole = async (selectedRole: string) => {
    setRole(selectedRole);
    if (!selectedRole && !name) {
      await fetchUsers();
    } else {
      await fetchFilteredUsers(selectedRole, name);
    }
  };

  const filterUsersByName = async (searchName: string) => {
    setName(searchName);
    if (!searchName && !role) {
      await fetchUsers();
    } else {
      await fetchFilteredUsers(role, searchName);
    }
  };

  const fetchFilteredUsers = async (selectedRole: string, searchName: string) => {
    const params: any = {};
    if (selectedRole && selectedRole.trim()) params.role = selectedRole;
    if (searchName && searchName.trim()) params.name = searchName;
    
    const users = await client.findAllUsers(Object.keys(params).length > 0 ? params : undefined);
    setAllUsers(users);
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setAllUsers(users);
  };

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${allUsers.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${allUsers.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setAllUsers([...allUsers, user]);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [uid]);

  return (
    <div>
      <h3>Users</h3>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people mb-3">
        <FaPlus className="me-2" />
        Users
      </button>
      <FormControl
        value={name}
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name mb-3"
      />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role mb-3"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <div className="clearfix"></div>
      <PeopleTable users={allUsers} fetchUsers={fetchUsers} />
    </div>
  );
}

