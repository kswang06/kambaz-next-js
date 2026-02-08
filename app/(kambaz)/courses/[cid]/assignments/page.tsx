import Link from "next/link";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import { FaSearch, FaCheckCircle } from "react-icons/fa";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex mb-3">
        <div className="me-auto">
          <FaSearch className="me-2" />
          <Form.Control
            id="wd-search-assignment"
            placeholder="Search for Assignments"
            style={{ width: "300px", display: "inline-block" }}
          />
        </div>

        <Button
          id="wd-add-assignment-group"
          variant="secondary"
          className="me-2"
        >
          <BsPlus /> Group
        </Button>
        <Button id="wd-add-assignment" variant="danger">
          <BsPlus /> Assignment
        </Button>
      </div>

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem>
          <BsGripVertical className="me-2" />
          <strong>ASSIGNMENTS</strong> 40% of Total
          <span className="float-end">
            <BsPlus className="me-2" />
            <BsThreeDotsVertical />
          </span>
        </ListGroupItem>

        <ListGroupItem>
          <BsGripVertical className="me-2" />
          <Link
            href="/courses/1234/assignments/123"
            className="fw-bold text-decoration-none text-dark"
          >
            A1 - ENV + HTML
          </Link>
          <br />
          <small>
            Multiple Modules | Not available until May 6 at 12:00 am | Due May
            13 at 11:59pm | 100pts
          </small>
          <span className="float-end">
            <FaCheckCircle className="text-success me-2" />
            <BsThreeDotsVertical />
          </span>
        </ListGroupItem>

        <ListGroupItem>
          <BsGripVertical className="me-2" />
          <Link
            href="/courses/1234/assignments/456"
            className="fw-bold text-decoration-none text-dark"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <br />
          <small>
            Multiple Modules | Not available until May 13 at 12:00 am | Due May
            20 at 11:59pm | 100pts
          </small>
          <span className="float-end">
            <FaCheckCircle className="text-success me-2" />
            <BsThreeDotsVertical />
          </span>
        </ListGroupItem>

        <ListGroupItem>
          <BsGripVertical className="me-2" />
          <Link
            href="/courses/1234/assignments/789"
            className="fw-bold text-decoration-none text-dark"
          >
            A3 - JAVASCRIPT + REACT
          </Link>
          <br />
          <small>
            Multiple Modules | Not available until May 20 at 12:00 am | Due May
            27 at 11:59pm | 100pts
          </small>
          <span className="float-end">
            <FaCheckCircle className="text-success me-2" />
            <BsThreeDotsVertical />
          </span>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
