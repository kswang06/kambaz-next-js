/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    router.push("/dashboard");
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
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
      <Button onClick={signin} id="wd-signin-btn" className="w-100">
        {" "}
        Sign in{" "}
      </Button>
      <Link id="wd-signup-link" href="/account/signup">
        {" "}
        Sign up{" "}
      </Link>
      <hr />
      <div className="mt-3">
        <div>Kevin Wang</div>
        <div>
          Frontend:{" "}
          <a
            href="https://github.com/kswang06/kambaz-next-js"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/kswang06/kambaz-next-js
          </a>
        </div>
        <div>
          Backend:{" "}
          <a
            href="https://github.com/kswang06/kambaz-node-server-app"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/kswang06/kambaz-node-server-app
          </a>
        </div>
      </div>
    </div>
  );
}
