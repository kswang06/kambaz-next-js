import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function AccountNavigation() {
  return (
    <ListGroup className="rounded-0" id="wd-account-navigation">
      <ListGroupItem className="border-0">
        <Link
          href="/account/signin"
          className="text-decoration-none text-danger"
        >
          Signin
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0">
        <Link
          href="/account/signup"
          className="text-decoration-none text-danger"
        >
          Signup
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0">
        <Link
          href="/account/profile"
          className="text-decoration-none text-danger"
        >
          Profile
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
