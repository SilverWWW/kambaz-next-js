"use client";
import Link from "next/link";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (error: any) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      <div style={{ maxWidth: "400px" }}>
        <FormControl
          defaultValue={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="mb-2"
          placeholder="username"
          id="wd-username"
        />
        <FormControl
          defaultValue={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="mb-2"
          placeholder="password"
          type="password"
          id="wd-password"
        />
        <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2">
          Sign in
        </Button>
        <Link href="/Account/Signup" className="wd-signup-link">
          Sign up
        </Link>
      </div>
    </div>
  );
}
