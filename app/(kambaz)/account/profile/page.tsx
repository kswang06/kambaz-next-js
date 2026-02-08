import Link from "next/link";
import { Button, FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>

      <FormControl
        defaultValue="alice"
        placeholder="username"
        className="mb-2"
      />

      <FormControl
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2"
      />

      <FormControl
        defaultValue="Alice"
        placeholder="First Name"
        className="mb-2"
      />

      <FormControl
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="mb-2"
      />

      <FormControl type="date" defaultValue="2000-01-01" className="mb-2" />

      <FormControl
        type="email"
        defaultValue="alice@wonderland.com"
        className="mb-2"
      />

      <FormSelect defaultValue="FACULTY" className="mb-3">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>

      <Button variant="danger" className="w-100 mb-2">
        Signout
      </Button>

      <Link href="/account/signin">Signin</Link>
    </div>
  );
}
